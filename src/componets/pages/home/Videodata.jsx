import React, { useEffect, useState } from 'react'
import user from "./logo/img1.jpg"
import video from "./video/videos.mp4"
import { Link } from 'react-router-dom'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
function Videodata() {
const[witch,setWitch]=useState([])

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "videos"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setWitch(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, [witch]);

  return (
    <>
    {witch?.map((w)=>(
       <div className="videosdiv" key={w.id}>
       <Link to={`details/${w.id}`}>
       <div className="myvideos-holder">
         <video controls >
         <source src={w.video} type="video/mp4"/>
         </video>
       </div>
     <div className="content-info">
     
        <div className="user-logo">
            <img src={w.photoURL} alt='user'/>
        </div>
         <div className="videodetails">
           <h1>{w.name}</h1>
           <p>{w.channel}</p>
           <div className="viewsdiv">
            <p>{w.likes}views</p>
            {/* <p>{w.timestamp.toDate()}</p> */}
           </div>
        </div>
     </div>
       </Link>
      </div>
    ))}
      {/* <div className="videosdiv">
       <Link to="/details">
       <div className="myvideos-holder">
         <video controls src={video}></video>
       </div>
     <div className="content-info">
        <div className="user-logo">
            <img src={user} alt='user'/>
        </div>
         <div className="videodetails">
           <h1>Project Management</h1>
           <p>Channel name</p>
           <div className="viewsdiv">
            <p>3k views</p>
            <p>3 days ago</p>
           </div>
        </div>
     </div>
       </Link>
      </div>
      <div className="videosdiv">
       <Link to="/details">
       <div className="myvideos-holder">
         <video controls src={video}></video>
       </div>
     <div className="content-info">
        <div className="user-logo">
            <img src={user} alt='user'/>
        </div>
         <div className="videodetails">
           <h1>Project Management</h1>
           <p>Channel name</p>
           <div className="viewsdiv">
            <p>3k views</p>
            <p>3 days ago</p>
           </div>
        </div>
     </div>
       </Link>
      </div>
      <div className="videosdiv">
       <Link to="/details">
       <div className="myvideos-holder">
         <video controls src={video}></video>
       </div>
     <div className="content-info">
        <div className="user-logo">
            <img src={user} alt='user'/>
        </div>
         <div className="videodetails">
           <h1>Project Management</h1>
           <p>Channel name</p>
           <div className="viewsdiv">
            <p>3k views</p>
            <p>3 days ago</p>
           </div>
        </div>
     </div>
       </Link>
      </div>
      <div className="videosdiv">
       <Link to="/details">
       <div className="myvideos-holder">
         <video controls src={video}></video>
       </div>
     <div className="content-info">
        <div className="user-logo">
            <img src={user} alt='user'/>
        </div>
         <div className="videodetails">
           <h1>Project Management</h1>
           <p>Channel name</p>
           <div className="viewsdiv">
            <p>3k views</p>
            <p>3 days ago</p>
           </div>
        </div>
     </div>
       </Link>
      </div>
      <div className="videosdiv">
       <Link to="/details">
       <div className="myvideos-holder">
         <video controls src={video}></video>
       </div>
     <div className="content-info">
        <div className="user-logo">
            <img src={user} alt='user'/>
        </div>
         <div className="videodetails">
           <h1>Project Management</h1>
           <p>Channel name</p>
           <div className="viewsdiv">
            <p>3k views</p>
            <p>3 days ago</p>
           </div>
        </div>
     </div>
       </Link>
      </div>
      <div className="videosdiv">
       <Link to="/details">
       <div className="myvideos-holder">
         <video controls src={video}></video>
       </div>
     <div className="content-info">
        <div className="user-logo">
            <img src={user} alt='user'/>
        </div>
         <div className="videodetails">
           <h1>Project Management</h1>
           <p>Channel name</p>
           <div className="viewsdiv">
            <p>3k views</p>
            <p>3 days ago</p>
           </div>
        </div>
     </div>
       </Link>
      </div>
      <div className="videosdiv">
       <Link to="/details">
       <div className="myvideos-holder">
         <video controls src={video}></video>
       </div>
     <div className="content-info">
        <div className="user-logo">
            <img src={user} alt='user'/>
        </div>
         <div className="videodetails">
           <h1>Project Management</h1>
           <p>Channel name</p>
           <div className="viewsdiv">
            <p>3k views</p>
            <p>3 days ago</p>
           </div>
        </div>
     </div>
       </Link>
      </div>
      <div className="videosdiv">
       <Link to="/details">
       <div className="myvideos-holder">
         <video controls src={video}></video>
       </div>
     <div className="content-info">
        <div className="user-logo">
            <img src={user} alt='user'/>
        </div>
         <div className="videodetails">
           <h1>Project Management</h1>
           <p>Channel name</p>
           <div className="viewsdiv">
            <p>3k views</p>
            <p>3 days ago</p>
           </div>
        </div>
     </div>
       </Link>
      </div> */}
    </>
  )
}

export default Videodata
