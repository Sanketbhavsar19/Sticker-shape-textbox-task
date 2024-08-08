import React, { useState, useEffect, useRef } from 'react';
import './textbox.css';

function App() {
  const [enableTextArea, setEnableTextArea] = useState(false);
  const [textAreas, setTextAreas] = useState([]);

  const toggleTextAreaMode = () => {
    setEnableTextArea(!enableTextArea);
  };

  const handleScreenClick = (event) => {
    if (event.target.tagName === 'TEXTAREA') {
      return;
    }

    if (enableTextArea) {
      const newTextArea = { x: event.clientX, y: event.clientY, text: '', isFocused: false };
      setTextAreas((prevTextAreas) => [...prevTextAreas, newTextArea]);
    }
  };

  const handleTextChange = (index, event) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index].text = event.target.value;
    setTextAreas(newTextAreas);
  };

  const handleFocus = (index) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index].isFocused = true;
    setTextAreas(newTextAreas);
  };

  const handleBlur = (index) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index].isFocused = false;
    setTextAreas(newTextAreas);
  };

  useEffect(() => {
    const textAreaElements = document.querySelectorAll('textarea');
    textAreaElements.forEach(textArea => {
      textArea.style.height = 'auto'; 
      textArea.style.height = `${textArea.scrollHeight}px`;
    });
  }, [textAreas]);

  useEffect(() => {
    if (enableTextArea) {
      document.addEventListener('click', handleScreenClick);
    } else {
      document.removeEventListener('click', handleScreenClick);
    }

    return () => {
      document.removeEventListener('click', handleScreenClick);
    };
  }, [enableTextArea]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={toggleTextAreaMode}>
        {enableTextArea ? 'Disable Text Area Mode' : 'Enable Text Area Mode'}
      </button>
      {textAreas.map((textArea, index) => (
        <textarea
          key={index}
          value={textArea.text}
          onChange={(event) => handleTextChange(index, event)}
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur(index)}
          rows={1}
          style={{
            position: 'absolute',
            left: textArea.x,
            top: textArea.y,
            width: '20vw',
            minHeight: '25px', 
            border: textArea.isFocused ? '1px solid black' : 'none',
            backgroundColor: 'transparent',
            resize: 'none',
            outline: 'none',
            overflow: 'hidden',
          }}
        />
      ))}
    </div>
  );
}

export default App;
