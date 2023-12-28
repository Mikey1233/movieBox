import { useState} from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./RootLayouts.css";
import logo from "../../assets/monero.svg";
// import { auth } from "../../config/firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
import { checkingAuthUser } from "../../checkForUserAuth";
function RootLayouts() {
  const [userPic,setUserpic] = useState('')/////////state to manage the profile pic
  checkingAuthUser(userPic,setUserpic)

  return (
    <div className="root-layouts">
      <nav>
        <div className="root-layouts__img">
          <img src={logo} />
        </div>
        <ul>
          <NavLink to={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-border-all"
              viewBox="0 0 16 16"
            >
              <path d="M0 0h16v16H0zm1 1v6.5h6.5V1zm7.5 0v6.5H15V1zM15 8.5H8.5V15H15zM7.5 15V8.5H1V15z" />
            </svg>
          </NavLink>
          <NavLink to={"movies"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-film"
              viewBox="0 0 16 16"
            >
              <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
            </svg>
          </NavLink>
          <NavLink to={"tv-series"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-tv"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5M13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2" />
            </svg>
          </NavLink>
          <NavLink to={"book-marks"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bookmark-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
            </svg>
          </NavLink>
        </ul>
        <div className="pic-cont">
          <img src={userPic} alt="avatar" className="avatar" />
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayouts;
