import { useState } from 'react';
import './App.css';

import DrawingCanvas from './components/drawingcaves';
// import Sticker from './components/sticker';
//  import Textbox from './components/textbox';
import Shapesbutton from './components/shapesbutton';

function App() {
  const [selectedShape, setSelectedShape] = useState(null);
  return (
    <div className="App">
          {/* <Sticker/> */}
          {/* <Textbox/> */}
        
          <Shapesbutton setSelectedShape={setSelectedShape} /> 
          <DrawingCanvas  selectedShape={selectedShape}/>

    </div>
  );
}

export default App;
