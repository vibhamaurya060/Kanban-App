import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({});

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch("https://kanban-app-w133.onrender.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data); // Debugging: log response data
        
        if (data.accessToken) {
          alert("User login successfully");
          console.log('Token:', data.accessToken); // Debugging: log token
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: "column", gap: "10px", padding: "20px" }}>
      <input
        type="text"
        name='email'
        placeholder='email'
        onChange={inputHandler}
      />
      <input
        type="password"
        name='password'
        placeholder='password'
        onChange={inputHandler}
      />
      <input
        type="submit"
        value='Login'
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Login;
