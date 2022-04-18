import React ,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {toast,Toaster} from 'react-hot-toast'

import axios from 'axios';
function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loginErrors,user} = useSelector(state => state.authReducer);
    console.log(user)

    useEffect(() => {
        if(loginErrors.length > 0){
            toast.error(loginErrors[0].msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
      
    }, [loginErrors,user])

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_LOADER' });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = { email, password };
            const { data } = await axios.post('http://localhost:5000/api/user/login', body, config);
            
            dispatch({ type: 'CLOSE_LOADER' });
            localStorage.setItem('token', data.token);
            dispatch({ type: 'SET_TOKEN', payload: data.token });
        } catch (error) {
            dispatch({ type: 'CLOSE_LOADER' });
            dispatch({ type: 'LOGIN_ERRORS', payload: error.response.data.errors });
        }
    }

  return (
    <div className="container my-5">
    <div className="row">
        <div className="col-md-6">
            <h1>Wellcome to Our <br />Mern stack Site</h1>
            <Toaster/>
        </div>
        <div className="col-md-6">
            <h1>Login</h1>
            <form action="" className='shadow p-5' onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="email"
                     className="form-control" 
                     placeholder="Enter your email" 
                     onChange={(e)=>setEmail(e.target.value)}
                     />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" 
                    className="form-control" 
                    placeholder="Enter your password" 
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group my-3">
                    <button className="btn btn-success">Login</button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default Login
