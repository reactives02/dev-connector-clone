import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ProfileRef } from "./../../Firebase/firebase";
import { addDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const [loader, setLoader] = useState(false);
  const [profiledata, setprofiledata] = useState("");
  const navigate = useNavigate();
    async function getUserProfileData() {
        const result = await getDocs(query(ProfileRef,where("user_id","==",localStorage.getItem('userID'))))
        const profileData = result.docs.map((item,i)=>({...item.data(),profileID:item.id}))
        setprofiledata(profileData[0]);
    }
    function updateProfile() {
        setLoader(true)
        setDoc(doc(ProfileRef,profiledata.profileID),profiledata,{merge:true})
        setLoader(false)
        navigate('/dashboard')
    }
  useEffect(()=>{
    getUserProfileData()
  },[])
console.log(profiledata);
  return (
    <> 
      <div className="profile py-[1rem] px-[8rem]">
        <h1 className="text-[3rem] text-[#ff9f1c]">Edit your Profile</h1>
        <div className="flex items-center mt-[0.5rem] gap-1 text-2xl text-[#333] tracking-[1px]">
          <FaUserAlt />
          <h4> Let's get some information to make your profile stand out</h4>
        </div>
        <small className="my-[1rem] inline-block">* = required field</small>
        <div>
          
              <form onSubmit={(e)=>{e.preventDefault()}}>
                <select
                  className="w-[100%] block text-[1.2rem] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] p-[0.4rem]"
                  name="role"
                  value={profiledata.job}
                  onChange={(e)=>setprofiledata({...profiledata,job:e.target.value})}
                  required
                >
                  <option value="">* Select Profesional Status</option>
                  <option value="Developer">Developer</option>
                  <option value="Junior Develope">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Student or Learning">
                    Student or Learning
                  </option>
                  <option value="Instructor or Teacher">
                    Instructor or Teacher
                  </option>
                  <option value="ٰIntern">ٰIntern</option>
                  <option value="Other">Other</option>
                </select>
                
                <small className="text-[#333] block mb-[1rem] ">
                  Give us an idea of where you are at in your career
                </small>
                <input
                required
                value={profiledata.company}
                  onChange={(e)=>setprofiledata({...profiledata,company:e.target.value})}
                  name="company"
                  type="text"
                  placeholder="* Company"
                  className="border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
                />
                
                <small className="text-[#333] block mb-[1rem]">
                  Could be your own company or one you work for
                </small>
                <input
                value={profiledata.website}
                onChange={(e)=>setprofiledata({...profiledata,website:e.target.value})}
                  name="website"
                  type="text"
                  placeholder="Website"
                  className="border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
                />
                
                <small className="text-[#333] block mb-[1rem]">
                  Could be your own or a company website
                </small>
                <input
                value={profiledata.location}
                onChange={(e)=>setprofiledata({...profiledata,location:e.target.value})}
                  name="location"
                  type="text"
                  placeholder="Location"
                  className="border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
                />
                <small className="text-[#333] block mb-[1rem]">
                  City & state suggested (eg. Boston, MA)
                </small>
                <input
                required
                value={profiledata.skills}
                  onChange={(e)=>setprofiledata({...profiledata,skills:e.target.value})}
                  name="skills"
                  type="text"
                  placeholder="* Skills"
                  className="border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
                />
                
                <small className="text-[#333] block mb-[1rem]">
                  Please use comma separated values (eg.
                  HTML,CSS,JavaScript,PHP)
                </small>
                <input
                value={profiledata.git_username}
                onChange={(e)=>setprofiledata({...profiledata,git_username:e.target.value})}
                  name="gitname"
                  type="text"
                  placeholder="Github Username"
                  className="border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
                />
                <small className="text-[#333] block mb-[1rem]">
                  If you want your latest repos and a Github link, include your
                  username
                </small>
                <textarea
                value={profiledata.bio}
                onChange={(e)=>setprofiledata({...profiledata,bio:e.target.value})}
                  name="bio"
                  placeholder="A short bio of yourself"
                  className="h-[4rem] w-[100%] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] p-[0.4rem]"
                ></textarea>
                <small className="text-[#333] block mb-[1rem]">
                  Tell us a little about yourself
                </small>
                <button
                  onClick={updateProfile}
                  className="rounded-[5px] m-[0.41rem] text-[1rem] py-[0.6rem] px-[1.2rem] text-[#fff] bg-[#ff9f1c] hover:opacity-80"
                >
                  {loader ? 
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
                    "Update Profile"
                  }
                </button>
                <Link
                  className="rounded-[5px] m-[0.41rem] text-[1rem] py-[0.6rem] px-[1.5rem] text-[#333] bg-[#f4f4f4] hover:opacity-80"
                  to={"/dashboard"}
                >
                  Go Back
                </Link>
              </form>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};

export default EditProfile;
