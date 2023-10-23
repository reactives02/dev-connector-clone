import React, { useEffect, useState } from "react";
import {
  FaUserAlt,
  FaUserCircle,
  FaBlackTie,
  FaGraduationCap,
  FaUserMinus,
} from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  EducationRef,
  ExperienceRef,
  ProfileRef,
  postRef,
  userRef,
} from "../../Firebase/firebase";
import { TailSpin } from "react-loader-spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [rend, setrend] = useState(false);
  const [ToggleProfile, setToggleProfile] = useState(false);
  const [loader, setloader] = useState(false);
  const [name, setName] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  async function fetchData() {
    // fetching username from users
    const result = await getDoc(doc(userRef, localStorage.getItem("userID")));
    setName(result._document?.data?.value?.mapValue?.fields?.name?.stringValue);

    // fetching user experience credentials
    const exp = query(
      ExperienceRef,
      where("user_id", "==", localStorage.getItem("userID"))
    );
    const expResult = await getDocs(exp);
    if (expResult.docs.length > 0) {
      const eResult = expResult.docs.map((doc) => ({
        ...doc.data(),
        expID: doc.id,
      }));
      setExperiences(eResult);
    }

    // fetching user education credentials
    const edu = query(
      EducationRef,
      where("user_id", "==", localStorage.getItem("userID"))
    );
    const eduR = await getDocs(edu);
    if (eduR.docs.length > 0) {
      const eduResult = eduR.docs.map((doc) => ({
        ...doc.data(),
        eduID: doc.id,
      }));
      setEducations(eduResult);
    }
  }

  async function checkProfile() {
    const result = await getDocs(
      query(ProfileRef, where("user_id", "==", localStorage.getItem("userID")))
    );
    if (result?.docs[0]?._document?.data?.value?.mapValue?.fields) {
      setToggleProfile(true)
    } else {
      setToggleProfile(false)
    }
  }

  async function DeleteExp(expID) {
    setloader(true);
    await deleteDoc(doc(ExperienceRef, expID));
    setloader(false);
    setrend(!rend);
  }
  async function DeleteEdu(eduID) {
    setloader(true);
    await deleteDoc(doc(EducationRef, eduID));
    setloader(false);
    setrend(!rend);
  }
  async function DeleteAccount() {
    setloader(true);
    const userID = localStorage.getItem("userID");
    const getProfileData = await getDocs(
      query(ProfileRef, where("user_id", "==", userID))
    );
    const profileID = getProfileData.docs.map((doc) => doc.id);
    const getpostsData = await getDocs(
      query(postRef, where("user_id", "==", userID))
    );
    const getexpData = await getDocs(
      query(ExperienceRef, where("user_id", "==", userID))
    );
    const geteduData = await getDocs(
      query(EducationRef, where("user_id", "==", userID))
    );

    // console.log(getexpData);
    // education
    if (geteduData.docs.length > 0) {
      geteduData.docs.map(
        async (doce) => await deleteDoc(doc(EducationRef, doce.id))
      );
    }
    // experience
    if (getexpData.docs.length > 0) {
      getexpData.docs.map(
        async (doce) => await deleteDoc(doc(ExperienceRef, doce.id))
      );
    }
    // posts
    if (getpostsData.docs.length > 0) {
      getpostsData.docs.map(
        async (doce) => await deleteDoc(doc(postRef, doce.id))
      );
    }
    // profile
    if (profileID.length > 0) {
      await deleteDoc(doc(ProfileRef, profileID[0]));
    }
    // user
    await deleteDoc(doc(userRef, userID));
    // console.log("Account Deleted successfully");
    setloader(false);
    localStorage.removeItem("userID");
    navigate("/");
  }

  useEffect(() => {
    checkProfile();
    fetchData();
  }, [rend]);
  // console.log(experiences,educations);
  return (
    <section className="py-[1rem] px-[8rem]">
      <h1 className="text-[3rem] mt-[1rem] font-medium text-[#ff9f1c]">
        Dashboard
      </h1>
      <div className="flex items-center mt-[0.5rem] gap-1 text-2xl text-[#333] tracking-[1px]">
        <FaUserAlt />
        <h4 className="capitalize">Welcome {name}</h4>
      </div>
      <div className="my-[1rem] flex gap-5">
        {ToggleProfile ? (
          <Link
            to={"/edit-profile"}
            className="bg-[#f4f4f4] py-2 px-5 flex items-center hover:opacity-70"
          >
            <FaUserCircle className="mr-[5px] text-[#ff9f1c] text-xl " />
            Edit Profile
          </Link>
        ) : (
          <Link
            to={"/create-profile"}
            className="bg-[#f4f4f4] py-2 px-5 flex items-center hover:opacity-70"
          >
            <IoAddCircle className="mr-[5px] text-[#ff9f1c] text-2xl " />
            Create Profile
          </Link>
        )}
        <Link
          to={"/add-experience"}
          className="bg-[#f4f4f4] py-2 px-5 flex items-center hover:opacity-70"
        >
          <FaBlackTie className="mr-[5px] text-[#ff9f1c] text-xl" />
          Add Experience
        </Link>
        <Link
          to={"/add-education"}
          className="bg-[#f4f4f4] py-2 px-5 flex items-center hover:opacity-70"
        >
          <FaGraduationCap className="mr-[5px] text-[#ff9f1c] text-2xl" />
          Add Education
        </Link>
      </div>
      {experiences.length > 0 ? (
        <>
          <h2 className="text-[1.5rem] my-[1.5rem] font-medium">
            Experience Credentials
          </h2>
          <table className="">
            <thead className="">
              <tr>
                <th className="py-4 px-6 text-left border-white border-r-4 bg-[#f4f4f4]">
                  Company
                </th>
                <th className="py-4 px-6 text-left border-white border-r-4  bg-[#f4f4f4]">
                  Title
                </th>
                <th className="py-4 px-6 text-left border-white border-r-4  bg-[#f4f4f4]">
                  Years
                </th>
                <th className="py-4 text-left pl-2  bg-[#f4f4f4]"></th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td className="py-5 px-6">{item.company}</td>
                    <td className="py-5 px-6">{item.job_title}</td>
                    <td className="py-5 px-6">
                      {moment(item.from).format("DD-MM-YYYY")} -
                      {moment(item.to).format("DD-MM-YYYY")}
                      {/* 4/12/2002 - 4-12-2022 */}
                    </td>
                    <td className="py-5 px-6">
                      <Link
                        onClick={() => DeleteExp(item.expID)}
                        className="inline-block py-[0.5rem] px-[1rem] text-white hover:opacity-80 bg-[#dc3545] rounded-[5px]"
                      >
                        {loader ? (
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
                        ) : (
                          "Delete"
                        )}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : null}
      {educations.length > 0 ? (
        <>
          <h2 className="text-[1.5rem] my-[1.5rem] font-medium">
            Education Credentials
          </h2>
          <table className="">
            <thead className="">
              <tr>
                <th className="py-4 px-6 text-left border-white border-r-4 bg-[#f4f4f4]">
                  School
                </th>
                <th className="py-4 px-6 text-left border-white border-r-4  bg-[#f4f4f4]">
                  Degree
                </th>
                <th className="py-4 px-6 text-left border-white border-r-4  bg-[#f4f4f4]">
                  Years
                </th>
                <th className="py-4 text-left pl-2  bg-[#f4f4f4]"></th>
              </tr>
            </thead>
            <tbody>
              {educations.length > 0 &&
                educations.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="py-5 px-6">{item.school_boot}</td>
                      <td className="py-5 px-6">{item.deg_cer}</td>
                      <td className="py-5 px-6">
                        {moment(item.from).format("DD-MM-YYYY")} -
                        {moment(item.to).format("DD-MM-YYYY")}
                        {/* 4/12/2002 - 4-12-2022 */}
                      </td>
                      <td className="py-5 px-6">
                        <Link
                          onClick={() => DeleteEdu(item.eduID)}
                          className="py-[0.5rem] px-[1rem] text-white hover:opacity-80 bg-[#dc3545] inline-block rounded-[5px]"
                        >
                          {loader ? (
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
                          ) : (
                            "Delete"
                          )}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : null}
      <div className="mt-[2rem] flex items-center gap-1 hover:opacity-80 rounded-[5px] bg-[#dc3545] w-max py-[0.5rem] px-[1rem]">
        <FaUserMinus className="text-white text-[1rem] font-semibold" />
        <Link onClick={DeleteAccount} className="inline-block  text-white">
          {loader ? (
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
          ) : (
            "Delete My Account"
          )}
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;
