import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners";


function ChatWindow(){
  
  const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setprevChats, newChat, setnewChat} = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () =>{
    setLoading(true);
    setnewChat(false);
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };
     try{
       const response = await fetch("http://localhost:8080/api/chat", options);
       const res = await response.json();
       console.log(res);
       setReply(res.reply);
     }catch(err){
      console.log(err)
     }
     setLoading(false);
  }

//Appending new chat to prevChats
   useEffect(() =>{
     if(prompt && reply){
      setprevChats(prevChats =>(
        [...prevChats, {
          role:"user",
          content: prompt
        },{
          role:"assistant",
          content: reply
        }]
      ));
    }

    setPrompt("");
   },[reply])

   useEffect(() => {
  if (newChat) {
    setprevChats([]);
    setReply(null);
    setPrompt("");
    setnewChat(false);
  }
}, [newChat]);


const handleProfileClick = () =>{
   setIsOpen(!isOpen);
}

  return (
    <div className="chatWindow">

      <div className="navbar">
        <span>MyGPT <i className="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon"><i className="fa-regular fa-user"></i></span>
          </div>
      </div>  
      {
          isOpen &&
          <div className="dropDown">
             <div className="dropDownItems"><i class="fa-solid fa-gear"></i>Settings</div>
            <div className="dropDownItems"><i class="fa-regular fa-circle-up"></i>Upgrade Plan</div>
            <div className="dropDownItems"><i class="fa-solid fa-right-from-bracket"></i>Log out</div>
          </div>

      }

      {prevChats.length > 0 && <Chat />}
      <ScaleLoader color="#fff" loading={loading}>

      </ScaleLoader>
      <div className="chatInput">
        <div className="inputBox">
          <input placeholder="Ask anything"
          value = {prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter'? getReply(): ''}>
                
          </input>
         <div id="submit" onClick={getReply}>
          <i className="fa-regular fa-paper-plane"></i>
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