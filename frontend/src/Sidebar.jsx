import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from "uuid";

function Sidebar(){
  const {allThreads, setAllThreads, currThreadId, setnewChat, setPrompt, setReply, setCurrThreadId, setprevChats} = useContext(MyContext);

  const getAllThreads = async () =>{
    try{
    const response = await fetch("http://localhost:8080/api/thread");
    const res = await response.json();
    const filteredData = res.map(thread =>({threadId: thread.threadId, title: thread.threadTitle}));
    // console.log(filteredData);
    setAllThreads(filteredData);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() =>{
    getAllThreads();
  },[])

  const createNewChat = () =>{
     setnewChat(true);
     setPrompt("");
     setReply(null);
     setCurrThreadId(uuidv1());
     setprevChats([]);
  }

  const changeThread = async (newThreadId) =>{
      setCurrThreadId(newThreadId);

      try{
      const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
      const res = await response.json();
      console.log(res);
      setprevChats(res);
      setnewChat(false);
      setReply(null);
      }catch(err){
        console.log(err);
      }
  }

  const deleteThread = async (threadId) =>{
    try{
     const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {method: "DELETE"});
     const res = await response.json();
     console.log(res);

      //updated threads re-render
      setAllThreads(prev => prev.filter(thread => thread.threadId != threadId));

      if(threadId === currThreadId){
        createNewChat();
      }


    } catch(err){
      console.log(err);
    }
  }

  return (
    <section className="sidebar">
   
      <button onClick={createNewChat}>
        <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
        <i className="fa-regular fa-pen-to-square"></i>
      </button>

      <ul className="history">
          {
             allThreads?.map((thread, idx) =>(
              <li key={idx} 
               onClick={() => changeThread(thread.threadId)}
               className={thread.threadId === currThreadId ? "highlighted": ""}
              >{thread.title}
               <i className="fa-solid fa-trash"
                  onClick={(e) =>{
                    e.stopPropagation(); //stop event bubbling
                    deleteThread(thread.threadId);
                  }}
               ></i>
              </li>
             ))
          }
      </ul>
     
      <div className="sign">
          <p>By Pratham Vyas &hearts;</p>
      </div>
    </section>
  )
}

export default Sidebar;