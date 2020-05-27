import React from 'react';

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
        <div>
            <form id="addInsForm">
                <div>
                    <input id="Name" name="Name" placeholder="Instructor's Name"/>
                </div>
                <div>
                    <input id="LastName" name="LastName" placeholder="Instructor's last name"/>
                </div>
                <div>
                    <input id="HireDate" name="HireDate" type="date"/>
                </div>
                <button id="submit" className="submit btn btn-primary" onClick={submitForm}>Add</button>
                <button onClick={() => props.closeWindow()}>Cancel</button>
            </form>
        </div>
    )
}