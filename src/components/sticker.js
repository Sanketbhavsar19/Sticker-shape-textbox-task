

import React, { useState, useEffect } from 'react';

function App() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiPositions, setEmojiPositions] = useState([]);

  const enableEmoji = () => {
    setShowEmoji(true);
  };

  const disableEmoji = () => {
    setShowEmoji(false);
  };

  const handleScreenClick = (e) => {
    if (showEmoji) {
      const newEmojiPosition = { x: e.clientX, y: e.clientY };
      setEmojiPositions((prevPositions) => [...prevPositions, newEmojiPosition]);
    }
  };

  useEffect(() => {
    if (showEmoji) {
      document.addEventListener('click', handleScreenClick);
    } else {
      document.removeEventListener('click', handleScreenClick);
    }

    return () => {
      document.removeEventListener('click', handleScreenClick);
    };
  }, [showEmoji]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={enableEmoji}>Enable Emoji</button>
      <button onClick={disableEmoji}>Disable Emoji</button>
      {emojiPositions.map((position, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            fontSize: '24px',
            pointerEvents: 'none',
          }}
        >
          😊
        </div>
      ))}
    </div>
  );
}

export default App;

