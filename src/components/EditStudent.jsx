import React from 'react';
import '../style/style.css'

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
              
              await fetch(`https://localhost:44340/api/editStudent/${props.student.Id}`, {
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
        <div className="modal-CSS">
              <div className="container card w-25 mt-5">
            <form id="editDepForm" className="m-2">
                <div>
                    <input className="input-group input-group-text m-1" id="dni" name="dni" value={props.student.Dni} readOnly/>
                </div>
                <div>
                    <input className="input-group input-group-text m-1" id="lastName" name="lastName" placeholder={props.student.LastName}/>
                </div>
                <div>
                    <input className="input-group input-group-text m-1" id="Name" name="Name" placeholder={props.student.Name}/>
                </div>
                <button id="submit" className="btn btn-outline-success m-1" onClick={submitForm}>Save</button>
                <button onClick={() => props.closeWindow()} className="btn btn-outline-danger m-1">Cancel</button>
            </form>
        </div>
        </div>
      
    )
}