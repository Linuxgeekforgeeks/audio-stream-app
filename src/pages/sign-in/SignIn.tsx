import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./SignIn.css";
import * as yup from "yup";
import { PEOPLES_IMAGES } from "../../avatars";
import Cookies from "universal-cookie";
interface formValues {
  username: string;
  name: string;
}
function SignIn() {
  const cookies=new Cookies()
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is Required")
      .matches(usernameRegex, "Invalid Username"),
    name: yup.string().required("Name is Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({ resolver: yupResolver(schema) });

  const handleSignInForm: SubmitHandler<formValues> = async (data, event) => {
    event?.preventDefault();
    const { username, name } = data;
    const response = await fetch("http://localhost:4000/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        image:
          PEOPLES_IMAGES[Math.floor(Math.random() * PEOPLES_IMAGES.length)],
      }),
    });
    if(!response.ok){
        alert("Some Error occured during SignIn.")
        return 
    }
    const responseData=await response.json()
    console.log(responseData)
    const expires=new Date()
    expires.setDate( expires.getDate()+1)
    cookies.set("username",responseData.username,{
        expires,
    })
    cookies.set("name",responseData.name,{
        expires,
    })
    cookies.set("token",responseData.token,{
        expires,
    })
  };
  return (
    <div className="sign-in" onSubmit={handleSubmit(handleSignInForm)}>
      <main>
        <h1>Welcome To CodeWithMudi Podcast</h1>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input {...register("username")} type="text" id="username" />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input {...register("name")} type="text" id="name" />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
          </div>
          <button type="submit">Sign In</button>
        </form>
      </main>
    </div>
  );
}

export default SignIn;
