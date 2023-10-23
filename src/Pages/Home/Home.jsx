import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <section id="hero" className="hero w-auto text-center flex flex-col justify-center">
            <h1 className='text-[3rem] font-semibold text-white'>Developer Connector</h1>
            <p className='text-[1.5rem] font-medium text-white'>Create a developer profile/portfolio, share posts and get help from other developers
            </p>
            <div class="buttons mt-[1.5rem]">
                <Link to={'/register'}>Register</Link>
                <Link to={'/login'}>Login</Link>
            </div>
        </section>
  )
}

export default Home