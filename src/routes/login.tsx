import React, { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
    Error,
    Form,
    Input,
    Switcher,
    Title,
    Wrapper,
  } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount(){
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const { target : {name, value} } = e;
        if(name==="email"){
            setEmail(value)
        }
        else if(name==="password"){
            setPassword(value)
        }
    };
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setError("");
        if(isLoading || email==="" || password===""){
            return;
        }
        try{
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
    } catch(e){
        if (e instanceof FirebaseError) {
            setError(e.message);
          }
        }finally{
            setLoading(false)
        }
    };
    return (
    <Wrapper>
        <Title>Log Into <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
</svg>
</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
            <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
            <Input type="submit" value={isLoading ? "Loading" : "Log In"}/>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
        계정이 없으신가요?{" "}
        <Link to="/create-account">회원가입 &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
    );
}