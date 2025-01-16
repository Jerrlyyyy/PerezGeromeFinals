import React, { useEffect, useState } from 'react';
import './Pagefirst.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Pagefirst = () => {
  const navigate = useNavigate();

  const goToStudentForm = () => {
    navigate('/login');
  };

  const goToAdminForm = () => {
    navigate('/loginAdmin');
  };

  const goToProgramHeadForm = () => {
    navigate('/loginProgramHead');
  };
  
  useEffect(() => {
    axios
      .get('')  // Add your API endpoint here
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='page1-box'>
      <div className='page1-blue-box'>
        <div className='page1-logo'></div>
        <h2 className='page1-seamsh2'>SEAMS</h2>   
        <h4 className='page1-welcomeh4'>
          Welcome to Students Engagement <br/>
          and Activity Management System
        </h4>
        <div className='page1-lionlogo'></div>
      </div>
      <div className='page1-white-box'>
        <div className='page1-lccblogo'></div>
        <h2 className='page1-loginh2'>Let's get started.</h2>
        <h4 className='page1-loginh4'>Please select portal to proceed</h4>

        <div className="page1-button-container">
          <button className="page1-button-1" onClick={goToStudentForm}>Student</button>
          <button className="page1-button-2" onClick={goToAdminForm}>Admin</button> 
          <button className="page1-button-3" onClick={goToProgramHeadForm}>Program Head</button>
        </div>
      </div>
    </div>
  );
};

export default Pagefirst;