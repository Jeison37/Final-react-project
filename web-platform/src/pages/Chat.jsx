import { useRef, useState, useEffect } from "react";

const Chat = () => {
  const socket = useRef(null);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:8080');

    socket.current.addEventListener("message", ({ data }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    if (inputRef.current.value) {
      socket.current.send(inputRef.current.value);
      inputRef.current.value = "";
    }
    inputRef.current.focus();
  }

  return (
    <>
      <div className="min-h-screen w-full text-white">
        <form onSubmit={sendMessage}>
          <input
            ref={inputRef}
            className="text-black"
            type="text"
            placeholder="Your message"
          />
          <button>Send</button>
        </form>
        <ul id="l">
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Chat;