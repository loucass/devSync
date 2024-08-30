import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleLogSign, handleRequests } from "./handle_sign";

function Userin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    handleRequests();
  });

  return (
    <div className="userInfo-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={handleLogSign}>
        {!isLogin && (
          <>
            <label htmlFor="userName" className="form-label">
              user name
            </label>
            <input
              className="form-control"
              type="text"
              id="userName"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="set your user name"
              required
            />
          </>
        )}
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          className="form-control"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        {!isLogin && (
          <>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              className="form-control"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </>
        )}

        <button type="submit" className="btn btn-success w-100 d-block">
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <span
          id="errors"
          className="w-100 text-center d-block text-danger"
        ></span>
      </form>

      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={toggleForm} style={{ cursor: "pointer", color: "blue" }}>
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
}

export default Userin;
