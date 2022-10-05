import { useState } from "react";
import "./Create.css";

export default function Create({ onHandleSubmit }) {
  const [color, setColor] = useState("#000000");

  function handleSetColor(chosenColor) {
    setColor(chosenColor.toUpperCase());
    console.log(color);
  }

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { colorTextInput } = form.elements;
    onHandleSubmit(colorTextInput.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>New Card</h2>
      <input
        className="colorPicker"
        name="colorPicker"
        id="colorPicker"
        type="color"
        value={color}
        onChange={(event) => handleSetColor(event.target.value)}
      />
      <input
        className="colorTextInput"
        name="colorTextInput"
        type="text"
        value={color}
        onInput={(event) => handleSetColor(event.target.value)}
        maxLength="7"
        pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        title="3- or 6-digit hexcode. Only numbers and letters from A-F."
      />
      <button className="addColorButton" type="submit">
        Add
      </button>
    </form>
  );
}
