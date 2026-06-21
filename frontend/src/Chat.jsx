import "./Chat.css";
import { MyContext } from "./MyContext";
import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setlatestReply] = useState(null);

  useEffect(() => {

    if(reply === null){
      setlatestReply(null);
      return;
    }

    if (!prevChats?.length) return;

    const words = reply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setlatestReply(words.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= words.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  return (
    <>
      {newChat && <h1>Start a new chat!</h1>}
      <div className="chats">

        {/* Past chats — all except the latest GPT reply */}
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
            )}
          </div>
        ))}

        {/* Latest reply with typing effect — outside the loop */}
        {latestReply !== null && (
          <div className="gptDiv">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
          </div>
        )}


         {latestReply === null && (
          <div className="gptDiv">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
          </div>
        )}

      </div>
    </>
  );
}

export default Chat;