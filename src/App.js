import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componets/pages/navbar/Navbar';
import Home from './componets/pages/home/Home';
import Details from './componets/pages/details/Details';
import Register from './componets/pages/login/Register';
import { Usercontext } from './componets/context/Usercontext';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import UploadVideo from './componets/pages/upload/UploadVideo';

function App() {
  const [checkuser,setCheckuser]=useState(null)
  const[userinfo,setUserinfo]=useState(null)
  const [mobilesidebar,setMobilesidebar]=useState(true)

  onAuthStateChanged(auth, (user) => {
    if (user) {
     
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
     setCheckuser(true)
     setUserinfo(auth?.currentUser)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  return (
    <Usercontext.Provider value={{ checkuser,userinfo }}>
   <Router>
   
   
    <Navbar/>

<Routes>

<Route element={<Home/>} path='/'/>
<Route element={<Details/>} path='details/:watch'/>
<Route element={checkuser?<UploadVideo/>:<Register/>} path='createvideo'/>
<Route element={checkuser?<Home/>:<Register/>} path='register'/>

</Routes>

   </Router>
   </Usercontext.Provider>
  );
}

export default App;
