import React, { useState } from "react";
import Authform from "../../Components/Form/Authform";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './register.css'


const Register = () => {

      const[register,setRegister] = useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
      })
      const nav = useNavigate()
      const[errors,setErrors]=useState({})


      function handle(e){
        setRegister({...register,[e.target.name]:e.target.value})
      }

      function validate(){
        const newErrors={}

        if(!register.username || register.username.length < 4 ){
          newErrors.username = "username must be 4 characters"
        }
        if(!register.email){
          newErrors.email = "email is required"
        }else if(!/\S+@\S+\.\S+/.test(register.email)){
           newErrors.email = "email is not valid"
        }
        if( !register.password || register.password.length < 8 || !/\d/.test(register.password)) {
            newErrors.password ="password must be at least 8 characters and contain a number";
         }
         if (!register.confirmpassword) {
             newErrors.confirmpassword = "confirm password is required";
            } 
            else if (register.confirmpassword !== register.password) {
            newErrors.confirmpassword = "Passwords do not match";
           }
         return newErrors;
        }





      async function onSubmit(e) {
  e.preventDefault();

  const validateError = validate();
  setErrors(validateError);

  if (Object.keys(validateError).length !== 0) return;

  try {
    const res = await axios.get(
      `http://localhost:5000/users?email=${register.email}`
    );

    if (res.data.length > 0) {
      setErrors({ email: "Email is already registered" });
      return;
    }

    await axios.post("http://localhost:5000/users", {
      username: register.username,
      email: register.email,
      password: register.password,
      cart: [],
      wishlist: [],
      buynow: [],
      role: "user",
      address:[],
      orders: [],

    });

    alert("Registration successful");

    setRegister({
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    });

    setErrors({});

    localStorage.setItem("isLogged", "true");
    localStorage.setItem("email", register.email);
    localStorage.setItem("role", "user");

    nav("/home");

  } catch (err) {
    console.log("Register error:", err);
  }
}


      

  return (
    <div className="flex min-h-screen bg-white font-lora text-slate-900">

<Authform 
          title="Create your account"
          subtitle="Start your 14 days free trial"
          buttonName="Create Account"
          footerText="Already have an account"
          footerLink="Sign in"
          footerLinkto="/login"
          onSubmit={onSubmit}
          margin="my-2"
          fields={[
               {
            label: "Username",
            name:'username',
            type: "text",
            placeholder: "Enter your username",
            onChange:handle,
            value:register.username
          },
          {
            label: "Email",
            name:'email',
            type: "email",
            placeholder: "Enter your email",
            onChange:handle,
            value:register.email
          },
          {
            label: "Password",
            name:"password",
            type: "password",
            placeholder: "Create password",
            value:register.password,
              onChange:handle,
          },
          {
            label: "Confirm Password",
            name:"confirmpassword",
            type: "password",
            placeholder: "Confirm password",
              onChange:handle,
            value:register.confirmpassword
          }
          ]}
          error={errors}
          />      

<div className="inverted-radiuss  relative w-1/2 h-[95vh] m-4 rounded-2xl bg-white">

  <img
    src="https://i.pinimg.com/1200x/61/da/a2/61daa2c498fb3e082a3a1cff5fe0a030.jpg"
    alt="Model"
    className="w-full h-full object-cover rounded-2xl"
  />
</div>
 </div>
  );
};

export default Register;
