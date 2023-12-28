import React, { useState, useEffect } from "react";
import './popup.css';
import checked from "../../assets/checked.svg";

function Popup({ message, duration = 1000,bookmark ,setBookmark}) {
//   const [showPopUp, setShowPopUp] = useState(false);
useEffect(() => {
    if (bookmark) {
      const timer = setTimeout(() => {
        setBookmark(false)
        // No internal state to update, so you'll need a mechanism
        // to control the pop-up's visibility from the parent component
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, bookmark]);
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowPopUp(false);
//     }, duration);

//     return () => clearTimeout(timer);
//   }, [duration]);

  return (
    <div
      className={`popup-container ${bookmark ? "show" : ""}`}
      style={{ transform: bookmark ? "translateY(0)" : "translateY(-100%)" }}
    >
      <img src={checked}/><p>{message}</p>
    </div>
  );
}

export default Popup;
