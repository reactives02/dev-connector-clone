import React, { useEffect, useState } from "react";
import "./viewprofile.css";
import { Link } from "react-router-dom";
import {
  FaGlobe,
  FaTwitter,
  FaFacebookSquare,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaCheck,
} from "react-icons/fa";
import moment from "moment";
// import { FaGithub } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { EducationRef, ExperienceRef, ProfileRef } from "../../Firebase/firebase";

const ViewProfile = () => { 
  const CurrentUrl = useLocation().pathname.split("/")
  const [profiledata , setProfiledata] = useState("")
  const [experiences,setExperiences] = useState([])
  const [educations,setEducations] = useState([])

  const userName = decodeURI(CurrentUrl[2])
  const devProfileID = CurrentUrl[3]
  let currentProfileuserID;
  async function getData() {

   const profile = await getDoc(doc(ProfileRef,devProfileID))
   const profileData = profile._document?.data?.value?.mapValue?.fields
   currentProfileuserID = profileData.user_id.stringValue
  setProfiledata(profileData)

  const exp = query(ExperienceRef,where('user_id',"==",currentProfileuserID))
    const expResult = await getDocs(exp)
    if(expResult.docs.length>0){const eResult = expResult.docs.map((doc)=>({...doc.data()}))
    setExperiences(eResult)}


    const edu = query(EducationRef,where('user_id',"==",currentProfileuserID))
    const eduR = await getDocs(edu)
      if(eduR.docs.length>0){
        const eduResult = eduR.docs.map((doc)=>({...doc.data(),eduID:doc.id}))
        setEducations(eduResult)
      }
 }
useEffect(()=>{
  getData()
},[])

console.log(educations);

  return (
    <section id="view-profile" className="view-profile py-[1rem] px-[8rem]">
      <Link
        to={"/developers"}
        className="btn-back rounded-[5px] inline-block w-max text-[#333] py-[0.4rem] px-[0.8rem] mt-[1.5rem] mb-[1rem] text-[1rem] bg-[#f4f4f4] hover:bg-[#e28b11] hover:text-[#fff]"
      >
        Back To Profiles
      </Link>
      <div className="user-links text-white rounded-[5px] flex justify-center flex-col items-center leading-[3rem] bg-[#ff9f1c]">
      <img
          src="/img/dp.png"
          className="w-[250px] h-[250px] rounded-[50%] mt-[3rem]"
          alt=""
        />
        <h1 className="name mt-[1.5rem] text-[3rem] font-semibold">
          {userName}
        </h1>
        <p className="work mt-[1rem] text-[1.5rem]">Developer at {profiledata?.company?.stringValue}</p>
        <p className="resident mb-[1rem]">{profiledata?.location?.stringValue}</p>
        <div className="links mb-[2rem] cursor-pointer text-[2.5em] flex gap-2 text-white">
          <FaGlobe className="hover:text-[#333]" />
          <FaTwitter className="hover:text-[#333]" />
          <FaFacebookSquare className="hover:text-[#333]" />
          <FaLinkedin className="hover:text-[#333]" />
          <FaYoutube className="hover:text-[#333]" />
          <FaInstagram className="hover:text-[#333]" />
        </div>
      </div>
      <div className="bio my-[1rem] p-[1.5rem] text-center text-[#333] bg-[#f8f5f5] ">
        <h2 className="my-[1rem] text-[#ff9f1c] text-[1.5rem] font-semibold">
          {userName}'s Bio
        </h2>
        <p>
        {profiledata?.bio?.stringValue}
        </p>
        <hr className="my-[1rem] h-[2px] bg-[#f0f0f0]" />
        <h2 className="my-[1rem] text-[#ff9f1c] text-[1.5rem] font-semibold">
          Skill Set
        </h2>
        <div className="skill-set">
          <ul className="flex justify-center items-center gap-[2rem]">
        {profiledata?.skills?.stringValue.split(",").map((skill,idx)=>{
          return(

            <li key={idx} className="flex items-center">
              <FaCheck className="mr-1" />
              {skill}
            </li>
          )
        })}
            
          </ul>
        </div>
      </div>
      <div className="description flex justify-around gap-[1rem] text-[#333]">
        {experiences.length>0 ?<div className="exp w-full px-[1.5rem] pb-[2rem] border border-[#979797]">
          <h2 className="mt-[1.5rem] mb-[1rem] text-[#ff9f1c] text-[1.5rem] font-semibold">
            Experience
          </h2>
          {
            
            experiences.map((item,idx)=>{
              return(
                <>
                <h3 className="my-[0.5rem]">{item.company}</h3>
              <p className="my-[0.5rem]"><strong>From :</strong> {moment(item.from).format("DD/MM/YYYY")} 
              </p>
              <p className="my-[0.5rem]"><strong>to :</strong> {moment(item.to).format("DD/MM/YYYY")} 
              </p>
              <p className="my-[0.5rem]">
                <strong>Position:</strong> {item.job_title}
              </p>
              <p className="my-[0.5rem]">
                <strong>Description:</strong> {item.job_des}
              </p>
              
              <hr />
              
              </>
              )
            })
           
          }
        
        </div>:null}
        {educations.length>0 ?  <div className="edu px-[1.5rem] pb-[2rem] border border-[#979797]">
          <h2 className="mt-[1.5rem] mb-[1rem] text-[#ff9f1c] text-[1.5rem] font-semibold">
            Education
          </h2>
         {
          
          educations.map((item,idx)=>{
            return(
              <>
               <h3 className="my-[0.5rem]">{item.school_boot}</h3>
               <p className="my-[0.5rem]"><strong>From :</strong> {moment(item.from).format("DD/MM/YYYY")} 
              </p>
              <p className="my-[0.5rem]"><strong>to :</strong> {moment(item.to).format("DD/MM/YYYY")} 
              </p>
          <p className="my-[0.5rem]">
            <strong>Degree:</strong> {item.deg_cer}
          </p>
          <p className="my-[0.5rem]">
            <strong>Field Of Study:</strong> {item.field_study}
          </p>
          <p className="my-[0.5rem]">
            <strong>Description:</strong> {item.prog_des}
          </p>
          <hr />
              </>
            )
          })
         }
        </div>:null}
      </div>
      {/* <div className="main">
        <div className="git mt-[1rem]">
          <h2 className="flex items-center font-semibold gap-1 text-[#ff9f1c] text-[1.5rem] py-[1rem]">
            <FaGithub />
            Github Repos
          </h2>
          <div className="repo p-[1rem] mb-[1.5rem] flex justify-between border border-[#bdbdbd]">
            <div>
              <h4>
                <Link href="#" className="text-[#ff9f1c] font-semibold">
                  Repo One
                </Link>
              </h4>
              <p className="text-[#333]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
            </div>
            <ul className="text-center">
              <li className="m-[0.3rem] text-white bg-[#ff9f1c]">Stars: 44</li>
              <li className="m-[0.3rem] text-white bg-[#333]">Watchers: 21</li>
              <li className="m-[0.3rem] text-black bg-[#f4f4f4]">Forks: 25</li>
            </ul>
          </div>
          <div className="repo p-[1rem] mb-[1.5rem] flex justify-between border border-[#bdbdbd]">
            <div>
              <h4>
                <Link href="#" className="text-[#ff9f1c] font-semibold">
                  Repo Two
                </Link>
              </h4>
              <p className="text-[#333]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
            </div>
            <ul className="text-center">
              <li className="m-[0.3rem] text-white bg-[#ff9f1c]">Stars: 44</li>
              <li className="m-[0.3rem] text-white bg-[#333]">Watchers: 21</li>
              <li className="m-[0.3rem] text-black bg-[#f4f4f4]">Forks: 25</li>
            </ul>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default ViewProfile;
