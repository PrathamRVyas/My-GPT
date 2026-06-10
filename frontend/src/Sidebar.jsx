import "./Sidebar.css";

function Sidebar(){
  return (
    <section className="sidebar">
   
      <button>
        <img src="src/assets/blacklogo.png" alt="gpt logo"></img>
        <i className="fa-regular fa-pen-to-square"></i>
      </button>

      <ul className="history">
          <li>history1</li>
          <li>history2</li>
          <li>history3</li>
      </ul>
     
      <div className="sign">
          <p>By Pratham Vyas &hearts;</p>
      </div>
    </section>
  )
}

export default Sidebar;