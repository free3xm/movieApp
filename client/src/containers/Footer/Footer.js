import React from "react";
import cls from "./Footer.module.css";

function Footer(props) {
  return (
    <footer className={cls.Footer}>
      <time>{new Date().getFullYear()}</time>
      <div className={cls.Footer_info}>
        <p>Developed by V. Kolomiets</p>
        <nav>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/vadim-kolomiets-704b2718b/">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/free3xm">
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a href="https://www.themoviedb.org/">
                used API <span>the movie db</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;
