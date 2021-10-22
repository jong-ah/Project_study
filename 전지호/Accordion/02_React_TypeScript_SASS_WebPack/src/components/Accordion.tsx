import React from "react";
import "./Accordion.css";

import dummyData from "../dummyDatas/dummyData";

const Accordion = () => {
  const handleButtonClick = (e: any) => {
    let target = e.currentTarget;
    target.classList.toggle("active");

    let panel = target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  };

  return (
    <div id="container">
      {dummyData.map((el) => {
        return (
          <>
            <button className="accordion" onClick={handleButtonClick}>
              {el.title}
            </button>
            <div className="panel" style={undefined}>
              <p>{el.content}</p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Accordion;
