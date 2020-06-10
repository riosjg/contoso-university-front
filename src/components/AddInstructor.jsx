import React from 'react';
import '../style/style.css'

export default function(props){
    const submitForm = async (e) => {
            e.preventDefault();
            let formElem = document.getElementById("addInsForm");
            let formData = new FormData(formElem);              
            let object = {};
            formData.forEach((value, key) => {
                  object[key] = value;
            });
            let json = JSON.stringify(object);
            console.log(json);
            await fetch('https://localhost:44340/api/addInstructor', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: json
            })
            await props.refresh();
            props.closeWindow();

            //   .then(res => {
            //     if(res.ok){
            //       return res.json()
            //     }else{
            //       return new Promise.reject(res.json())
            //     }
            //   })
        }
    return(
        <div className="modal-CSS">
            <div className="container card w-25 mt-5">
                <form id="addInsForm" className="m-2">
                    <div className=" text-left">
                        <div>
                            Name:
                            <input className="input-group input-group-text m-1" id="Name" name="Name" placeholder="Instructor's Name"/>
                        </div>
                        <div>
                            LastName:
                            <input className="input-group input-group-text m-1" id="LastName" name="LastName" placeholder="Instructor's last name"/>
                        </div>
                        <div>
                            Birthdate:
                            <input className="input-group input-group-text m-1" id="HireDate" name="HireDate" type="date"/>
                        </div>
                    </div>
                    <button id="submit" className="btn btn-outline-success m-1" onClick={submitForm}>Add</button>
                    <button className="btn btn-outline-danger m-1" onClick={() => props.closeWindow()}>Cancel</button>
                </form>
            </div>
        </div>
    )
}