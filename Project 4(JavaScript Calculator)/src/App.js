import { useState } from 'react';
import './App.css';
import { evaluate } from 'mathjs';  // Import evaluate from mathjs

function App() {
  const [display, setDisplay] = useState('0');
  const [resultComputed, setResultComputed] = useState(false);  // New state variable to track if the result has just been computed

  const handleNumber = (event) => {
    const number = event.target.textContent;
    if (resultComputed) {
      setDisplay(number);
      setResultComputed(false);
    } else if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (event) => {
    const operator = event.target.textContent;
    if (resultComputed) {
      setResultComputed(false);
    }
    // Check if the last character is an operator
    if (/[+\-*/]$/.test(display)) {
      // Handle consecutive operators, allowing negative sign
      if (operator === '-') {
        setDisplay(display + operator);
      } else {
        const updatedDisplay = display.replace(/([+\-*/])+$/, '') + operator;
        setDisplay(updatedDisplay);
      }
    } else {
      setDisplay(display + operator);
    }
  };

  const handleEqual = () => {
    try {
      const result = evaluate(display);  // Use evaluate to calculate the result
      setDisplay(result.toString());
      setResultComputed(true);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleDecimal = () => {
    const array = display.split(/([+\-*/])/);  // Split by operators, keeping them in the array
    const lastElement = array[array.length - 1];
    if (!lastElement.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setResultComputed(false);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="row">
          {display}
        </div>
        <div id="clear" className="row" onClick={handleClear}>
          AC
        </div>
        <div id="seven" onClick={handleNumber}>7</div>
        <div id="eight" onClick={handleNumber}>8</div>
        <div id="nine" onClick={handleNumber}>9</div>
        <div id="multiply" onClick={handleOperator}>*</div>
        <div id="four" onClick={handleNumber}>4</div>
        <div id="five" onClick={handleNumber}>5</div>
        <div id="six" onClick={handleNumber}>6</div>
        <div id="divide" onClick={handleOperator}>/</div>
        <div id="one" onClick={handleNumber}>1</div>
        <div id="two" onClick={handleNumber}>2</div>
        <div id="three" onClick={handleNumber}>3</div>
        <div id="add" onClick={handleOperator}>+</div>
        <div id="zero" onClick={handleNumber}>0</div>
        <div id="decimal" onClick={handleDecimal}>.</div>
        <div id="equals" onClick={handleEqual}>=</div>
        <div id="subtract" onClick={handleOperator}>-</div>
      </div>
    </div>
  );
}

export default App;
