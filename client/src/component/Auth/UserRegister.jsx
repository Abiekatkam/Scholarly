import React from "react";
import "./style/UserRegister.css";

import auth1 from "../../assets/AuthPage/auth1.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PortUrl } from "../../PORTURL";

const UserRegister = () => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const url = PortUrl;

  const handleRegister = async (e) => {
    e.preventDefault();
    // dispatch(loginStart());

    try {
      const res = await axios.post(`${url}/auth/register`, {
        firstname,
        lastname,
        email,
        password,
      });
      // dispatch(loginSuccess(res.data.creds));
      navigate("/auth/user/login");
    } catch (err) {
      console.log(err);
      // dispatch(loginFailure());
    }
  };

  return (
    <div className="userregister">
      <div className="userregister__container">
        <a href="/">
          <i className="fas fa-times"></i>
        </a>
        <div className="userregister__container-content">
          <div className="userregister__container-content-data">
            <h2>Registration here</h2>

            <form className="userregister__container-form">
              <div>
                <div className="userregister__container-form-inputGroup">
                  <input
                    type="text"
                    name="firstname"
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                    // value={data.firstname}
                  />
                  <label htmlFor="firstname">First Name</label>
                </div>
                <div className="userregister__container-form-inputGroup">
                  <input
                    type="text"
                    name="lastname"
                    required
                    onChange={(e) => setLastname(e.target.value)}
                    // value={data.lastname}
                  />
                  <label htmlFor="lastname">Last Name</label>
                </div>

                <div className="userregister__container-form-inputGroup">
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    // value={data.email}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>

                <div className="userregister__container-form-inputGroup">
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    // value={data.password}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>

              <span
                style={{
                  visibility: "hidden",
                  color: "red",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                confirm password does not matched with password!
              </span>

              <p>
                Already have an account?
                <a href="/auth/user/login"> LOGIN!</a>
              </p>
              <button type="submit" onClick={handleRegister}>
                Register
              </button>
            </form>
          </div>

          <div className="userregister__container-content-image">
            <h1>Scholalry</h1>
            <p>
              Welcome to Scholalry, register yourself and start your beautiful
              day with an amazing courses.
            </p>

            <img src={auth1} alt="bannerauth" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
