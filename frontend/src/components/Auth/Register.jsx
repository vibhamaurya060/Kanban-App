import React, { useState } from 'react'

const Register = () => {

  const [user,setUser] = useState({});
  const inputHandler = (e)=>{

      setUser({...user,[e.target.name]:e.target.value})

  }   
  return (
    <div style={{display:'flex',flexDirection:"column",gap:"10px", padding:"20px"}}>
      <input type="text" name='username' placeholder='username' onChange={inputHandler} /> 
      <input type="text" name='email' placeholder='email'  onChange={inputHandler} /> 
      <input type="text" name='password' placeholder='password'   onChange={inputHandler}/>
      <input type="submit"  placeholder='register' onClick={()=>{
                  
                  fetch("https://kanban-app-w133.onrender.com/user/register",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(user)
                  }).then(d=>d.json()).then(d=>alert(d.message))
      }} />

    </div>
  )
}

export default Register