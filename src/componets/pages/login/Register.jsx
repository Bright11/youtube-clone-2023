import React, { useState } from 'react'
import './register.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
function Register() {
  const [login, setLogin] = useState(false);

  const [names, setNames] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("");
  const [image, setImage] = useState(null)
  const [checkerror, setCheckerror] = useState("")

 const navigate=useNavigate()
  const creatuser = async (e) => {
    e.preventDefault()
    try {
      if (email, password, names, image) {
        if (password === cpassword) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              // const user = userCredential.user;
              // ...
              // upload profile

             // const storageRef = ref(storage, `profile/${image}`);

              const name = new Date().getTime() + image.name;
              const storageRef = ref(storage, `profile/${image.name}`);
             // const storageRef = ref(storage, video.name);
              const uploadTask = uploadBytesResumable(storageRef, image);
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
                   // console.log('File available at', downloadURL);
                    //name.replace(/\s/g,'')
                  //  user profile
                  await updateProfile(auth.currentUser, {
                    displayName:names,
                     photoURL: downloadUrl
                  }).then(async() => {
                    // await addDoc(collection(db, "channels"), {
                      await setDoc(doc(db, "channels", auth?.currentUser.uid), {
                      userid:auth?.currentUser.uid,
                      name:names.replace(/\s/g,''),
                      subscriber: Number(0),
                      videos:Number(0),
                    }).then(()=>{
                      setEmail("");
                      setNames("");
                      setPassword("");
                      setCpassword("");
                      setImage(null)
                      window.location.reload(true)
                      setLogin(false)
                    })
                   
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });

                  //  the end
                  });
                }
              );


              // the end
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
        } else {
          setCheckerror("password did not martch")
        }

      } else {
        setCheckerror("all forms must be filed")
      }
    } catch (error) {
      console.error(error)
    }
  }
  const loginuser = (e) => {
    e.preventDefault();
   try {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
     // const user = userCredential.user;
      // ...
      window.location.reload(true)
      //navigate("/")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
   } catch (error) {
    console.error(error)
   }
  }

  return (
    <section className="registersection">
      <div className='register'>
        <h1>{checkerror}</h1>
       
        {login ? (
          <form onSubmit={creatuser} className="registerform">
            <label >User Name</label>
            <input type="text" placeholder='User name' onChange={(e) => setNames(e.target.value)} />
            <label >User Email</label>
            <input type="email" placeholder='User Email' onChange={(e) => setEmail(e.target.value)} />
            <label >User Password</label>
            <input type="password" placeholder='User Password' onChange={(e) => setPassword(e.target.value)} />
            <label >Confirm password</label>
            <input type="password" placeholder='Confirm password' onChange={(e) => setCpassword(e.target.value)} />
            <label htmlFor="image">Click to chose image</label>
            <input type="file" id='image' onChange={(e) => setImage(e.target.files[0])} />
            <button>Register</button>
            <button type='button' onClick={() => setLogin(false)}>Already have an account? login</button>
          </form>
        ) : (
          <form onSubmit={loginuser} className="registerform">
            <label htmlFor="">User Email</label>
            <input type="text" placeholder='User Email' onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="">User Password</label>
            <input type="password" placeholder='User Password' onChange={(e) => setPassword(e.target.value)} />
            <button>Login</button>
            <button onClick={() => setLogin(true)} type='button'>Don't have an account? Register</button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Register
