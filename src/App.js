import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import './App.css';
import { ColorCard } from './components/ColorCard.js/ColorCard';
import Create from './components/Form/Create';
import { setLocalStorage, loadLocalStorage } from './lib/localStorage';


const colorCodes = [ 
  {id: nanoid(), color: "#CD5C5C"}, 
  {id: nanoid(), color: "#6495ED"}, 
  {id: nanoid(), color: "#9FE2BF"}
];

function App() {
  const [colorArray, setColorArray] = useState(loadLocalStorage("colorSaverArray") ?? colorCodes);

  useEffect(()=>{
    setLocalStorage("colorSaverArray", colorArray);
  },[colorArray])

  function addColorCard(newColor){
      try {
        setColorArray([...colorArray, {id: nanoid(), color: newColor}])
      } catch (error) {
      console.log(error.message)
    }
  }

  function deleteColorCard(event, cardId){
    event.stopPropagation();
    setColorArray(colorArray.filter(card=> cardId === card.id ? "" : card ))
  }

  function editColorCard(event, cardId, newColor){
    event.stopPropagation();
    setColorArray(colorArray.map(card=>cardId === card.id ? {id: card.id, color: newColor} : card))
  }

  return (
    <div className="App">
      <h1>Color Saver</h1>
      <Create onHandleSubmit= {addColorCard}/>
      <div className='color-container'>
        <ColorCard codes={colorArray} onHandleDelete={deleteColorCard} onHandleEdit={editColorCard}/>
      </div>
    </div>
  );
}

export default App;
