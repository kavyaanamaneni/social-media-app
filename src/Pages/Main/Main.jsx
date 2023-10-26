import React, { useEffect, useState } from 'react'
import { getDocs,collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Post from './Post';

const Main = () => {
   const[postList,setPostList]=useState(null); 
   const postRef=collection(db,"posts");
   const getPosts=async ()=>{
    const data=await getDocs(postRef);
    setPostList(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
   }
   useEffect(()=>{
    getPosts()
   },[])
  
  return (
    <div>
      
      <div>
        <h1>{postList?.map((post)=>{
          return <Post key={post.id} post={post}/>
        })}</h1>
      </div>

    </div>
  )
}

export default Main;
