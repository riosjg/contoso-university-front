import React from 'react';
import{
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"
import logo from '../img/contosoIco.png'
import '../style/style.css'

export default function(props){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/'> <img src={logo} alt="home" height="60px"/> </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
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
                <li className="nav-item">
                    <Link className="nav-link" to='/Enrollment'> Enrollment </Link>
                </li>
                </ul>
            </div>
        </nav>
    )
}