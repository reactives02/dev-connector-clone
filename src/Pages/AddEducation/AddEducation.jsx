import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import {FaGraduationCap} from 'react-icons/fa'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { EducationRef } from '../../Firebase/firebase';
import { addDoc } from "firebase/firestore"; 
import { TailSpin  } from 'react-loader-spinner'
import { v4 as uuidv4 } from "uuid";


const SignupSchema = Yup.object().shape({
  school_boot: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  deg_cer: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  from: Yup.date().required("Required"),
  to: Yup.date().required("Required"),
  field_study:Yup.string(),
  prog_des:Yup.string(),

});

const AddEducation = () => {
  const [loader,setLoader]=useState()
  const navigate = useNavigate()

  async function SubmitHanlde(values) {
    setLoader(true)
    const Edudata = {...values,user_id:localStorage.getItem('userID'),id:uuidv4()}
    // console.log(Edudata);
    addDoc(EducationRef,Edudata)
   setLoader(false)
   navigate('/dashboard')
  }

  return (
    <section className="py-[1rem] px-[8rem]">
      <h1 className="text-[3rem] text-[#ff9f1c]">Add Your Education</h1>
      <div className="flex items-center mt-[0.5rem] gap-1 text-2xl text-[#333] tracking-[1px]">
        <FaGraduationCap />
        <h4> Add any school, bootcamp, etc that you have attended</h4>
      </div>
      <small className="my-[1rem] inline-block">* = required field</small>
      <div>
      <Formik
          initialValues={{
            school_boot: "",
          deg_cer: "",
          from: "",
          to: "",
          field_study:"",
          prog_des:"",
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
        name = "school_boot"
          type="text"
          placeholder="* School or Bootcamp"
          className="mt-[1rem] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
        />
        {errors.school_boot && touched.school_boot ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">{errors.school_boot}</div>
              ) : null}
        <Field
          type="text"
          name ="deg_cer"
          placeholder="* Degree or Certificate"
          className="mt-[1rem] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
          />
       {errors.deg_cer && touched.deg_cer ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">{errors.deg_cer}</div>
              ) : null}
        <Field
          type="text"
          name="field_study"
          placeholder="Field Of Study"
          className="mt-[1rem] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
          />
          {errors.field_study && touched.field_study ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">{errors.field_study}</div>
              ) : null}
        <label className='inline-block mt-[1rem]' htmlFor="">From Date</label>
        <Field
          type="date"
          name="from"
          className=" border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
          />
        {errors.from && touched.from ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">{errors.from}</div>
              ) : null}
        {/* <Field
          type="checkbox"
          
          className="mt-[1rem] accent-[#ff9f1c]"
          /> Current School or Bootcamp
        <br /> */}
        <label className='inline-block mt-[1rem]' htmlFor="">To Date</label>
        <Field
          type="date"
          name="to"
          className=" border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] block text-[1.2rem] w-[100%] p-[0.4rem]"
        />
        {errors.to && touched.to ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">{errors.to}</div>
              ) : null}
        <Field
        as="textarea"
        name="prog_des"
          placeholder="Program Description"
          className="mt-[1rem] h-[8rem] w-[100%] border border-[#000] rounded-[5px] focus:outline-[#ff9f1c] p-[0.4rem]"
          ></Field>
          {errors.prog_des && touched.prog_des ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] mt-[5px] text-white">{errors.prog_des}</div>
              ) : null}
                <button type='submit'  disabled={isSubmitting} className="rounded-[5px] m-[0.41rem] text-[1rem] py-[0.6rem] px-[1.2rem] text-[#fff] bg-[#ff9f1c] hover:opacity-80" >{
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
              }</button>
                <Link className="rounded-[5px] m-[0.41rem] text-[1rem] py-[0.6rem] px-[1.5rem] text-[#333] bg-[#f4f4f4] hover:opacity-80" to={'/dashboard'}>Go Back</Link>
         </Form>
         )}
          </Formik>
        
      </div>
    </section>
  )
}

export default AddEducation