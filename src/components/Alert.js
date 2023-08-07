import React from 'react'

function alert(props) {
    const capitalize = (word)=>{
        if(word== "danger"){
            word= "ERROR";
        }
        const lower = (word)=>{
            const lower =word.tolowerCase();
            return lower.charAt(0).toUpperCase()+ lower.slice(1);
        }
    }
  return (
    <div style={{height: '50px'}}>
  { props.alert && <div className={`alert alert-${props.alert.type} warning alert-dismissible fade show`} role="alert">
         <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
    </div>}
    </div>
  )
}

export default alert