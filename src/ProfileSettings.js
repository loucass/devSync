import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleDeleteP, handleEditP } from "./handle_editP";
import { handleHome } from "./handle_home";

const ProfileSettings = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  const [Data, setData] = useState("");

  const deletePhoto = () => {
    handleDeleteP((err, result) => {
      if (err) return console.log(err);
      setSuccessMessage("Profile picture deleted successfully!");
      document.images[0].src = "https://via.placeholder.com/150";
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    });
  };

  const handleSave = () => {
    document.forms[0].onsubmit = (e) => {
      e.preventDefault();
    };
    setDisabled(true);
    handleEditP((err, data) => {
      if (err) return console.log(err);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    });
    setSuccessMessage("Profile updated successfully!"); // Show success message
  };

  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    handleHome((err, data) => {
      setData(data);
      document.querySelector("#bio").value = data.userAbout;
    });
  }, []);

  return (
    <div id="profile-setting-container" className="container mt-5">
      <div id="profile-setting" className="row justify-content-center">
        <div className="col-md-6 text-center">
          <form>
            <h2>Edit Profile</h2>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            <img
              src={
                Data.userPhoto
                  ? Data.userPhoto
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              height="100px"
              className=" rounded-pill mb-3"
            />
            <div>
              <div className="mb-3">
                {Data.userPhoto && (
                  <>
                    <button className="btn btn-danger" onClick={deletePhoto}>
                      delete picture
                    </button>
                    <br />
                    <br />
                  </>
                )}
                <label htmlFor="profilePicture" className="form-label">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="userPhoto"
                  className="form-control"
                  accept="image/*"
                  disabled={isDisabled}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bio" className="form-label">
                  user About
                </label>
                <textarea
                  id="bio"
                  name="userAbout"
                  className="form-control"
                  rows="3"
                  disabled={isDisabled}
                ></textarea>
              </div>
              <button className="btn btn-success mt-3" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-danger mt-3 ms-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
