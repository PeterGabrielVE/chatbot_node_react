import React, { useState } from 'react';
import axios from 'axios';

const baseURL = "http://localhost:3001/chatgpt";


const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(baseURL, { prompt: input });
      setResponse(result.data.text);
    } catch (error) {
      console.error(error);
      setResponse('Ha ocurrido un error mientras se estaba procesando tu petición.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Ingresa texto:</label>
        <input
          placeholder='Habla con el ChatBot'
          type="text"
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <div>
        <h3>Respuesta:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatGPT;