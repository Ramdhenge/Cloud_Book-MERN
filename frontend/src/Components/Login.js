import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""})
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json()
          console.log(json);
          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authtoken)
            navigate("/")
            props.showAlert("Logged in Successfully!","success")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }

    const onChange = (e) => {
        // The chnages of input fields should add to name through value
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

    return (
        <div className='container w-50 my-3'>
            <h2 className='my-4'>LogIn</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary my-2" >Submit</button>
            </form>
        </div>
    )
}

export default Login
