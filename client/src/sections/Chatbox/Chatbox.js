import React, { useState } from 'react';
import './chat.css';
import { useNavigate } from 'react-router-dom';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { name: 'User', message: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const botMessage = { name: 'Sam', message: data.response, links: data.results || [] };
      setMessages([...newMessages, botMessage]);
    } catch (err) {
      console.error('Eroare:', err);
      const errorMsg = {
        name: 'Sam',
        message: 'A apărut o eroare. Încearcă din nou mai târziu.',
        links: []
      };
      setMessages([...newMessages, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const renderMessages = () =>
    [...messages].reverse().map((msg, i) => (
      <div
        key={i}
        className={`messages__item messages__item--${msg.name === 'Sam' ? 'visitor' : 'operator'}`}
      >
        <div>{msg.message}</div>
        {msg.links && msg.links.length > 0 && (
          <ul style={{ marginTop: '6px', paddingLeft: '15px' }}>
            {msg.links.map((linkObj, idx) => (
              <li key={idx}>
                <button
                  onClick={() => navigate(linkObj.link)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#581B98',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  {linkObj.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    ));

  return (
    <div className="chatbox">
      <div className={`chatbox__support ${isOpen ? 'chatbox--active' : ''}`}>
        <div className="chatbox__header">
          <div className="chatbox__image--header">
            <img
              src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
              alt="chatbot"
            />
          </div>
          <div className="chatbox__content--header">
            <h4 className="chatbox__heading--header">Asistent cadastral</h4>
            <p className="chatbox__description--header">
              Salut! Îți pot recomanda servicii cadastrale.
            </p>
          </div>
        </div>

        <div className="chatbox__messages">
          {renderMessages()}
          {loading && (
            <div className="messages__item messages__item--visitor">
              <i>Scrie răspuns...</i>
            </div>
          )}
        </div>

        <div className="chatbox__footer">
          <input
            type="text"
            placeholder="Scrie un mesaj..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="chatbox__send--footer send__button" onClick={sendMessage}>
            Trimite
          </button>
        </div>
      </div>

      <div className="chatbox__button">
        <button onClick={toggleChat}>
          <img src="/assets/chatbox-icon.svg" alt="open chat" />
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
