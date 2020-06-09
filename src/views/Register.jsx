import React from 'react';
import '../style/style.css'
import cogoToast from 'cogo-toast'
export default function(){
    const submitUser = async (e) => {
        e.preventDefault();
        let formElem = document.getElementById("registerForm");
        let formData = new FormData(formElem);              
        let object = {};
        formData.forEach((value, key) => {
              object[key] = value;
        });
        let json = JSON.stringify(object);
        let res = await fetch('https://localhost:44340/api/createUser', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: json
        })
        if(res.ok){
            cogoToast.success("Account created succesfully", {position: 'bottom-right'})
            window.history.back();
        }else{
            cogoToast.error("You're not allowed to create an account. Please comunicate with the administrator of the web. ")
            window.history.back();
        }
    }
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
                    <input type="password" className="input-group input-group-text m-1" id="Password" name="Password"/>
                </div>
                <button id="submit" className="btn btn-success m-1" onClick={submitUser}>Create account</button>
            </form>
        </div>
    </div>
    );
}