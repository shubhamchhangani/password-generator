import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(12);
  const [allowedNumber, setAllowedNumber] = useState(false);
  const [allowedChar, setAllowedChar] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(allowedNumber){
      str += "0123456789";
    }

    if(allowedChar){
      str += "!@#$%^&*()";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);

  }, [length, allowedNumber, allowedChar, setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [length, allowedNumber, allowedChar, passwordGenerator])
  
  function copyHandler() {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(password);
    setTimeout(() => { 
      setCopied(true);
    }, 100)
    setTimeout(() => { 
      setCopied(false);
    }, 2000)
  }
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyHandler}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className='flex justify-center items-center mb-4'>
        <span className="rounded-lg  mx-2">{copied && "copied"}</span>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={allowedNumber}
            id="numberInput"
            onChange={() => {
              setAllowedNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={allowedChar}
            id="characterInput"
            onChange={() => {
              setAllowedChar((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App
