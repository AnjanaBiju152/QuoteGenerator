import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuoteGenerator.css';

const AUTHOR_IMAGES = {
  "Rumi": "https://sp.yimg.com/ib/th?id=OIP.CIvEZQdCsOhsCK67HtsJaAAAAA&pid=Api&w=148&h=148&c=7&dpr=2&rs=1",
  "Abu Bakr (R.A)": "https://up.yimg.com/ib/th?id=OIP.zLhMajwizzbnkliIDLKf7QHaEJ&pid=Api&rs=1&c=1&qlt=95&w=192&h=107",
  "Ali ibn Abi Talib (R.A)": "https://tse1.mm.bing.net/th?id=OIP.paSIOcmw38-Zd5bf0bD7QgHaI-&pid=Api&P=0&h=180",
  "Abdul Kalam": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A._P._J._Abdul_Kalam.jpg/220px-A._P._J._Abdul_Kalam.jpg",
  "Bill Gates": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bill_Gates_2018.jpg/220px-Bill_Gates_2018.jpg",
  "Albert Einstein": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",
  "Abraham Lincoln": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/220px-Abraham_Lincoln_O-77_matte_collodion_print.jpg",
  "Oprah Winfrey": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Oprah_in_2014.jpg/220px-Oprah_in_2014.jpg",
  "Muhammad Ali": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/220px-Muhammad_Ali_NYWTS.jpg",
  "William Shakespeare": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/220px-Shakespeare.jpg",
  "Mother Teresa": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mother_Teresa_1.jpg/220px-Mother_Teresa_1.jpg",
  "Nelson Mandela": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/220px-Nelson_Mandela_1994.jpg",
  "Walt Disney": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Walt_Disney_1946.JPG/220px-Walt_Disney_1946.JPG",
  "Aristotle": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/220px-Aristotle_Altemps_Inv8575.jpg",
  "Umar ibn Al-Khattāb (R.A)": "https://tse2.mm.bing.net/th?id=OIP.e6SfdU-HpxtJFB6v4Tqq0wHaE8&pid=Api&P=0&h=180"
};

const QuoteGenerator = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://dummyjson.com/quotes');
      setQuotes(response.data.quotes);
      
      if (response.data.quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * response.data.quotes.length);
        setCurrentQuote(response.data.quotes[randomIndex]);
      }
      
      setLoading(false);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to fetch quotes. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleNewQuote = () => {
    if (quotes.length > 0) {
      const filteredQuotes = quotes.filter(quote => quote.id !== currentQuote.id);
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      setCurrentQuote(filteredQuotes[randomIndex]);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        Inspiring Wisdom Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        {error}
      </div>
    );
  }

  const authorImage = AUTHOR_IMAGES[currentQuote.author] || 
    "https://via.placeholder.com/180?text=Author";

  return (
    <div className="quote-container">
      <div className="quote-card">
        <div className="author-image-container">
          <img 
            src={authorImage} 
            alt={currentQuote.author}
            className="author-image"
          />
        </div>

        <div className="quote-text">
          <div className="quote-mark quote-mark-top">
            "
          </div>
          {currentQuote.quote}
          <div className="quote-mark quote-mark-bottom">
            "
          </div>
        </div>

        <div className="author-name">
          - {currentQuote.author}
        </div>

        <button 
          onClick={handleNewQuote}
          className="new-quote-btn"
        >
          New Inspirational Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteGenerator;