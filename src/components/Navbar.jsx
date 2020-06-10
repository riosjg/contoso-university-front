import React from 'react';
import{ Link } from "react-router-dom"
import logo from '../img/contosoIco.png'
import '../style/style.css'
import logout from '../img/logout.png'

export default function(props){
    if(localStorage.getItem("Role") === "Admin"){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/'> <img src={logo} alt="home" height="60px"/> </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to='/Department'> Department </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/Instructor'> Instructor </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/Student'> Student </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/Course'> Course </Link>
                        </li>
                    </ul>
                    <span className="float-right">
                        <Link className="btn btn btn-outline-secondary float-right" to='/' onClick={() => props.logOut()}>
                        <span><img src={logout} width="25px"/></span>
                            Logout</Link>
                    </span>
                </div>
            </nav>
        )
    }
    else{
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/'> <img src={logo} alt="home" height="60px"/> </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
              
                    <li className="nav-item active">
                    <Link className="nav-link" to='/Enrollments'> Enrollments </Link>
                    </li>
                </ul>
                <span className="float-right">
                    <Link className="btn btn btn-outline-secondary float-right" to='/' onClick={() => props.logOut()}>
                    <span><img src={logout} width="25px"/></span>
                        Logout</Link>
                </span>
            </div>
        </nav>
        )
    }
}


