import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  
  const colors = [
    "#ff5733",
    "#42aaff",
    "#b900fa",
    "#ffe119",
    "#ff3c00",
    "#ff6e54",
    "#7eff7e",
    "#ffaa00",
    "#4d79ff",
    "#ffea00",
  ];

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch("https://api.quotable.io/random")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error ("Failed to fetch quote");
        }
      })
      .then (data => {
        setQuote(data.content);
        setAuthor(data.author);
        setBackgroundColor(colors[Math.floor(Math.random() * 10)]);
      })
      .catch(error => {
        console.error('Error fetching quote: ', error);
      });
  }

  const handleNewQuote = () => {
    fetchQuote();
  }

  return (
    <div className="screen-container" style={{ backgroundColor }}>
      <div id="quote-box">
        <div className="quote">
          <h1 id="text">{quote}</h1>
          <h2 id="author">{author}</h2>
        </div>
        <div className="buttons">
          <div className="socials">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote} - ${author}`)}`} target="_blank" rel="noopener noreferrer" className="btn" style={{ backgroundColor }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
          </div>
          <button className="btn" id="new-quote" onClick={handleNewQuote} style={{ backgroundColor }}>New quote</button>
        </div>
      </div>
      <h3>By Edgar Airault (Garedy)</h3>
    </div>
  );
}

export default App;
