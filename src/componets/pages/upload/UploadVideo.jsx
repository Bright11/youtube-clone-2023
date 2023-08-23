import React, { useState,useContext } from 'react'
import './uploadVideo.css'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../../firebase';
import { Usercontext } from '../../context/Usercontext';
function UploadVideo() {
    const [video,setVideo]= useState(null)
    const[names,setNames]=useState("")
    const[description,setDescription]=useState("")
    const {userinfo}=useContext(Usercontext)
    const[checkerror,setCheckerror]=useState("")

    const uploadvideos= async(e)=>{
        e.preventDefault();
        try {
            if(video,names,description){
                const fileType = video.type;
        
                if (fileType.startsWith('image/')) {
                  console.log('Uploaded file is an image.');
                  // Do something for images
                  alert("Please change the image to video, only videos are allowed")
                } else if (fileType.startsWith('video/')) {
                  console.log('Uploaded file is a video.');
                  //alert("no video")
                //   file upload
                 // upload profile
        
                 const name = new Date().getTime() + video.name;
      const storageRef = ref(storage, video.name);
      const uploadTask = uploadBytesResumable(storageRef, video);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is runing");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadUrl) => {
                    //  save
                    await addDoc(collection(db , "videos"), {
                        likes:Number(0),
                        dislike:Number(0),
                        comment:Number(0),
                        video:downloadUrl,
                        name: names,
                        channel:userinfo.displayName.replace(/\s/g,''),
                        discription:description,
                        photoURL:userinfo.photoURL,
                        userid:userinfo.uid,
                        
                        //photoURL
                        timestamp: serverTimestamp(),
                      }).then(()=>{
                        setNames("");
                        setDescription("")
                        setVideo(null)
                      })
        
                     //  the end
                     });
                   }
                 );
        
        
                 // the end
        
        
        
                //   the end of file upload
                } else {
                  console.log('Uploaded file is neither an image nor a video.');
                  alert('Uploaded file is neither an image nor a video.')
                }
            }else{
                setCheckerror("all forms not file")
            }
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='uploadVideo'>
      <div className="form">
       <h1>{checkerror}</h1>
        <form onSubmit={uploadvideos}>
            <label htmlFor="">Video Name</label>
            <input type="text" value={names} onChange={(e)=>setNames(e.target.value)} placeholder='Video Name' />

            <label htmlFor="">Video Description</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} cols="30" rows="10"></textarea>
           <label htmlFor="">Video</label>
           <input type="file" onChange={(e)=>setVideo(e.target.files[0])} />
           <button>Upload</button>
        </form>
      </div>
    </div>
  )
}

export default UploadVideo
