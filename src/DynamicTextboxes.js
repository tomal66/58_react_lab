import React, { useState } from 'react';
import './DynamicTextboxes.css'; 

function DynamicTextboxes() {
  const [textboxes, setTextboxes] = useState([]);

  const addTextbox = () => {
    const newTextbox = { id: Math.random(), value: "" };
    setTextboxes([...textboxes, newTextbox]);
  };

  const deleteTextbox = (id) => {
    setTextboxes(textboxes.filter(textbox => textbox.id !== id));
  };

  const handleTextboxChange = (id, newValue) => {
    if (isNaN(newValue)) {
      alert("Please enter a valid number."); 
      return; 
    }
    
    const newTextboxes = textboxes.map(textbox => {
      if (textbox.id === id) {
        return { ...textbox, value: newValue };
      }
      return textbox;
    });
    setTextboxes(newTextboxes);
  };

  const sum = textboxes.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);

  return (
    <div className="container">
      <button className="add-btn" onClick={addTextbox}>Add Textbox</button>
      {textboxes.map(textbox => (
        <div className="card" key={textbox.id}>
          <input
            type="text"
            value={textbox.value}
            onChange={(e) => handleTextboxChange(textbox.id, e.target.value)}
            className="textbox"
          />
          <button className="delete-btn" onClick={() => deleteTextbox(textbox.id)}>Delete</button>
        </div>
      ))}
      <div className="sum-display">Sum: {sum}</div>
    </div>
  );
}

export default DynamicTextboxes;
