import React from 'react';
import{
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"

export default function(props){
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/'> Contoso University </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item active">
                    <Link class="nav-link" to='/Department'> Department </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/Instructor'> Instructor </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/Student'> Student </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/Course'> Course </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/Enrollment'> Enrollment </Link>
                </li>
                </ul>
            </div>
        </nav>
    )
}