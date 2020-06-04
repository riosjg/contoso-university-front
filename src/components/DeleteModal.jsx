import React from 'react';


export default function(props){
return(
<>
<div className="container d-flex  justify-content-center">
    <div className="card w-25 d-flex">
    <p>Are you sure that you want to delete {props.elDescription}? </p>
    <button onClick={() => props.deleteElement(props.elId)} type="button" className="btn btn-danger w-50 mx-auto my-1">Confirm</button>
    <button onClick={() => props.closeWindow()} type="button" className="btn btn-secondary w-50 mx-auto my-1">Cancel</button>
    </div>
</div>
</>
)
}