import React from "react";
import "./style/UserLogin.css";
import axios from "axios";
import Cookies from "js-cookie";

import auth2 from "../../assets/AuthPage/auth2.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { PortUrl } from "../../PORTURL";

const MentorLogin = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const url = PortUrl;
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post(`${url}/auth/login`, { email, password });
      Cookies.set("accesstoken", res.data.token);
      dispatch(loginSuccess(res.data.creds));
      navigate("/course");
    } catch (err) {
      console.log(err);
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const [a1, a2] = result.user.displayName.split(" ");
        axios
          .post(`${url}/auth/google`, {
            firstname: a1,
            lastname: a2,
            email: result.user.email,
            img: result.user.photoURL,
            isMentor: true,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            Cookies.set("accesstoken", res.data.token);
            navigate("/course");
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFailure());
      });
  };

  return (
    <div className="userlogin">
      <div className="userlogin__container">
        <a href={currentUser ? "/course" : "/"}>
          <i className="fas fa-times"></i>
        </a>
        <div className="userlogin__container-content">
          <div className="userlogin__container-content-data">
            <h2>Mentor Login</h2>

            <form className="userregister__container-form">
              <div>
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
                Don't have an account?
                <a href="/auth/mentor/register"> REGISTER!</a>
              </p>
              <button type="submit" onClick={handleLogin}>
                Login
              </button>
            </form>

            <p>-----Or------</p>

            <button
              onClick={signInWithGoogle}
              className="userregister__container-google"
            >
              <i className="fa-brands fa-google"></i>
              <span>Sign in with Google</span>
            </button>
          </div>
          <div className="userlogin__container-content-image">
            <h1>Scholalry</h1>
            <p>
              Welcome back to Scholalry, log in yourself and start with teaching
              a courses.
            </p>
            <img src={auth2} alt="bannerauth" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorLogin;
