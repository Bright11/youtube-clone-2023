import { AiOutlinePauseCircle } from "react-icons/ai"; 
import { AiFillPlayCircle } from "react-icons/ai"; 
import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './details.css'
import cvideo from "./video/videos.mp4"
import { Link, useParams } from 'react-router-dom'
import { AiFillDislike, AiFillLike, AiOutlineSend } from 'react-icons/ai'
import user from "./logo/img1.jpg"
import { auth, db } from '../../../firebase'
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { Usercontext } from "../../context/Usercontext";
function Details() {
  const {watch}=useParams();
  const [watchvideo,setWatchvideo]= useState();
const [playvideo,setPlayvideo]=useState(true)
const {userinfo}=useContext(Usercontext)
const [comment,setComment]=useState("")
const [seecomment,setSeecomment]=useState([])
  useEffect(()=>{
    videoinfo()
    mycomment();
  },[watchvideo])

  const videoinfo= async ()=>{
    const getvideo = doc(db,"videos", watch);
    const videoitem= await getDoc(getvideo);
    setWatchvideo(videoitem.data());
    // 
  }
  const handlecomment= async(e)=>{
    e.preventDefault();
    //  save
   const commentvideo= await addDoc(collection(db , "comment"), {
      comment:comment,
      photoURL:userinfo.photoURL,
      userid:userinfo.uid,
      videoid:watch,
      //photoURL
      timestamp: serverTimestamp(),
    }).then((commentvideo)=>{
      setComment("")
    })
   
  }

  // getting comment

  const mycomment = async () => {
   try {
    const findcomment = await collection(db, "comment");
    const allcomment = query(
      findcomment,
      where("videoid", "==", watch)
    );
    const querySnapshot = await getDocs(allcomment);
    let allc = [];
    querySnapshot.forEach((doc) => {
      allc.push({ id: doc.id, ...doc.data() });
    });
    setSeecomment(allc);
    //the end
   } catch (error) {
    console.log(error)
   }
  };
  //console.log(seecomment)
  // the end

  const like =async(userlike)=>{
    try {
      const update= updateDoc(doc(db,"videos",watch),{
        likes:Number(userlike+1),
      }).then(async()=>{
        await addDoc(collection(db , "likes"), {
          videoid:watch,
          userid:userinfo.uid,
          //photoURL
          timestamp: serverTimestamp(),
        })
      })
     } catch (error) {
      console.log(error)
     }
  }

  function play(){
     const video = document.getElementById('myVideo');
    video.play()
  setPlayvideo(false)
  }

  function pause(){
    const video = document.getElementById('myVideo');
    video.pause();
   // video.currentTime = 0;
    setPlayvideo(true)
  }
 
  return (
    <div className='sectionpages'>
     
    <section className='container'>
    <section className="sidebarsection">
     <div className="sidebar">
       <Sidebar/>
        </div>
     </section>
    <section className="mainsection">
    <div className="main detailspagevideos">
  <div className="watchvideo">
   <div className="watch">
   <video id="myVideo"  src={watchvideo?.video}></video>
   {playvideo?(<button onClick={play} id="playButton"><AiFillPlayCircle size={30} /></button>):(
    <button onClick={pause} id="playButton"><AiOutlinePauseCircle size={30} /></button>
   )}
   </div>
    <div className="video-details-info">
      <h1>{watchvideo?.name}</h1>
    </div>
    <div className="subscribe">
      <button>Subscribs</button>
      <button onClick={()=>like(watchvideo?.likes)}><AiFillLike size={24} color='black'/>{watchvideo?.likes}</button>
      <button><AiFillDislike size={24} color='black'/></button>
      <button>Share</button>

    </div>
    <div className="description">
      <p>{watchvideo?.discription}</p>
    </div>
   <div className="commentsection">
   <h1>Comments</h1>
   <div className="divform">
   <div className="detailsuser">
   <img src={user} alt="" />
   </div>
   <form onSubmit={handlecomment}>
    <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Add comment'/>
    <button><AiOutlineSend size={24}/></button>
   </form>
   </div>
   <div className="users-comment">
   {seecomment?.map((c)=>(
    <div className="commentsdetails">
    <div className="userimg">
      <img src={c?.photoURL} alt="" />
    </div>
    <p>{c.comment}</p>
   </div>
   ))}
   {/* <div className="commentsdetails">
    <div className="userimg">
      <img src={user} alt="" />
    </div>
    <p>All Plugins from PHP to Bootstrap, Created by Our Global Community of Developers. Secure Shopping Cart. Types: Galleries, Navigation & Menus, Charts & Graphs, Calendars. Over 10M Customers. 60M+ Items Sold. Premium Support. The No.1 Code Marketplace.</p>
   </div> */}
   
   </div>


   </div>
  </div>

  {/*  */}
  <div className="relatedvideos">
    <div className="relatedvideospage">
    <Link to="/details">
     <div className="rvideo">
    <video src={cvideo} controls></video>
      </div>
      <h1>programming videos</h1>
     </Link>
    </div>
    <div className="relatedvideospage">
     <Link to="/details">
     <div className="rvideo">
    <video src={cvideo} controls></video>
      </div>
      <h1>programming videos</h1>
     </Link>
    </div>
   
  </div>
    </div>

    
    </section>
    </section>
    </div>
  )
}

export default Details

