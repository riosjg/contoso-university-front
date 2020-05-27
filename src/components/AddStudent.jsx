import React from 'react';

export default function(props){
    const submitForm = async (e) => {
            e.preventDefault();
            let formElem = document.getElementById("addDepForm");
            let formData = new FormData(formElem);              
            let object = {};
            formData.forEach((value, key) => {
                  object[key] = value;
            });
            let json = JSON.stringify(object);
            console.log(json);
            await fetch('https://localhost:44340/api/addStudent', {
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
            <form id="addDepForm">
            <div>
                    <input id="lastName" name="lastName" placeholder="Student's lastname"/>
                </div>
                <div>
                    <input id="Name" name="Name" placeholder="Student's name"/>
                </div>
                <button id="submit" className="submit btn btn-primary" onClick={submitForm}>Add</button>
                <button onClick={() => props.closeWindow()}>Cancel</button>

            </form>
        </div>
    )
}