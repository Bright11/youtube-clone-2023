import { AiFillLike } from "react-icons/ai"; 
import React, { useContext } from 'react'
import { BiHomeAlt,BiAbacus,BiListPlus } from "react-icons/bi";
import './sidebar.css'
import { BsFillCollectionPlayFill,BsStopwatch } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { AiOutlineCreditCard } from "react-icons/ai";
import { Usercontext } from "../../context/Usercontext";
function Sidebar() {
  const {mobilesidebar,setMobilesidebar}=useContext(Usercontext);

  return (
    <div className='sidebar'>
      <ul className="sidebarul" id="sidebarul">
    <Link to="/"><BiHomeAlt color='black' size={24}/><h1>Home</h1></Link>
    <Link to="/"><BiAbacus size={24} color='black'/><h1>Shorts</h1></Link>

    <Link to="/"><BsFillCollectionPlayFill size={24} color='black'/><h1 id="sidebarname1">Subscription</h1></Link>
    <Link to="/"><AiOutlineCreditCard size={24} color='black'/><h1 id="sidebarname2">Library</h1></Link>

    <Link to="/"><BsStopwatch size={24} color='black'/><h1 id="sidebarname3">History</h1></Link>

    <Link to="/"><BsFillCollectionPlayFill size={24} color='black'/><h1 id="sidebarname4">Your Videos</h1></Link>
    <Link to="/"><BsStopwatch size={24} color='black'/><h1 id="sidebarname5">Watch Later</h1></Link>

    <Link to="/"><AiFillLike size={24} color='black'/><h1 id="sidebarname6">Like Videos</h1></Link>

    <Link to="/"><BiListPlus size={24} color='black'/><h1 id="sidebarname7">Programms</h1></Link>

    
      </ul>
    </div>
  )
}

export default Sidebar
