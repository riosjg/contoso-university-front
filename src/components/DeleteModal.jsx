import React from 'react';


export default function(props){
return(
<>
<div>
    <p>Are you sure that you want to delete {props.elDescription}? </p>
    <button onClick={() => props.deleteElement(props.elId)} type="button">Eliminar</button>
    <button onClick={() => props.closeWindow()} type="button">Cancel</button>
</div>
</>
)
}