import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Developers from './Pages/Developers/Developers';
import ViewProfile from './Pages/ViewProfile/ViewProfile';
import Posts from './Pages/Posts/Posts';
import Post from './Pages/Posts/Post';
import Dashboard from './Pages/Dashboard/Dashboard';
import CreateProfile from './Pages/CreateProfile/CreateProfile';
import EditProfile from './Pages/EditProfile/editProfile';
import AddExperience from './Pages/AddExperience/AddExperience';
import AddEducation from './Pages/AddEducation/AddEducation';
import { useState } from 'react';
import Protected from './Components/Navbar/Protected/Protected';
import ProtectRute from './Components/Navbar/Protected/ProtectRoute';



function App() {

  return (
    <div className="App">
    <BrowserRouter>
          <Navbar/>
    <Routes>
      <Route path='/' element={
      <ProtectRute>
      <Home/>
    </ProtectRute>
      } />
      <Route path='/register' element={<ProtectRute>
           <Register/>
         </ProtectRute>} />
      <Route path='/login' element={<ProtectRute>
           <Login/>
         </ProtectRute>} />

      <Route path='/developers' element={<Protected>
           <Developers/>
         </Protected>} />
      <Route path='/view-profile/:id/:id' element={<Protected>
           <ViewProfile/>
         </Protected>} />
      <Route path='/posts' element={<Protected>
           <Posts/>
         </Protected>} />
      <Route path='/post/:id' element={<Protected>
           <Post/>
         </Protected>} />
      <Route path='/dashboard' element={<Protected>
           <Dashboard/>
         </Protected>} />
      <Route path='/create-profile' element={
         <Protected>
           <CreateProfile/>
         </Protected>
      } />
      <Route path='/edit-profile' element={
         <Protected>
           <EditProfile/>
         </Protected>
      } />
      <Route path='/add-experience' element={<Protected>
           <AddExperience/>
         </Protected>} />
      <Route path='/add-education' element={<Protected>
           <AddEducation/>
         </Protected>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
