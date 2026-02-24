import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

type Chat = {
  input: string;
  response: string;
  youtubeUrl?: string;
  isFallback?: boolean;
};

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<Chat[]>([]);

  function buildYouTubeSearch(query: string) {
    const channels = [
      "CA Rachana Ranade",
      "Finance With Sharan",
      "Ankur Warikoo",
      "Pratik Chn",
    ];

    // pick 1–2 channels to avoid clutter
    const channelHint = channels.join(" OR ");

    const searchQuery = encodeURIComponent(`${query} ${channelHint}`);

    return `https://www.youtube.com/results?search_query=${searchQuery}`;
  }

  const suggestions = [
    "How does Investly work?",
    "What is Asset Allocation?",
    "what is sharpe ratio?",
    "What is an Emergency Fund?",
    "SIP vs Lumpsum",
    "what is technical analysis?",
    "long term vs short term capital gains",
    "what is portfolio rebalancing?",
  ];

  const suggestInput = (sug: string) => {
    setInput(sug);
  };

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage = input;

    // 1️⃣ show user message immediately
    setChat((prev) => [...prev, { input: userMessage, response: "" }]);
    setInput("");

    try {
      const res = await fetch("https://investly5.netlify.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userMessage }),
      });

      const data = await res.json();

      // 2️⃣ attach bot reply to last message
      setChat((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          response: data.reply,
          youtubeUrl: data.isFallback
            ? undefined
            : buildYouTubeSearch(userMessage),
          isFallback: data.isFallback,
        };

        return updated;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="chatWorld">
      <div className="responseContainer">
        <p className="chatResponse">
          Hey, I am InvestIQ your Finance Chatbot Assistant
        </p>
        {chat.map((cha, index) => (
          <div key={index} className="chatCon">
            <div className="userChatBox">
              <p className="userChat">{cha.input}</p>
            </div>
            <div className="chatbotResBox">
              {cha.response && (
                <p className="chatResponse bot">
                  {cha.response}
                  <br />
                  {cha.youtubeUrl && (
                    <a
                      href={cha.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ytLink"
                    >
                      Watch related YouTube videos
                    </a>
                  )}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="inputContainerjj">
        <div className="suggestContainer">
          {suggestions.map((sug, i) => (
            <p
              className="suggestInput"
              key={i}
              onClick={() => suggestInput(sug)}
            >
              {sug}
            </p>
          ))}
        </div>
        <form onSubmit={send} className="chatbotForm">
          <input
            type="text"
            placeholder="Message"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="chatInput"
            required
          />
          <button className="chatBut">Send</button>
        </form>
      </div>
    </div>
  );
}
