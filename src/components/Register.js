import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
function Register() {
    const history = useHistory();
    const dispatch  = useDispatch();
    const [name, setName] = useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {loading,registerErrors,user} = useSelector(state=>state.authReducer);
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        dispatch({type:'SET_LOADER'});
        try {
            const {data} =await axios.post('http://localhost:5000/api/user/register',{
                name,
                email,
                password
            },config);
            dispatch({type:'CLOSE_LOADER'});
            localStorage.setItem('token',data.token);
            dispatch({type:'SET_TOKEN',payload:data.token});
        } catch (error) {
            dispatch({type:'CLOSE_LOADER'});
            dispatch({type:'REGISTER_ERRORS',payload:error.msg});
        }

    }
   
    return (
        <div className="container my-5 ">
            <div className="row">
                <div className="col-md-6 ">
                    <h1>Wellcome to Our <br />Mern stack Site</h1>
                    <Toaster/>
                </div>
                <div className="col-md-6">
                    {loading?<h1 className='alert alert-info'>Loading...</h1>:'Registered Successfully'}
                    <h1>Register</h1>
                    <form action="" onSubmit={handleSubmit} className='shadow p-5 my-5'>
                        <div className="form-group">
                            <label htmlFor="">Name</label>
                            <input type="text" onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Enter your name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Enter your password" />
                        </div>
                        <div className="form-group my-3">
                            <button className="btn btn-success">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
