import React from 'react';

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
              await fetch('https://localhost:44340/api/addDepartment', {
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
            <form id="editDepForm" action>
                <div>
                    <label for="Title"> </label>
                    <input id="Title" name="Title" placeholder="Department's name"/>
                </div>
                <div>
                    <label for="Description"> </label>
                    <input id="Description" name="Description" placeholder="Department's description"/>
                </div>
                <button id="submit" class="submit btn btn-primary" onClick={submitForm}>Enviar</button>
            </form>
        </div>
    )
}