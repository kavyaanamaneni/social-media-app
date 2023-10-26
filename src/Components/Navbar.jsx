import React from 'react'
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
const Navbar = () => {
    const [user]=useAuthState(auth);
    const userSignOut=async ()=>{
      await signOut(auth);
    }
  return (
    <div className='navbar'>
    <div className="link">
      <Link to="/" className='link'>home</Link>
      {!user?(<Link to="/login" className='link'>login</Link>)
      :(<Link to="/createPost" className='link'>createPost</Link>)}
      
      
    </div>
    <div className='userData'>
      {
       user&&(<>
         <p>{user?.displayName}</p>
        <button onClick={userSignOut}>sign-out</button>
        </>)
        
      }
       
    </div>
    </div>
  )
}

export default Navbar;
