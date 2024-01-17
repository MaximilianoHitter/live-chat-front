import axios, { AxiosResponse } from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./types";
export default function AuthUser(){
    
    const navigate = useNavigate();

    const getToken = ()=>{
        const sessionToken = sessionStorage.getItem('token');
        if(sessionToken){
            const userToken = sessionToken;
            return userToken;
        }else{
            return false;
        }
    }

    const getUser = ()=>{
        const sessionUser = sessionStorage.getItem('user');
        if(sessionUser){
            const user = JSON.parse(sessionUser);
            return user;
        }else{
            return false;
        }
    }
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const logout = ()=>{
        http.post('/logout', null, {headers:{
            'Authorization':'Bearer '+getToken()
        }}).then((res : AxiosResponse)=>{
            sessionStorage.clear();
            navigate('/');
        })
        
    }

    const saveToken = (user: User, token: string)=>{
        sessionStorage.setItem('token', (token));
        sessionStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        navigate('/');
    }

    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+ getToken()
        }
    })

    return {
        setToken:saveToken,
        user,
        token,
        getToken,
        getUser,
        http,
        logout,
    }
}