require("dotenv").config();
const express = require("express");
const { default: helmet } = require("helmet");
const { createConnection } = require("mysql2");
const { createHash } = require("crypto");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { writeFile, existsSync, mkdir } = require("fs");
const { extname } = require("path");
const app = express();
const port = 8085;

// encryption in one way

const encrypt = (text) => createHash("sha256").update(text).digest("hex");

// set upload file save in memory until use it

const storeMemory = multer.memoryStorage();

const mainUpload = multer({
  storage: storeMemory,
});

// set DB connection

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dev_think",
});

connection.connect((err) => {
  if (err) return console.log(err.message);
  console.log("connect to db");
});

// set security headers

app.use(express.static(__dirname + "\\public"));

app.use(helmet());

app.use(
  helmet({
    xssFilter: true,
  })
);

app.use((MReq, MRes, next) => {
  MRes.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  MRes.setHeader("xss-filter", true);
  MRes.setHeader("Access-Control-Allow-Headers", "authorization");
  next();
});

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // get form data

// authenticate the user

const Authenticate = (MReq) => {
  if (MReq.headers.authorization == undefined) {
    return false;
  }
  console.log("auth");
  // console.log(MReq.headers.authorization);
  // console.log(JSON.parse(MReq.headers.authorization.split(" ")[1])._);
  const Auth = JSON.parse(MReq.headers.authorization.split(" ")[1])._;
  jwt.verify(Auth, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err.message);
      return false;
    }
    MReq.userU = user;
    // console.log(user);
    return true;
  });
};

const CreateToken = (I, N, E) => {
  return jwt.sign(
    { userID: I, userName: N, userEmail: E },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

// handle root

app.get("/", (req, res) => res.send(process.env.SECRET_KEY));
app.get("/lo", (req, res) => res.send("<img src='/logo.svg'>"));

// handle sign up

app.post("/signup", multer().none(), (MReq, MRes) => {
  Authenticate(MReq);
  if (MReq.userU) {
    // console.log(MReq.userU);
    MRes.send(
      CreateToken(MReq.userU.userID, MReq.userU.userName, MReq.userU.userEmail)
    );
  }
  let checkN = `SELECT * FROM users WHERE userName = ?`;
  console.log(MReq.body);
  connection.query(checkN, [MReq.body.userName], (errN, resultN) => {
    if (errN) return console.log(errN.message);
    if (resultN.length > 0) {
      MRes.send("error this user name is used");
    } else {
      let checkE = `SELECT * FROM users WHERE userEmail = ?`;
      connection.query(checkE, [MReq.body.email], (err, resultE) => {
        if (err) return console.log(err.message);
        if (resultE.length > 0) {
          MRes.send("error this email has signed in before");
        } else {
          let q = `INSERT INTO users values(null , ? , ? , null , ? , null)`;
          connection.query(
            q,
            [MReq.body.userName, MReq.body.email, encrypt(MReq.body.password)],
            (errQ, resultQ) => {
              if (errQ) {
                console.log(errQ.message);
                MRes.send("error error on connecting");
                return;
              }
              MRes.send(
                CreateToken(
                  MReq.userU.userID,
                  MReq.body.userName,
                  MReq.body.userEmail
                )
              );
            }
          );
        }
      });
    }
  });
});

// handle log in

app.post("/login", multer().none(), (MReq, MRes) => {
  console.log("log in");
  Authenticate(MReq);
  if (MReq.userU != undefined) {
    console.log(MReq.userU);
    return MRes.send(
      CreateToken(MReq.userU.userID, MReq.userU.userName, MReq.userU.userEmail)
    );
  }
  let q1 = `SELECT * FROM users WHERE userEmail = ?`;
  connection.query(q1, [MReq.body.email], (err, result1) => {
    if (err) return console.log(err.message);
    if (result1.length > 0) {
      let q = `SELECT * FROM users WHERE userEmail = ? AND password = ?`;
      connection.query(
        q,
        [MReq.body.email, encrypt(MReq.body.password)],
        (err2, result) => {
          if (err2) return console.log(err2.message);
          if (result.length > 0) {
            MRes.send(
              CreateToken(result[0].ID, result[0].userName, MReq.body.email)
            );
          } else {
            MRes.send("error wrong password");
          }
        }
      );
    } else {
      MRes.send("error no such user");
    }
  });
});

// handle home page

app.get("/home", (MReq, MRes) => {
  Authenticate(MReq);
  console.log(MReq.userU);
  if (MReq.userU == undefined) {
    return MRes.send("error no authentication");
  }
  console.log(MReq.userU);
  let q = `SELECT * FROM users WHERE userEmail = ?`;
  connection.query(q, [MReq.userU.userEmail], (err, result) => {
    if (err) return console.log(err.message);
    let data = {
      userName: result[0].userName,
      userAbout: result[0].userAbout,
      userPhoto: result[0].userPhoto,
      authorization: CreateToken(
        MReq.userU.userID,
        MReq.userU.userName,
        MReq.userU.userEmail
      ),
    };
    MRes.send(data);
  });
});

// edit profile info

app.post("/profileEdit", mainUpload.single("userPhoto"), (MReq, MRes) => {
  Authenticate(MReq);
  if (MReq.userU == undefined) {
    return MRes.send("error no authentication");
  }
  if (MReq.file) {
    if (MReq.file.size < 1024 * 1024 * 5) {
      if (MReq.file.mimetype.startsWith("image/")) {
        let fileN = encrypt(MReq.file.originalname);
        writeFile(
          __dirname +
            "/public/profilePic/" +
            fileN +
            extname(MReq.file.originalname),
          MReq.file.buffer,
          (err) => {
            if (err) return console.log("error on file " + err.message);
            let q = `UPDATE users SET userPhoto = ? WHERE userEmail = ?`;
            connection.query(
              q,
              [fileN + extname(MReq.file.originalname), MReq.userU.userEmail],
              (err, result) => {
                if (err) {
                  return console.log("error on connecting " + err.message);
                }
                console.log("profile pic saved " + result.insertId);
              }
            );
          }
        );
      } else {
        console.log("file type");
        MRes.send("error file type");
      }
    } else {
      console.log("file size");
      MRes.send("error file size");
    }
  }
  if (!MRes.headersSent) {
    let qq = `UPDATE users SET userAbout = ? WHERE userEmail = ?`;
    connection.query(
      qq,
      [MReq.body.userAbout, MReq.userU.userEmail],
      (err, result) => {
        if (err) {
          console.log(err.message);
          MRes.send("error updating about");
          return;
        }
        console.log("saved about " + result.insertId);
        MRes.send("updated successfully");
      }
    );
  }
});

// delete Profile Photo

app.post("/deleteProfilePhoto", multer().none(), (MReq, MRes) => {
  Authenticate(MReq);
  if (MReq.userU == undefined) {
    return MRes.send("error no authentication");
  }
  let q = `UPDATE users SET userPhoto = null WHERE userEmail = ?`;
  connection.query(q, [MReq.userU.userEmail], (err, result) => {
    if (err) {
      console.log(err.message);
      return MRes.send("error on deleting");
    }
    MRes.send("deleted");
  });
});

// return user repository

app.get("/repo", (MReq, MRes) => {
  Authenticate(MReq);
  if (MReq.userU == undefined) {
    return MRes.send("error no authentication");
  }
  let q = `
  SELECT repo.repoName , repo.repoAbout , repo.ID ,
  users.userName ,
  files.fileName
  from users 
  left join repo on repo.userID = users.ID
  left join files on files.repoID = repo.ID where users.userEmail = ?
  `;
  connection.query(q, [MReq.userU.userEmail], (err, result) => {
    if (err) return console.log(err.message);
    if (!result[0].repoName) return MRes.send("error no repos");
    console.log(result);
    MRes.send(result);
  });
});

// create repo

app.post("/createRepo", multer().none(), (MReq, MRes) => {
  Authenticate(MReq);
  if (MReq.userU == undefined) {
    return MRes.send("error no authentication");
  }
  console.log(MReq.body, MReq.userU);
  let q = "INSERT INTO repo VALUES(null , ? , ? , ?)";
  connection.query(
    q,
    [
      MReq.userU.userID,
      MReq.body.repoName,
      MReq.body.repoAbout ? MReq.body.repoAbout : null,
    ],
    (err, result) => {
      if (err) return console.log(err.message);
      MRes.send("done");
    }
  );
});

// get repo

app.get("/:userName/:repoName", (MReq, MRes) => {
  Authenticate(MReq);
  if (MReq.userU == undefined) {
    return MRes.send("error no authentication");
  }
  MReq.params.userName = MReq.userU.userName;
  console.log(MReq.params.repoName.trim(), MReq.userU);
  let q = `
  SELECT repo.repoName , repo.repoAbout , 
  users.userName ,
  files.fileName , files.ID fileID 
  from users 
  left join repo on repo.userID = users.ID 
  left join files on files.repoID = repo.ID 
  where users.userEmail = ? AND users.userName = ? AND repo.repoName = ?
  `;
  connection.query(
    q,
    [
      MReq.userU.userEmail,
      MReq.params.userName.trim(),
      MReq.params.repoName.trim(),
    ],
    (err, result) => {
      if (err) return console.log(err.message);
      if (!result.length > 0) return MRes.send("error repo not exist");
      if (!result[0].repoName) return MRes.send("error repo not exist");
      console.log("done", result);
      MRes.send(result);
    }
  );
});

// handle add files

app.post("/AddFiles/:repoName", mainUpload.any(), (MReq, MRes) => {
  Authenticate(MReq);
  if (MReq.userU == undefined) {
    return MRes.send("error no authentication");
  }
  if (MReq.files.length > 0) {
    let id = {};
    let q2 = `
    SELECT 
    repo.ID
    from users 
    left join repo on repo.userID = users.ID where users.userEmail = ? and repo.repoName = ?
    `;
    connection.query(
      q2,
      [MReq.userU.userEmail, MReq.params.repoName.trim()],
      (err, result) => {
        if (err) return console.log(err.message);
        if (!result[0].ID) {
          console.log("no repos");
          return MRes.send("error no repos");
        }
        id.id = result[0].ID;
      }
    );
    MReq.files.forEach((file) => {
      console.log(file);
      if (
        file.size < 1024 * 1024 * 10 &&
        !file.mimetype.startsWith("video") &&
        !file.mimetype.startsWith("application")
      ) {
        if (!existsSync(`./public/repos/${MReq.params.repoName.trim()}`)) {
          mkdir(`./public/repos/${MReq.params.repoName.trim()}`, (err) => {
            if (err) console.log(err.message);
          });
        }
        writeFile(
          __dirname +
            `/public/repos/${MReq.params.repoName.trim()}/` +
            file.originalname,
          file.buffer,
          (err) => {
            if (err) return console.log("error on file " + err.message);
            let q = `INSERT INTO files VALUES(null , ? , ? , ? , ?)`;
            connection.query(
              q,
              [
                id.id,
                MReq.params.repoName,
                file.originalname,
                file.mimetype.startsWith("image") ? "image" : "text",
              ],
              (err, result) => {
                if (err) {
                  return console.log("error on connecting " + err.message);
                }
                console.log("file saved " + result.insertId);
              }
            );
          }
        );
      } else {
        console.log("file size");
        MRes.send("error file size");
      }
    });
  }
});

// handle get file page

app.get("/:userName/:repoName/:fileName", (MReq, MRes) => {
  Authenticate(MReq);
  if (MReq.userU == undefined) {
    return MRes.send("error no authentication");
  }
  let { repoName, fileName } = MReq.params;
  let q = `SELECT fileType FROM files WHERE fileName = ? AND repoName = ?`;
  connection.query(q, [fileName, repoName], (err, result) => {
    if (err) {
      console.log(err.message);
      MRes.send("error get file");
      return;
    }
    // console.log(`${__dirname}\\public\\repos\\${repoName}\\${fileName}`);
    if (existsSync(`${__dirname}\\public\\repos\\${repoName}\\${fileName}`)) {
      if (result[0].fileType == "image") {
        return MRes.send(
          `image /repos/${MReq.url.split("/")[2]}/${MReq.url.split("/")[3]}`
        );
      }
      MRes.sendFile(`${__dirname}\\public\\repos\\${repoName}\\${fileName}`);
    }
  });
});

// handle download file

app.get("/:userName/:repoName/:fileName/download", (MReq, MRes) => {
  Authenticate(MReq);
  if (MReq.userU == undefined) {
    return MRes.send("error no authentication");
  }
  let { repoName, fileName } = MReq.params;
  console.log(`${__dirname}\\public\\repos\\${repoName}\\${fileName}`);
  console.log(
    existsSync(`${__dirname}\\public\\repos\\${repoName}\\${fileName}`)
  );
  if (existsSync(`${__dirname}\\public\\repos\\${repoName}\\${fileName}`)) {
    console.log(
      `downloading ${__dirname}\\public\\repos\\${repoName}\\${fileName}`
    );
    MRes.download(
      `${__dirname}\\public\\repos\\${repoName}\\${fileName}`,
      (err) => {
        if (err) {
          console.log("error" + err.message);
          return MRes.send("error");
        }
      }
    );
  }
});

// handle wrong routs

app.use((MReq, MRes) => {
  MRes.send("error wrong url request");
});

app.listen(port, () =>
  console.log(`file handling app listening on port ${port}!`)
);
