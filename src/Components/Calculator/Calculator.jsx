import React, { useState, useEffect, useCallback } from "react";
import { create, all } from "mathjs";

const math = create(all);

const keys = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
];

export default function Calculator() {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState("");

    const handleInput = useCallback((key) => {
        if (key === "=") {
            try {
                const evalResult = math.evaluate(expression);
                setResult(evalResult.toString());
            } catch {
                setResult("Error");
            }
            return;
        }

        setExpression(prev => prev + key);
        setResult("");
    }, [expression]);

    useEffect(() => {
       const handleKey = (e) => {

         const key = e.key;

         if (key === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
           handleInput("=");
         } else if (/[0-9+\-*/.=]/.test(key)) {
           handleInput(key);
         } else if (key === "Backspace") {
           setExpression((prev) => prev.slice(0, -1));
         }
         
       };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleInput]);

    return (
        <div className="calculator">
            <div className="display">
                <div>{expression || "0"}</div>
                <div className="result">{result}</div>
            </div>
            <div className="buttons">
                {keys.map((key) => (
                    <button key={key} onClick={() => handleInput(key)}>
                        {key}
                    </button>
                ))}
                <button onClick={() => setExpression("")}>CE</button>
                <button onClick={() => setExpression(prev => prev.slice(0, -1))}>⌫</button>
            </div>
        </div>
    );
}