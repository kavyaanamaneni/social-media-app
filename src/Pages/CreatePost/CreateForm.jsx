import React from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { addDoc,collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
  const[user]=useAuthState(auth);
  const navigate=useNavigate()
    const schema=yup.object().shape({
        title:yup.string().required("title is required"),
        description:yup.string().required("description must required")
    })
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })
    const postRef=collection(db,"posts");
    const createPost=async (data)=>{
      await addDoc(postRef,{
        // instead of destructuring data obj like this we can use ...data
        // title:data.title,
        // description:data.description,
        ...data,
        userName:user?.displayName,
        userId:user?.uid
      })
        navigate("/");
    }
    
  return (
    <div className='userInput'>
      <form onSubmit={handleSubmit(createPost)}>
        <input type="text" placeholder="...title" {...register("title")}/>
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea rows="5" columns="5" placeholder="...description" {...register("description")}></textarea>
        <p style={{color:"red"}}>{errors.description?.message}</p>
        <input type="submit" className='submit' />
      </form>
    </div>
  )
}

export default CreateForm;

