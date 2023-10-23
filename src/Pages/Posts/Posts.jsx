import React, { useEffect, useState } from "react";
import "./posts.css";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { postRef, userRef } from '../../Firebase/firebase';
import { addDoc, deleteDoc, doc, getDoc, getDocs, setDoc, } from "firebase/firestore"; 
import { ThreeDots , TailSpin  } from 'react-loader-spinner'
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const SignupSchema = Yup.object().shape({
  post: Yup.string().min(8, "Too Short!").max(3000, "Too Long!"),
});

const Posts = () => {
  const [rend,setrend]=useState(false)
  const [loader,setLoader]=useState(false)
  const [loading,setLoading]=useState(false)
  // const [disableLike,setdisableLike]=useState(false)
  // const [disableDisLike,setdisableDisLike]=useState(false)
  const [post,setPost]=useState([])

  async function handleLike(pID) {
    const getClikedPostData = await getDoc(doc(postRef,pID))

    
   const likes = +(getClikedPostData._document.data.value.mapValue.fields.likes.integerValue) + 1
    // console.log(likes);
    // setdisableLike(true)
    setDoc(doc(postRef, pID), {likes:likes}, { merge: true });
    setrend(!rend)
  }
  async function handleDisLike(pID) {
    const getClikedPostData = await getDoc(doc(postRef,pID))

    
   const dislikes = +(getClikedPostData._document.data.value.mapValue.fields.dislikes.integerValue) + 1
    // console.log(likes);
    // setdisableDisLike(true)
    setDoc(doc(postRef, pID), {dislikes:dislikes}, { merge: true });
    setrend(!rend)
  }
  
  async function DeletePost(pID) {
    // console.log('Delete clicked');
    await deleteDoc(doc(postRef,pID))
    setrend(!rend)
  }


async function FetchPosts() {
  setLoading(true)
  const postsData = await getDocs(postRef)
  const posts = postsData.docs.map((doc) => ({
    ...doc.data(),pID:doc.id
  }));

  let Data = [];
 if(posts.length>0){posts.map(async(record,i)=>{
  // console.log(record);
    const q=doc(userRef,record.user_id)
    const data = await getDoc(q)
    Data.push({...data.data(),...record});
    if (i === posts.length - 1) setPost(Data);
  })}
  // console.log(res);
  setLoading(false)
}


  function handleSubmit(values) {

    setLoader(true)
    
    const currentDate = new Date().toISOString().slice(0, 10);
    const Postdata = {...values,likes:0,dislikes:0,discussion:0,user_id:localStorage.getItem('userID'),id:uuidv4(),date:currentDate}
    console.log(Postdata);
    addDoc(postRef,Postdata)
    values.post=""
    setLoader(false)
    setrend(!rend)
  }
  useEffect(()=>{
FetchPosts();
},[rend])

console.log(post);
  return (
    <section className="py-[2rem] px-[8rem]">
      <h1 className="text-[3rem] mt-[1rem] font-medium text-[#ff9f1c]">
        Posts
      </h1>
      <div className="flex items-center gap-1 text-2xl text-[#333] tracking-[1px]">
        <FaUserAlt />
        <h4>Welcome to the community!</h4>
      </div>
      <div className="text-[1.2rem] tracking-tight bg-[#ff9f1c] my-[1.5rem] py-[0.5rem] px-[0.3rem] text-white">
        Say Something...
      </div>
      <Formik
        initialValues={{
          post: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form>
            <Field
              as="textarea"
              name="post"
              className="tracking-widest py-2 px-1 border rounded border-[#dddddd] w-[100%] h-[8rem] focus:outline-[#ff9f1c]"
              placeholder="Create a post"
            ></Field>
            {errors.post && touched.post ? (
              <div className=" bg-red-400 rounded-[5px] px-[5px] text-white">
                {errors.post}
              </div>
            ) : null}
            <button
              type="submit"
              className="my-[0.5rem] inline-block bg-[#333] py-2 px-5 text-white rounded-[5px] hover:bg-[#4e4e4e]"
            >{loader?
              <TailSpin
            height="25"
            // width="20"
            color="#fff"
            ariaLabel="tail-spin-loading"
            radius="2"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          :
              "Submit"}
            </button>
          </Form>
        )}
      </Formik>

      {
         loading?
         <div className="flex justify-center items-center h-16">
           <ThreeDots
               height="100"
               // width="20"
               color="#ff9f1c"
               ariaLabel="tail-spin-loading"
               radius="2"
               wrapperStyle={{}}
               wrapperClass=""
               visible={true}
             />
         </div>:
        post.map((item,i)=>{
          return(
        <div key={i} className="mt-[1.5rem] mb-[1rem] flex items-center h-[200px] gap-[1rem] border border-[#DDDDDD]">
        <div className="h-[200px] w-[200px] mx-[2rem] flex flex-col justify-center items-center">
          <img className=" rounded-[50%]" src="/img/dp.jfif" alt="" />
          <h4 className="text-[#ff9f1c] font-semibold">{item.name}</h4>
        </div>
        <div className="flex flex-col">
          <p className="text-[#333]">
            {item.post}
          </p>
          <p className="mt-[1rem] mb-[0.5rem]">Posted on {moment(item.date).format("DD/MM/YYYY")}</p>
          <div className="flex gap-4">
            <button  onClick={()=>handleLike(item.pID)} className="bg-[#f4f4f4] rounded-md cursor-pointer flex items-center px-5 py-2 text-[#333] gap-1 hover:opacity-75  ">
              <AiFillLike />
             {
              item.likes>0?
              <small>{item.likes}</small>:null
             }
            </button>
            <button onClick={()=>handleDisLike(item.pID)} className="bg-[#f4f4f4] rounded-md cursor-pointer flex items-center px-5 py-2 text-[#333] hover:opacity-75">
              <AiFillDislike />
              {
              item.dislikes>0?
              <small>{item.dislikes}</small>:null
             }
            </button>
            <div className="bg-[#ff9f1c] cursor-pointer flex items-center px-5 py-2 rounded-md hover:bg-opacity-75 text-[#fff]">
              <Link to={`/post/${item.pID}`}>
                Discussion
                {
                 
                  item.discussion>0?
                  
                <span className="bg-white rounded px-1 text-black">
                  <small>{item.discussion}</small>
                </span>:null }
              </Link>
            </div>
            <button onClick={()=>DeletePost(item.pID)} className="bg-red-500 rounded-md cursor-pointer flex items-center px-5 py-2 hover:bg-opacity-75">
              <RxCross2 className="text-white" />
            </button>
          </div>
        </div>
      </div> 
        )})
        }
    </section>
  );
};

export default Posts;
