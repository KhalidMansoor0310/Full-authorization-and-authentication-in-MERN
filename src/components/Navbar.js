import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Navbar() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer);
    const links = user ?
        (
            <>
                <li className="nav-item">
                    <span className="nav-link"  onClick={()=>dispatch({type:"LOGOUT"})}>Logout</span>
                </li>

            </>
        )
        :
        (
            <>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
            </>
        )
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand text-center" href="#"><h2>Simple Website</h2></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>
                        {links}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
