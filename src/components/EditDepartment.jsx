import React from 'react';
import Department from '../views/Department';

export default function(props){
    const submitForm = async (e) => {
            e.preventDefault();
              let formElem = document.getElementById("editDepForm");
              let formData = new FormData(formElem);              
              let object = {};
              formData.forEach((value, key) => {
                  object[key] = value;
              });
              let json = JSON.stringify(object);
              console.log(json);
              
              await fetch(`https://localhost:44340/api/editDepartment/${props.department.Id}`, {
                method: 'PUT',
                headers: {
                  "Content-Type" : "application/json"
                },
                body: json
              })
                await props.refresh();
                props.closeWindow();
              

            //   .then(res => {
            //     if(res.
            //     }else{
            //       return new Promise.reject(res.json())ok){
            //       return res.json()
            //     }
            //   })
        }
    return(
        <div>
            <form id="editDepForm">
                <div>
                    <input id="Title" name="Title" value={props.department.Title} readOnly/>
                </div>
                <div>
                    <input id="Description" name="Description" placeholder="Department's description"/>
                </div>
                <button id="submit" className="submit btn btn-primary" onClick={submitForm}>Edit</button>
            </form>
        </div>
    )
}