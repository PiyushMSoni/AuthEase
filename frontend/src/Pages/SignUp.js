import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';


function SignUp() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError('Fields Cannot be Empty!');
        }
        try {
            const url = "http://localhost:8080/signup";
            const response = await fetch(url , {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(signupInfo)
            }); 
            const result = await response.json();
            const {success , message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                }, 1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);

        } catch (error) {
            handleError(error);
        }
    }
    return (
        <div className='container'>
            <h1>SignUp</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name </label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter Your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email </label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='email'
                        placeholder='Enter Your Email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>password </label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter Your Password...'
                        value={signupInfo.password}
                    />
                </div>
                <button>SignUp</button>
                <span>Already Have An Account?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default SignUp
