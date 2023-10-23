import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from 'react-router-dom';
import { CommentRef, postRef, userRef } from '../../Firebase/firebase';
import { addDoc, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"; 
// import { TailSpin  } from 'react-loader-spinner'
import { v4 as uuidv4 } from "uuid";
import moment from "moment";


const Post = () => {


  // Get the current URL using useLocation
  const location = useLocation();
  const postID = location.pathname.split("/")[2];
  const [data,setData]=useState({PostuserID:"",Username:"",postData:""})
  const [userComment,setUserComment]=useState("")
  const [AllComments,setAllComments]=useState("")
  const [rend,setrend]=useState(false)

  let PostuserID;
  let Username;

  async function handleComment() {
    const getuserdata = await getDoc(doc(userRef,localStorage.getItem("userID")))
    const Username = getuserdata._document?.data?.value?.mapValue?.fields.name.stringValue;
    const currentDate = new Date().toISOString().slice(0, 10);
    const User_Comment = {comment:userComment,commentID:uuidv4(),date:currentDate,postID:postID,user_id:localStorage.getItem('userID'),userName:Username}
    // console.log(User_Comment);
    addDoc(CommentRef,User_Comment)

    const getpostDiscuss = await getDoc(doc(postRef,postID))
    const discussions = +getpostDiscuss._document?.data?.value?.mapValue?.fields?.discussion?.integerValue;
    setDoc(doc(postRef, postID), {discussion:discussions+1}, { merge: true });

    setUserComment("")
    setrend(!rend)
  }
async function deleteComment(cID,postID){
  await deleteDoc(doc(CommentRef,cID))
    const getuserdata = await getDoc(doc(postRef,postID))
    const discussions = +getuserdata._document?.data?.value?.mapValue?.fields?.discussion?.integerValue;
    if(discussions>0){

      // console.log(discussions-1);
      setDoc(doc(postRef, postID), {discussion:discussions-1}, { merge: true });
    }
    setrend(!rend)
}
  async function getcomments() {
    // console.log("");
    const q = query(CommentRef,where("postID","==",postID))
    const getComments = await getDocs(q)
    const commentResult = getComments.docs?.map((item,i)=>({...item.data(),commentID:item.id}))
    // console.log(commentResult);
    setAllComments(commentResult)
  }

  async function getData(){
    const getClikedPostData = await getDoc(doc(postRef,postID))
    const postData = getClikedPostData._document?.data?.value?.mapValue?.fields;
    PostuserID = postData?.user_id?.stringValue;
    const getuserdata = await getDoc(doc(userRef,PostuserID))
    Username = getuserdata._document?.data?.value?.mapValue?.fields?.name?.stringValue;
    setData({PostuserID,Username,postData})
    getcomments()
    // setrend(!rend)
  }
  useEffect(()=>{
    getData()
  },[rend])
console.log(AllComments);
  return (
    <section className="py-[1rem] px-[8rem]">
      <Link
        to={"/posts"}
        className="btn-back rounded-[5px] inline-block w-max text-[#333] py-[0.4rem] px-[0.8rem] mt-[1rem] mb-[0.5rem] text-[1rem] bg-[#f4f4f4] hover:bg-[#e28b11] hover:text-[#fff]"
      >
        Back To Posts
      </Link>
      {
        <div className="mt-[0.5rem] mb-[0.5rem] flex items-center h-[200px] gap-[1rem] border border-[#DDDDDD]">
        <div className="h-[200px] w-[200px] mx-[2rem] flex flex-col justify-center items-center">
          <img className=" rounded-[50%]" src="/img/dp.jfif" alt="" />
          <h4 className="text-[#ff9f1c] font-semibold">{data.Username}</h4>
        </div>
        <div className="flex flex-col">
          <p className="text-[#333]">
            {data.postData?.post?.stringValue}
          </p>
          <p className="mt-[1rem]">Posted on {moment(data.postData?.date?.stringValue).format("DD/MM/YYYY")}</p>
         
        </div>
      </div>
      }
      <div className="text-[1.2rem] tracking-tight bg-[#ff9f1c] my-[1rem] py-[0.5rem] px-[0.3rem] text-white">
        Leave A Comment
      </div>
      <textarea
        className="tracking-widest py-2 px-1 border rounded border-[#dddddd] w-[100%] h-[8rem] focus:outline-[#ff9f1c]"
        placeholder="Comment on this post"
        value={userComment}
        onChange={(e)=>setUserComment(e.target.value)}
      ></textarea>
      <Link onClick={handleComment} className="my-[0.5rem] inline-block bg-[#333] py-2 px-5 text-white rounded-[5px] hover:bg-[#4e4e4e]">
        Submit
      </Link>

      {/* <div className="mt-[1.5rem] mb-[1rem] flex items-center h-[200px] gap-[1rem] border border-[#DDDDDD]">
        <div className="h-[200px] w-[200px] mx-[2rem] flex flex-col justify-center items-center">
          <img className=" rounded-[50%]" src="/img/dp.jfif" alt="" />
          <h4 className="text-[#ff9f1c] font-semibold">Dory Elsa</h4>
        </div>
        <div className="flex flex-col">
          <p className="text-[#333]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
            possimus corporis sunt necessitatibus! Minus nesciunt soluta
            suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
            dolor? Illo perferendis eveniet cum cupiditate aliquam?
          </p>
          <p className="mt-[1rem] mb-[0.5rem]">Posted on 04/16/2019</p>
          <div className="flex gap-4">
            
          </div>
        </div>
      </div> */}
      {
        AllComments.length>0 
        &&
        AllComments.map((item,idx)=>{
          return(
            <div key={idx} className="mt-[1.5rem] mb-[1rem] flex items-center h-[200px] gap-[1rem] border border-[#DDDDDD]">
        <div className="h-[200px] w-[200px] mx-[2rem] flex flex-col justify-center items-center">
          <img className=" rounded-[50%]" src="/img/dp.jfif" alt="" />
          <h4 className="text-[#ff9f1c] font-semibold">{item.userName}</h4>
        </div>
        <div className="flex flex-col">
          <p className="text-[#333]">
            {item.comment}
          </p>
          <p className="mt-[1rem] mb-[0.5rem]">Posted on {moment(item.date).format("DD/MM/YYYY")}</p>
          <div className="flex gap-4">
            {
              item.user_id === localStorage.getItem("userID")?
            <div onClick={()=>deleteComment(item.commentID,item.postID)} className="bg-red-500 rounded-md cursor-pointer flex items-center px-5 py-2 hover:bg-opacity-75">
              <RxCross2 className="text-white" />
            </div>:null
            }
          </div>
        </div>
      </div>
          )
        })
      }
    </section>
  );
};

export default Post;
