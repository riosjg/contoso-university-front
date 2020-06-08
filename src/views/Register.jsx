import React from 'react';
import '../style/style.css'
import cogoToast from 'cogo-toast'
export default function(){
    return (
    <div className="home d-flex justify-content-center align-items-center">
          <div className="container card w-25">
            <form id="registerForm" className="m-2">
            <div>
                    <p>DNI:</p>
                    <input className="input-group input-group-text m-1" id="DNI" name="DNI"/>
                </div>
                <div>
                    <p>E-Mail:</p>
                    <input className="input-group input-group-text m-1" id="Mail" name="Mail"/>
                </div>
                <div>
                    <p>Password:</p>
                    <input className="input-group input-group-text m-1" id="Password" name="Password"/>
                </div>
                <button id="submit" className="btn btn-success m-1">Create account</button>
            </form>
        </div>
    </div>
    );
}