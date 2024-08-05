import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';


function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }
    console.log('Login Info -->', loginInfo);
    const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password } = loginInfo;

        if (!email || !password) {
            return handleError('Fields Cannot be Empty!');
        }
        try {
            const url = 'http://localhost:8080/login';
            const response = await fetch(url , {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(loginInfo)
            })
            const result = await response.json();
            const {success , message,jwtToken , name, error} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token' , jwtToken);
                localStorage.setItem('loggedInUser' , name);
                setTimeout(()=>{
                    navigate('/home')
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
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email </label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='email'
                        placeholder='Enter Your Email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>password </label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter Your Password...'
                        value={loginInfo.password}
                    />
                </div>
                <button>Login</button>
                <span>Don't Have An Account?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login;
