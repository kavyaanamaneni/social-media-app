import React, { useEffect, useState } from 'react'
import { collection,addDoc, query, where, getDocs ,deleteDoc, doc} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const Post = (props) => {
    const[likes,setLikes]=useState(null)
    const[user]=useAuthState(auth);
    const{post}=props;
    const likesRef=collection(db,"likes");
    const likesDoc=query(likesRef,where("postId","==",post.id))
    const addLikes=async (data)=>{
        try{
            const newDoc=await addDoc(likesRef,{userId:user?.uid,postId:post.id})
            if(user){
              setLikes((prev)=>
                  prev?[...prev,{userId:user?.uid,likeId:newDoc.id}]:[{userId:user?.uid,likeId:newDoc.id}]
                      )
            }
        }
      catch(err){
        console.log(err);
      }
      
      
    }
    const removeLikes=async (data)=>{
       
        try{
            const likeToDeleteQuery=query(likesRef,where("postId","==",post.id),
            where("userId","==",user?.uid));
            const likeToDeleteData=await getDocs(likeToDeleteQuery)
            const likeId=likeToDeleteData.docs[0].id
            const likeToDelete=doc(db,"likes",likeId);
            await deleteDoc(likeToDelete)
            if(user){
              setLikes((prev)=>prev?.filter((like)=>like.id !==likeId) )
            }
        }
      catch(err){
        console.log(err);
      }
      
      
    }
    const getLikes=async()=>{
        const data=await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})))
    }
    useEffect(()=>{
        getLikes()
    },[]);

    const hasUserLiked=likes?.find((like)=>like.userId===user.uid)
  return (
    <div>
      <div className='title'>
        <h1>{post.title}</h1>
    </div>
    <div className='body'>
        <p>{post.description}</p>
    </div>
    <div>
        <p>@{post.userName}</p>
        <button onClick={hasUserLiked?removeLikes:addLikes}>{hasUserLiked?<>&#128078;</>:<>&#128077;</>}</button>
        {likes&&<p>likes:{likes?.length}</p>}
    </div>
    </div>
  )
}

export default Post;
