import React from 'react';
import '../style/style.css'
import cogoToast from 'cogo-toast'
export default function(props){
    const authenticateLog = async (e) => {
        e.preventDefault();
        let formElem = document.getElementById("loginForm");
        let formData = new FormData(formElem);              
        let object = {};
        formData.forEach((value, key) => {
              object[key] = value;
        });
        let json = JSON.stringify(object);
        let res = await fetch('https://localhost:44340/api/authenticate', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: json
        })
        if(res.ok){
            cogoToast.success("Logged succesfully", {position: 'bottom-right'})
            let response = await res.json();
            localStorage.setItem('StudentId', response.StudentId);
            localStorage.setItem('Role', response.Role);
            props.setLogin();
        }else{
            cogoToast.error("Please verify your e-mail or password.")
            let mailInput = document.getElementById("Mail");
            mailInput.value = '';
            mailInput.focus();
            document.getElementById("Password").value = '';
        }
        

    }
    return (
    <div className="home d-flex justify-content-center align-items-center">
          <div className="container card w-25">
            <form id="loginForm" className="m-2">
                <div>
                    <p>User:</p>
                    <input className="input-group input-group-text m-1" id="Mail" name="Mail"/>
                </div>
                <div>
                    <p>Password:</p>
                    <input className="input-group input-group-text m-1" id="Password" name="Password"/>
                </div>
                <button id="submit" className="btn btn-outline-success m-1" onClick={authenticateLog}>Login</button>
            </form>
        </div>
    </div>
    );
}