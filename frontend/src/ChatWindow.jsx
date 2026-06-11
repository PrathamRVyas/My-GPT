import "./ChatWindow.css";
import Chat from "./Chat.jsx";

function ChatWindow(){
  return (
    <div className="chatWindow">

      <div className="navbar">
        <span>MyGPT <i class="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv">
          <span className="userIcon"><i class="fa-regular fa-user"></i></span>
          </div>
      </div>  

      <Chat></Chat>

      <div className="chatInput">
        <div className="inputBox">
          <input placeholder="Ask anything">

          </input>
         <div id="submit">
          <i class="fa-regular fa-paper-plane"></i>
         </div>
        </div>

        <p className="info">
          MyGPT can make mistakes. Check important info.
        </p>

      </div>

    </div>

  )
}

export default ChatWindow;