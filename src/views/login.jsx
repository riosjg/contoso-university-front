import React from 'react';
import '../style/style.css'
export default function(){
    return (
    <div className="home d-flex justify-content-center align-items-center">
          <div className="container card w-25">
            <form id="addCourseForm" className="m-2">
                <div>
                    <p>User:</p>
                    <input className="input-group input-group-text m-1" id="User" name="User"/>
                </div>
                <div>
                    <p>Password:</p>
                    <input className="input-group input-group-text m-1" id="Password" name="Password"/>
                </div>
                <button id="submit" className="btn btn-outline-success m-1" onClick={}>Login</button>
            </form>
        </div>
    </div>
    );
}