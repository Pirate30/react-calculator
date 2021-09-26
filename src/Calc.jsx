import React, { useState } from "react";

export default function Calc() {
  // function to get buttons of digits
  const getDigitButton = () => {
    //   making the empty arry for digit buttons
    const digs = [];

    // using for loop to push 1 to 9 digit buttons in the digs array
    for (let i = 1; i < 10; i++) {
      digs.push(<button onClick={() => updateCalc(i.toString())}>{i}</button>);
    }

    // returning the array
    return digs;
  };

  // input value as a calc & result
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const operators = ["+", "-", "/", "*", "."];

  //   updating the calc screen value
  const updateCalc = (val) => {
    //   prevanting user to add multiple operators consequently & in starting
    if (
      (operators.includes(val) && calc === "") ||
      (operators.includes(val) && operators.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + val);

    // give results but check if the last value is not an operator
    if (!operators.includes(val)) {
      setResult(eval(calc + val).toString());
    }
  };

  //   showing the result of the caalculation on the screen
  const showResult = () => {
    try {
      setCalc(eval(calc).toString());
    } catch (err) {
      alert(err);
    }
  };

  // removing operation
  const removeValue = () => {
    if (calc === "") {
      return;
    }
    // removing the last element using the slice
    const value = calc.slice(0, -1);
    // then setting the calc as a new(updated) value
    setCalc(value);
  };

  return (
    <div className="calculator">
      {/* screen */}
      <div className="calcScreen">{calc || "0"}</div>

      {/* operators */}
      <div className="calcOperators">
        <button onClick={() => updateCalc("/")}>/</button>
        <button onClick={() => updateCalc("*")}>x</button>
        <button onClick={() => updateCalc("+")}>+</button>
        <button onClick={() => updateCalc("-")}>-</button>
        <button onClick={removeValue}>Back</button>
      </div>

      {/* digits */}
      <div className="calcDigits">
        {getDigitButton()}
        <button onClick={() => updateCalc("0")}>0</button>
        <button onClick={() => updateCalc(".")}>.</button>
        <button onClick={showResult}>=</button>
      </div>
    </div>
  );
}
