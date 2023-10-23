import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FaCode } from "react-icons/fa";
import { useNavigate , Navigate} from "react-router-dom";

const Navbar = ({}) => {
  const navigate = useNavigate()
  const [logout,setLogout]=useState(false)
  function LogOut() {
    localStorage.removeItem('userID')
    setLogout(!logout)
  }
 useEffect(()=>{
  if (!localStorage.getItem('userID')) {
    
    navigate('/')
  }
 },[logout])
  
  return (
    <section
      id="heading"
      className="heading sticky top-0 w-auto h-[70px] bg-[#343a40]"
    >
      <div className=" flex items-center justify-between px-[2.9rem] w-auto h-[100%]">
       
     <div>
     <Link to={"/"}>
      <div className="Brand flex gap-1 justify-center items-center">
        <FaCode className="text-3xl " />
        <h1 className="brand text-2xl font-bold">DevConnector</h1>
      </div>
    </Link>
     </div>
       
        <nav>
          <ul className="flex items-center justify-center">
            {localStorage.getItem("userID") ? (
              <>
            <li>
              <Link to={"/developers"}>Developers</Link>
            </li>
                <li>
                  <Link to={"/posts"}>Posts</Link>
                </li>
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li>
                  <Link
                    onClick={() => {LogOut()}}
                    >
                    Logout
                  </Link>
                </li>
              </>
                    
            ) : (
              <>
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
