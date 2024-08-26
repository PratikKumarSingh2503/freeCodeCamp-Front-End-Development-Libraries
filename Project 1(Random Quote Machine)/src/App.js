// import './App.css';
// import { useEffect, useState } from "react";

// function App() {
//   const [quoteInfo, setQuoteInfo] = useState({})

//   useEffect(() => {
//     getQuote();
//   }, []);

//   const getQuote = () => {
//     fetch('https://api.quotable.io/random')
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         setQuoteInfo({
//           text: data.content,
//           author: data.author,
//         });
//       });
//   };

//   return (

//     <div className="App">
//       <div id="quote-box">
//         <p id="text">{quoteInfo.text}</p>
//         <p id="author">{quoteInfo.author}</p>
//         <button id="new-quote" onClick={getQuote}>New Quote</button>
//         <a
//           href={
//             'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
//             quoteInfo.text
//           }
//           id="tweet-quote">Post to twitter
//         </a>
//       </div>
//     </div>
//   );
// }

// export default App;

import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [quoteInfo, setQuoteInfo] = useState({
    text: "",
    author: "",
  });

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setQuoteInfo({
        text: data.content,
        author: data.author || "Unknown",
      });
    } catch (error) {
      console.error('Failed to fetch:', error.message);
      setQuoteInfo({
        text: "An error occurred while fetching the quote.",
        author: "",
      });
    }
  };

  return (
    <div className="App">
      <div id="quote-box">
        <p id="text">{quoteInfo.text}</p>
        <p id="author">{quoteInfo.author && `- ${quoteInfo.author}`}</p>
        <button id="new-quote" onClick={getQuote}>New Quote</button>
        <a
          href={
            'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
            encodeURIComponent(`"${quoteInfo.text}" - ${quoteInfo.author}`)
          }
          id="tweet-quote"
          target="_blank"
          rel="noopener noreferrer"
        >
          Post to Twitter
        </a>
      </div>
    </div>
  );
}

export default App;