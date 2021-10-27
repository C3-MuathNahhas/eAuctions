import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUserName } from "../../actions/authAction";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const tokenHolder = useSelector((state) => {
    return {
      token: state.tokenReducer.token,
    };
  });
  const [LogedIn, setLogedIn] = useState(
    <li className="nav-item">
      <Link className="nav-link" to="/login">
        <i className="far fa-copy"></i>Logout
      </Link>
    </li>
  );
  const IsLogedIn = () => {
    if (!tokenHolder.token.length) {
      setLogedIn(
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              <i className="far fa-copy"></i>Login
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/SignUp">
              <i className="far fa-copy"></i>SignUp
            </Link>
          </li>
        </>
      );
    } else {
      setLogedIn(
        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={() => {
              localStorage.setItem("token", "");
              localStorage.setItem("userName", "");
              dispatch(setToken(""));
              dispatch(setUserName(""));
              return false;
            }}
            to="/login"
          >
            <i className="far fa-copy"></i>Logout
          </Link>
        </li>
      );
    }
  };
  useEffect(() => {
    IsLogedIn();
    return () => {
      setLogedIn(
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            <i className="far fa-copy"></i>Login
          </Link>
        </li>
      );
    };
  }, [tokenHolder.token.length]);

  return (
    <div className="headar">
      <nav class="navbar navbar-expand-custom navbar-mainbg">
        <button
          class="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars text-white"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            {tokenHolder.token.length && (
              <div>
                <li className="nav-item">
                  <Link className="nav-link" to="/Home">
                    <i className="fas fa-tachometer-alt"></i>Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    <i className="far fa-chart-bar"></i>About
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/ContactUs">
                    <i className="far fa-address-book"></i>ContactUs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/OrgChart">
                    <i className="far fa-chart-bar"></i>Our Team
                  </Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to="/calender">
                    <i className="far fa-calendar-alt"></i>Calendar
                  </Link>
                </li>
              </div>
            )}
            {LogedIn}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
