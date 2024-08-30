import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { handleHome } from "./handle_home";
import { useNavigate } from "react-router-dom";
import { handleRepo, viewRepo } from "./handle_repo";
import { handleCreateRepo } from "./handle_createRepo";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [Data, setData] = useState("");

  useEffect(() => {
    handleRepo((err, data) => {
      if (err) return console.log(err);
      let allR = [];
      data.forEach((repo) => {
        allR.push({
          name: repo.repoName,
        });
      });
      let unique = [];
      allR.forEach((r) => {
        if (!unique.some((rr) => rr.name === r.name)) {
          unique.push(r);
        }
      });
      setRepos(unique);
      return;
    });
    handleHome((err, data) => {
      if (err) return console.log(err);
      setData(data);
    });
  }, []);

  // Repo List State
  const [repos, setRepos] = useState([]);
  const [pinnedRepos, setPinnedRepos] = useState([]);

  // Profile Editing Handlers
  const handleEditClick = () => {
    // setIsEditing(true);
    navigate("/profile-settings");
  };

  const handleTogglePin = (repo) => {
    if (pinnedRepos.includes(repo)) {
      setPinnedRepos(pinnedRepos.filter((pinnedRepo) => pinnedRepo !== repo));
    } else {
      setPinnedRepos([...pinnedRepos, repo]);
    }
  };

  const handleViewRepo = (user, repo) => {
    viewRepo(user, repo);
  };

  return (
    <div className="container" id="UserDashboard">
      <>
        <div id="UserProfile" className="row justify-content-center">
          <div id="ProfileEditing" className="col-md-6 text-center">
            <img
              src={
                Data.userPhoto
                  ? Data.userPhoto
                  : "https://via.placeholder.com/150"
              }
              height={50}
              alt="Profile"
              className="img-fluid rounded-pill mb-3"
            />
            <h2>{Data.userName}</h2>
            <p>{Data.userAbout}</p>
            <button className="btn btn-primary mt-3" onClick={handleEditClick}>
              Edit Profile
            </button>
          </div>
        </div>

        <div id="UserRepos" className="row justify-content-center mt-5">
          <div id="edit-repo" className="col-md-8">
            <h2>Your Repositories</h2>

            {pinnedRepos.length > 0 && (
              <>
                <h2>Pinned Repositories</h2>
                <div id="PinnedRepos" className="row">
                  {pinnedRepos.map((repo, index) => (
                    <div
                      className="card mb-4 shadow-sm inline-block"
                      key={index}
                    >
                      <div className="">
                        <div className="card-body flex justify-content-between">
                          <h5 className="card-title">{repo.name}</h5>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleTogglePin(repo)}
                          >
                            Unpin
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <h2>All Repositories</h2>
            <ul>
              {repos.map((repo, index) => (
                <li key={index}>
                  {
                    <div className="flex justify-between align-items-center">
                      <span className="inline-block">{repo.name}</span>
                      <div>
                        <button
                          className="btn btn-info btn-sm ms-5"
                          onClick={() => {
                            handleViewRepo(
                              document.querySelector("h2").innerText,
                              repo.name
                            );
                          }}
                        >
                          View
                        </button>
                        <button
                          className={`btn btn-sm ${
                            pinnedRepos.includes(repo)
                              ? "btn-danger"
                              : "btn-primary"
                          } ms-2`}
                          onClick={() => handleTogglePin(repo)}
                        >
                          {pinnedRepos.includes(repo) ? "Unpin" : "Pin"}
                        </button>
                      </div>
                    </div>
                  }
                </li>
              ))}
            </ul>
          </div>
          <div className="justify-center">
            <button className="btn btn-success" onClick={handleCreateRepo}>
              create repo
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default UserDashboard;
