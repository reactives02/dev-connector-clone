import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ProfileRef } from "./../../Firebase/firebase";
import { addDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupSchema = Yup.object().shape({
  role: Yup.string().required("Status Required"),
  website: Yup.string().url(),
  location: Yup.string(),
  bio: Yup.string(),
  gitname: Yup.string(),
  company: Yup.string()
    .min(4, "Too Short!")
    .max(30, "Too Long!")
    .required("Company Required"),
  skills: Yup.string()
    .min(3, "Too Short!")
    .max(200, "Too Long!")
    .required("Skills Required"),
});

const CreateProfile = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  let p_id
  async function SubmitHanlde(values) {
    setLoader(true)

    const profileData = {
      user_id: localStorage.getItem("userID"),
      job: values.role,
      company: values.company,
      bio: values.bio,
      location: values.location,
      website: values.website,
      skills: values.skills,
      git_username: values.gitname,
    };
    // console.log(values, profileData);

   const q = query(ProfileRef,where("user_id","==",profileData.user_id))
    const result = await getDocs(q)
    result.forEach((doc)=>{
    p_id=doc.id
  })
  if (p_id) {
    setDoc(doc(ProfileRef, p_id), profileData, { merge: true });
  }else{
    addDoc(ProfileRef,profileData)
  }
    setLoader(false)
    navigate('/dashboard')
  }

  return (
    <section className="py-[1rem] px-[8rem]">
    <h1 className="text-[3rem] text-[#ff9f1c]">Create your Profile</h1>
    <div className="flex items-center mt-[0.5rem] gap-1 text-2xl text-[#333] tracking-[1px]">
      <FaUserAlt />
      <h4> Let's get some information to make your profile stand out</h4>
    </div>
    <small className="my-[1rem] inline-block">* = required field</small>
    <div>
      <Formik
        initialValues={{
          role: "",
          company: "",
          skills: "",
          location: "",
          bio: "",
          website: "",
          gitname: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={SubmitHanlde}
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
          <Form onSubmit={handleSubmit}>
            <Field
              as="select"
              className="w-[100%] block text-[1.2rem] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] p-[0.4rem]"
              name="role"
              id=""
            >
              <option value="">* Select Profesional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Develope">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor or Teacher">
                Instructor or Teacher
              </option>
              <option value="ٰIntern">ٰIntern</option>
              <option value="Other">Other</option>
            </Field>
            {errors.role && touched.role ? (
              <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">
                {errors.role}
              </div>
            ) : null}
            <small className="text-[#333] block mb-[1rem] ">
              Give us an idea of where you are at in your career
            </small>
            <Field
              name="company"
              type="text"
              placeholder="* Company"
              className="border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
            />
            {errors.company && touched.company ? (
              <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">
                {errors.company}
              </div>
            ) : null}
            <small className="text-[#333] block mb-[1rem]">
              Could be your own company or one you work for
            </small>
            <Field
              name="website"
              type="text"
              placeholder="Website"
              className="border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
            />
            {errors.website && touched.website ? (
              <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">
                {errors.website}
              </div>
            ) : null}
            <small className="text-[#333] block mb-[1rem]">
              Could be your own or a company website
            </small>
            <Field
              name="location"
              type="text"
              placeholder="Location"
              className="border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
            />
            <small className="text-[#333] block mb-[1rem]">
              City & state suggested (eg. Boston, MA)
            </small>
            <Field
              name="skills"
              type="text"
              placeholder="* Skills"
              className="border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
            />
            {errors.skills && touched.skills ? (
              <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">
                {errors.skills}
              </div>
            ) : null}
            <small className="text-[#333] block mb-[1rem]">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
            <Field
              name="gitname"
              type="text"
              placeholder="Github Username"
              className="border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
            />
            <small className="text-[#333] block mb-[1rem]">
              If you want your latest repos and a Github link, include your
              username
            </small>
            <Field
              as="textarea"
              name="bio"
              placeholder="A short bio of yourself"
              className="h-[4rem] w-[100%] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] p-[0.4rem]"
            ></Field>
            <small className="text-[#333] block mb-[1rem]">
              Tell us a little about yourself
            </small>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-[5px] m-[0.41rem] text-[1rem] py-[0.6rem] px-[1.2rem] text-[#fff] bg-[#ff9f1c] hover:opacity-80"
           
            >{
              loader?
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
              "Submit"
            }
            </button>
            <Link
              className="rounded-[5px] m-[0.41rem] text-[1rem] py-[0.6rem] px-[1.5rem] text-[#333] bg-[#f4f4f4] hover:opacity-80"
              to={"/dashboard"}
            >
              Go Back
            </Link>
          </Form>
        )}
      </Formik>
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
  </section>
  );
};

export default CreateProfile;
