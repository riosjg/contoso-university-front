import React from 'react';
import '../style/style.css'
import logo from '../img/logo_small.png'
export default function(){
    return (
    <div className="home d-flex justify-content-center align-items-center">
        <img src={logo} alt="CU logo"/>
    </div>
    );
}