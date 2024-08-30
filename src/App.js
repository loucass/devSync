import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Userin from "./User-in";
import Community from "./Community";
import Collaboration from "./Collaboration";
import ProfileSettings from "./ProfileSettings";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import CreateRepo from "./createRepo";
import RepoPage from "./repoPage";
import ViewFile from "./ViewFile";
import AddFile from "./addFile";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Userin />} />
          <Route path="/createRepo" element={<CreateRepo />} />
          <Route path="/community" element={<Community />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/:userName/:repoName" element={<RepoPage />} />
          <Route path="/:repoName/AddFile" element={<AddFile />} />
          <Route path="/:userName/:repoName/:fileName" element={<ViewFile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
