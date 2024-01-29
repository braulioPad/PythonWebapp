import React, { useState } from 'react';

function App() {
  const [transcription, setTranscription] = useState(null);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language is English

  const handleFetchTranscription = async () => {
    try {
      // Make a POST request to the server endpoint
      const response = await fetch('http://localhost:5000/detect-and-translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paragraph: inputText,
          target_language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transcription');
      }

      // Parse the JSON response
      const data = await response.json();
      console.log(data);

      // Update the state with the fetched transcription
      setTranscription(data.translated_paragraph);
    } catch (error) {
      console.error('Error fetching transcription:', error.message);
    }
  };

  return (
    <div>
      <h1>React App</h1>
      <textarea
        rows="4"
        cols="50"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to transcribe"
      />
      <br />
      <label htmlFor="targetLanguage">Select Target Language: </label>
      <select
        id="targetLanguage"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="ja">Japanese</option>
        {/* Add more language options as needed */}
      </select>
      <br />
      <button onClick={handleFetchTranscription}>Fetch Transcription</button>
      {transcription && <p>Transcription: {transcription}</p>}
    </div>
  );
}

export default App;