import React, { useEffect, useState,useContext } from 'react'
import { FaBeer } from 'react-icons/fa';
import { AiTwotoneAudio,AiOutlineSearch,AiOutlineBars,AiTwotoneBell,AiOutlineVideoCamera,AiOutlineArrowLeft } from "react-icons/ai";
import '../../../App.css'
import { Link } from 'react-router-dom';
import logo from './logo/youtub.jpg'
import user from './logo/img1.jpg'
import './navbar.css'
import { auth, db } from '../../../firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Usercontext } from '../../context/Usercontext';
function Navbar() {
const[channel,setChannel]=useState("")
//const {setCheckuser}= useContext(Usercontext)

const {checkuser,userinfo,mobilesidebar,setMobilesidebar}= useContext(Usercontext)

//console.log(checkuser)
  
   const showsearch=()=>{
    const mobileview = document.getElementById("centerbar");
    mobileview.classList.toggle("mobile")
   // console.log(rootElement)

   }

   const showsupload=()=>{
    const upload= document.getElementById("showupload");
    upload.classList.toggle("showupload")
   
   }

   const showchannel=()=>{
     const channelname= document.getElementById("channel");
    channelname.classList.toggle("showupload")
   }

   useEffect(() => {
 //setChannel(docSnap.data());
 if(!checkuser){

 }else{
 
 getDoc(doc(db, "channels", auth?.currentUser.uid )).then(docSnap => {
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    setChannel(docSnap.data());
  } else {
    console.log("No such document!");
  }
})
 }
   }, [channel]);



const logoutuser=()=>{
  signOut(auth).then(() => {
    window.location.reload(true)
  }).catch((error) => {
    // An error happened.
  });
}



  return (
  <section className="navbar-section">
    <nav className="navbar">
        <div className="leftbar">
        
            <Link to="#"><AiOutlineBars size={30}/></Link>
          <Link to="/">  <img src={logo}  alt='youtube'/></Link>
        </div>
        <div className="centerbar" id='centerbar' >
          <button onClick={showsearch} className='closesearchbar'><AiOutlineArrowLeft size={24}/></button>
              <form className="form-topbar">
              <input type="text" />
               <button className='searchbtn' ><AiOutlineSearch size={28}/></button>
              </form>
              <button  className='searchicon' ><AiTwotoneAudio size={28}/></button>
          
         
       </div>
        
       <button onClick={showsearch} className='closesearchbtnbar'><AiOutlineSearch size={24}/></button>

        <div className="rightbar">
            <button><AiTwotoneBell size={24}/></button>
         <div className='chosholderdiv'>
         <button  onClick={showsupload}><AiOutlineVideoCamera size={24}/></button>
         <div className="choseupload" id='showupload'>
          <Link to="/">GO LIVE</Link>
          <Link to="/createvideo">UPLOAD</Link>
         </div>
         </div>
          {checkuser?(
             <div className='chosholderdiv'>
             <Link  onClick={showchannel} to="#">  <img src={userinfo?.photoURL}  alt='user'/></Link>
             <div className="choseupload" id='channel'>
              <Link to="#">{userinfo?.displayName}</Link>
              <Link to="#" onClick={logoutuser}>Logout</Link>
             </div>
             </div>
             
          ):(
            <Link to="/register">  <img src={user}  alt='user'/></Link>
          )}
        </div>
    </nav>
  </section>
  )
}

export default Navbar