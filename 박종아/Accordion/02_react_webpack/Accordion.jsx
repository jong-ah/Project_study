import React, { useState, useRef, useEffect } from 'react';
import './Accordion.css';
import data from './data';

const Accordion = () => {
  const accRef = Array.from({ length: 3 }, (a) => useRef(null));

  const handleSectionNum = (index) => {
    let now = accRef[index].current;
    now.classList.toggle('active');
    let panel = now.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  };

  return (
    <>
      <h2>Animated Accordion</h2>
      In this example we have added a "plus" sign to each button. When the user
      clicks on the button, the "plus" sign is replaced with a "minus" sign.
      {data.map((section, index) => {
        return (
          <>
            <button
              className="accordion"
              ref={accRef[index]}
              onClick={() => handleSectionNum(index)}
            >
              {section.title}
            </button>
            <div className="panel">
              <p>{section.content}</p>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Accordion;
