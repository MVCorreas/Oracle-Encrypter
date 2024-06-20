import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isEncrypt, setIsEncrypt] = useState(true);
  const resultTextAreaRef = useRef(null);

  const encryptionKeys = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEncrypt = () => {
    let encryptedText = inputText.replace(/[eioua]/g, (char) => encryptionKeys[char]);
    setResultText(encryptedText);
  };

  const handleDecrypt = () => {
    let decryptedText = inputText;
    for (const [key, value] of Object.entries(encryptionKeys)) {
      decryptedText = decryptedText.replace(new RegExp(value, 'g'), key);
    }
    setResultText(decryptedText);
  };

  const handleCopy = () => {
    if (resultTextAreaRef.current) {
      resultTextAreaRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <div className="App">
      <h1>Text Encryption App</h1>
      <textarea value={inputText} onChange={handleChange} placeholder="Enter text here"></textarea>
      <br />
      <button onClick={() => setIsEncrypt(!isEncrypt)}>
        {isEncrypt ? 'Switch to Decrypt' : 'Switch to Encrypt'}
      </button>
      <br />
      <button onClick={isEncrypt ? handleEncrypt : handleDecrypt}>
        {isEncrypt ? 'Encrypt' : 'Decrypt'}
      </button>
      <br />
      <textarea
        ref={resultTextAreaRef}
        readOnly
        value={resultText}
        placeholder="Result will appear here"
      ></textarea>
      <br />
      <button onClick={handleCopy}>Copy to Clipboard</button>
    </div>
  );
}

export default App;
