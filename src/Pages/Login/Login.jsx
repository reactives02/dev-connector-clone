import React, { useEffect, useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import bcrypt from "bcryptjs-react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {userRef} from './../../Firebase/firebase'
import { getDocs , where , query } from "firebase/firestore"; 
import { TailSpin } from 'react-loader-spinner'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const SignupSchema = Yup.object().shape({
 
  password: Yup.string()
    .min(8, "Too Short!")
    .max(26, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = () => {
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()
 var _id;
  async function SubmitHanlde(values) {
    setLoader(true)
    let Data;
    const q = query(userRef,where("email","==",values.email))
    const result = await getDocs(q)
    result.forEach((doc)=>{
      _id=doc.id
    Data = doc.data()
  })
    if (values?.email!=Data?.email || await bcrypt.compare(values?.password,Data?.password)==false) {
      toast.error('Account Not Found...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setLoader(false)
    }
    else{
      toast.success('Logging in...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setLoader(false)
        localStorage.setItem('userID',_id)

        navigate('/create-profile')
    }
    }

    
  return (
    <section id="login" className="login py-[2rem] px-[8rem]">
   
   <div className="sign-in-group flex flex-col">
    <h1 className='text-[3rem] mt-[1rem] font-medium'>Login</h1>
    <p className="slog text-[#333] mt-[1rem] text-[1.5rem]">Log into Your Account
    </p>
    <Formik
          initialValues={{
       
            password: "",
            email: "",
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
             
              <Field name="email" type="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] text-white">{`* Email ${errors.email}`}</div>
              ) : null}
              <Field name="password" type="password" placeholder="Password" />
              {errors.password && touched.password ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] text-white">{`* Password ${errors.password}`}</div>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn py-[0.6rem] px-[1.2rem] my-[0.5rem]"
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
                "Login"
              }
              </button>
            </Form>
          )}
        </Formik>
    
    <p className="slog-2 my-[0.5rem] text-[#333]">Don't have an account?<span><Link className='text-[#ff9f1c] text-[1.2rem]' to={'/register'}> Sign Up</Link></span></p>
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
)
}

export default Login