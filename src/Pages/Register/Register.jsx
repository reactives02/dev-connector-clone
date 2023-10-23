import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./register.css";
import bcrypt from "bcryptjs-react";
import { useNavigate } from "react-router-dom";
import {userRef} from './../../Firebase/firebase'
import { addDoc ,getDocs,query,where} from "firebase/firestore"; 
import { TailSpin } from 'react-loader-spinner'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(26, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
});

const Register = () => {
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()

  async function SubmitHanlde(values) {
    setLoader(true)
    let Data;
    const q = query(userRef,where("email","==",values.email))
    const result = await getDocs(q)
    result.forEach((doc)=>{
    Data = doc.data()
  })
  if (Data?.email!==values?.email)  {
    const hashedPassword = await bcrypt.hash(values.password, 10);
    values.password=hashedPassword;
    addDoc(userRef,values)

    setLoader(false)
    toast.success('Account Created Successfully...', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
      setTimeout(() => {
        
        navigate('/login')
      }, 1000);
    
      }
    else{
     
        toast.error('Email Already Exists Try with Different One...', {
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
  }
  return (
    <section id="signup" className="signup py-[2rem] px-[8rem]">
      <div className="sign-up-group flex flex-col">
        <h1 className="text-[3rem] mt-[1rem] font-medium">Register</h1>
        <p className="slog text-[#333] mt-[1rem] text-[1.5rem]">
          Create Your Account
        </p>
        <Formik
          initialValues={{
            name: "",
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
              <Field name="name" placeholder="Name" />
              {errors.name && touched.name ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] text-white">{`* Name ${errors.name}`}</div>
              ) : null}
              <Field name="email" type="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <div className=" bg-red-400 rounded-[5px] px-[5px] text-white">{`* ${errors.email}`}</div>
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
                "Register"
              }
              </button>
            </Form>
          )}
        </Formik>
        <p className="slog-2 my-[0.5rem] text-[#333]">
          Already have an account?
          <span>
            <Link className="text-[#ff9f1c] text-[1.2rem]" to={"/login"}>
              Login
            </Link>
          </span>
        </p>
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

export default Register;
