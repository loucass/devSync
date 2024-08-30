import React from "react";
import UserDashboard from "./UserDashboard";
import Footer from './Footer';


const HomePage = ({ user }) => {
  return (
    <>
      <div id="homepage">
        <UserDashboard user={user} />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
