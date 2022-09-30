import { nanoid } from 'nanoid';
import { useState } from 'react';
import './App.css';
import { ColorCard } from './components/ColorCard.js/ColorCard';
import Create from './components/Form/Create';


const colorCodes = [ 
  {id: nanoid(), color: "#CD5C5C"}, 
  {id: nanoid(), color: "#6495ED"}, 
  {id: nanoid(), color: "#9FE2BF"}
];

function App() {
  const [colorArray, setColorArray] = useState(colorCodes);

  function addColorCard(newColor){
      try {
        setColorArray([...colorArray, {id: nanoid(), color: newColor}])
      } catch (error) {
      console.log(error.message)
    }
  }

  function deleteColorCard(cardId){
    setColorArray(colorArray.filter(card=> cardId === card.id ? "" : card ))
  }

  return (
    <div className="App">
      <h1>Color Saver</h1>
      <Create onHandleSubmit= {addColorCard}/>
      <div className='color-container'>
        <ColorCard codes={colorArray} onHandleDelete={deleteColorCard}/>
      </div>
    </div>
  );
}

export default App;
