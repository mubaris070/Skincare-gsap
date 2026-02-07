import React, { useState } from 'react'
import Authform from '../../Components/Form/Authform'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css'
function Login() {


    const[login,setLogin] = useState({
        email:"",
        password:""
    })
    const[errors,setErrors]=useState({})

    function handle(e){
        setLogin({...login,[e.target.name]:e.target.value})
    }

    const nav = useNavigate()

    function validate(){
        const newErrors = {}
        if(!login.email){
          newErrors.email = "email is required"
        }else if(!/\S+@\S+\.\S+/.test(login.email)){
           newErrors.email = "email is not valid"
        }
        if( !login.password || login.password.length < 8 || !/\d/.test(login.password)) {
            newErrors.password ="Password must be at least 8 characters and contain a number";
         }
         return newErrors;
    }


   async function onSubmit(e){
    e.preventDefault()
    const validateError = validate()
    setErrors(validateError)


    if(Object.keys(validateError).length !== 0) return;

    try{
        const res = await axios.get("http://localhost:5000/users")
        const user = res.data.find((u)=>u.email === login.email && u.password === login.password);

        if(!user){
            setErrors({general:"Invalid email or password"})
            alert("invalid email or password")
            return;
        }
        localStorage.setItem("isLogged","true")
        localStorage.setItem('email',user.email)
        localStorage.setItem("role",user.role)
        nav('/home')
        alert("login successfull")

    }
    catch(err){
        console.error(err)
        setErrors({general:"something went wrong"})
        alert("something went wrong")
    }
   }    

    




  return (
    <div className="flex min-h-screen bg-white font-lora text-slate-900">

<Authform
         title="Welcome back"
         subtitle="Login to your account"
         buttonName="Sign in"
         footerText="Don't have an account"
         footerLink="Register"
         footerLinkto="/registration"
         margin="my-8"
         onSubmit={onSubmit}
         error={errors}
         fields={[
            {
            label: "Email",
            name:'email',
            type: "email",
            placeholder: "Enter your email",
            onChange:handle,
            value:login.email
          },
          {
            label: "Password",
            name:"password",
            type: "password",
            placeholder: "Create password",
            value:login.password,
            onChange:handle,
          },
         ]}
/>


<div className="inverted-radius  relative w-1/2 h-[95vh] m-4 rounded-2xl bg-white">

  <img
    src="https://i.pinimg.com/1200x/61/da/a2/61daa2c498fb3e082a3a1cff5fe0a030.jpg"
    alt="Model"
    className="w-full h-full object-cover rounded-2xl"
  />
</div>

</div>
 )
}

export default Login