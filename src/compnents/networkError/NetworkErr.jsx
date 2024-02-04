import React from "react";
import "./networkErr.css";
import net from "../../assets/netErr.svg";
function NetworkErr() {
  return (
    <div className="not-found">
      <div>
        <img src={net} alt="netWorkErr" />
        <div>
          <p>Oops,failed to fetch</p>
          <p>Try reloading the page ,or check your internet connection </p>
        </div>
      </div>
    </div>
  );
}

export default NetworkErr;
