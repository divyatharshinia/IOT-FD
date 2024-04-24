import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'; 

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [registrationStatus, setRegistrationStatus] = useState('');
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response= await axios.post('http://localhost:5000/register ', formData);
            // const response={
            //     "status":200,
            // }
            if(response.status===200){
                alert('User registered successfully.');
                navigate('/login');
            }
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container'>
        <form className="login-form" onSubmit={handleSubmit}>
            
                <h2 className='login-text'> Register </h2><br></br>
                {/* <label htmlFor="email" id="mal">Email:</label> */}
                <input
                className='login-input'
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            <br></br>
            
                {/* <label htmlFor="name" id="uname">Name:</label> */}
                <input
                className='login-input'
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            <br></br>
        
                {/* <label htmlFor="password" id="pass">Password:</label> */}
                <input
                className='login-input'
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            <br></br>

            <label for="role">Role:</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select><br /><br></br>

          <button className='login-button'> <Link to='/login' id="link"/>Register</button>
          {registrationStatus && <div className="registrationStatus">{registrationStatus}</div>} 
        </form>
        </div>
    );
};

export default RegisterForm;
