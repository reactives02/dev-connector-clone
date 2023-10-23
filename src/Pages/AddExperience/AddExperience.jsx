import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCodeBranch } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {ExperienceRef} from './../../Firebase/firebase'
import { addDoc } from "firebase/firestore"; 
import { TailSpin  } from 'react-loader-spinner'
import {v4 as uuidv4} from 'uuid'

const SignupSchema = Yup.object().shape({
  job_title: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  company: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  from: Yup.date().required("Required"),
  to: Yup.date().required("Required"),
  location: Yup.string(),
  job_des: Yup.string(),
});

const AddExperience = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  async function SubmitHanlde(values) {
   setLoader(true)
    const Expdata = {...values,user_id:localStorage.getItem('userID'),id:uuidv4()}
    addDoc(ExperienceRef,Expdata)
   setLoader(false)
   navigate('/dashboard')
  }

  return (
    <section className="py-[1rem] px-[8rem]">
      <h1 className="text-[3rem] text-[#ff9f1c]">Add An Experience</h1>
      <div className="flex items-center mt-[0.5rem] gap-1 text-2xl text-[#333] tracking-[1px]">
        <FaCodeBranch />
        <h4>
        
          Add any developer/programming positions that you have had in the past
        </h4>
      </div>
      <small className="my-[1rem] inline-block">* = required field</small>
      <div>
        <Formik
          initialValues={{
            job_title: "",
            company: "",
            from: "",
            to: "",
            location: "",
            job_des: "",
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
                type="text"
                name="job_title"
                placeholder="* Job Title"
                className="mt-[0.1rem] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
              />
              {errors.job_title && touched.job_title ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">
                  {errors.job_title}
                </div>
              ) : null}

              <Field
                type="text"
                name="company"
                placeholder="* Company"
                className="mt-[1rem] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
              />
              {errors.company && touched.company ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">
                  {errors.company}
                </div>
              ) : null}

              <Field
                type="text"
                name="location"
                placeholder="Location"
                className="mt-[1rem] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
              />
              <label className="mt-[1rem] inline-block" htmlFor="">
                From Date
              </label>
              <Field
                type="date"
                name="from"
                className=" border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
              />
              {errors.from && touched.from ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">
                  {errors.from}
                </div>
              ) : null}

              {/* <input
          type="checkbox"
          name=""
          className="mt-[1rem] accent-[#ff9f1c]"
          onClick={handleCheck}
          /> Current Job
        <br /> */}
              <label className="mt-[1rem] inline-block" htmlFor="">
                To Date
              </label>
              <Field
                type="date"
                name="to"
                className=" border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
              />
              {errors.to && touched.to ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">
                  {errors.to}
                </div>
              ) : null}
              <Field
                as="textarea"
                name="job_des"
                placeholder="Job Description"
                className="mt-[1rem] h-[8rem] w-[100%] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] p-[0.4rem]"
              ></Field>

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
    </section>
  );
};

export default AddExperience;
