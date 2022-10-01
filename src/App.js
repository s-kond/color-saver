import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import './App.css';
import { ColorCard } from './components/ColorCard.js/ColorCard';
import Create from './components/Form/Create';
import { setLocalStorage, loadLocalStorage } from './lib/localStorage';


const colorCodes = [ 
  {id: nanoid(), color: "#CD5C5C", name: "Chestnut Rose"}, 
  {id: nanoid(), color: "#6495ED", name: "Cornflower Blue"}, 
  {id: nanoid(), color: "#9FE2BF", name: "Sea Green"}
];

function App() {
  const [colorArray, setColorArray] = useState(loadLocalStorage("colorSaverArray") ?? colorCodes);

  useEffect(()=>{
    setLocalStorage("colorSaverArray", colorArray);
  },[colorArray])

  function addColorCard(newColor){
    let cleanHex = newColor.substring(1);
    console.log(cleanHex);
    const apiURL = `https://www.thecolorapi.com/id?hex=${cleanHex}`
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        try {
          setColorArray([...colorArray, {id: nanoid(), color: newColor, name: data.name.value}])
          console.log(colorArray);
        } catch (error) {
          console.log(error.message)
    }})
  }

  function deleteColorCard(event, cardId){
    event.stopPropagation();
    setColorArray(colorArray.filter(card=> cardId === card.id ? "" : card ))
  }

  function editColorCard(event, cardId, newColor){
    event.stopPropagation();
    let cleanHex = newColor.substring(1);
    console.log(cleanHex);
    const apiURL = `https://www.thecolorapi.com/id?hex=${cleanHex}`
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {  
      setColorArray(colorArray.map(card=>cardId === card.id ? {id: card.id, color: newColor, name: data.name.value} : card))
  })
  }

  return (
    <div className="App">
      <h1>Color Saver</h1>
      <Create onHandleSubmit={addColorCard}/>
      <div className='color-container'>
        <ColorCard colors={colorArray} onHandleDelete={deleteColorCard} onHandleEdit={editColorCard}/>
      </div>
    </div>
  );
}

export default App;
