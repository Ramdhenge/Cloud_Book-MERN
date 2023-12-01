import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Nav() {

    const navigate = useNavigate()

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <NavLink to='/' className="navbar-brand">CloudBook</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to='/' className="nav-link " >Home</NavLink>
                            <NavLink to='/about' className="nav-link" >About</NavLink>
                            {/* <a className="nav-link" href="/">Pricing</a> */}
                        </div>
                    </div>
                    {!localStorage.getItem('token')?<form form className="log-sign">
                        <NavLink to="/login" className="btns">LogIn</NavLink>
                        <NavLink to="/signup" className="btns">SignUp</NavLink>
                    </form>
                    :
                    <div className="log-sign">
                        <button className='btns' onClick={handleLogout}>Logout</button>
                    </div>
                        }
                </div>
            </nav>
        </div>
    )

}
