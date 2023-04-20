import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <a href="/" className="footer__container-title">
          Scholarly
        </a>

        <div className="footer__container-content">
          <span>
            &copy; {new Date().getFullYear()} All rights reserved by Scholarly
            Website | Abie Katkam
          </span>
          <ul className="footer__container-content-data">
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/teach">TeachOn</a>
            </li>
            <li>
              <a href="/hackspace">Hackspace</a>
            </li>
          </ul>
        </div>

        <div className="footer__container-data">
          <p>Follow me on</p>
          <ul className="footer__container-content-data">
            <li>
              <a
                href="https://github.com/Abiekatkam"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/_abie._/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/abhishek-katkam-988744231/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
