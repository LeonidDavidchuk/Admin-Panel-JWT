import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from "universal-cookie";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const cookies = new Cookies();
const token = cookies.get("TOKEN");


export default function AuthComponent() {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    React.useEffect(() => {

        if (token == undefined) {
            navigate("/");
        }
    })

    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/auth-endpoint",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios(configuration)
            .then((result) => {
                setMessage(result.data.message);
            })
            .catch((error) => {
                error = new Error();
            });
    }, []);

    // logout
    const logout = () => {
        // destroyed cookies
        cookies.remove("TOKEN", { path: "/" });

        // redirect user to the main page
        window.location.href = "/free";
    }

    return (
        <div className="text-center">
            <h1 className="text-center">Admin</h1>
            <h3 className="text-center text-danger">{message}</h3>
            <Button type="submit" variant="danger" onClick={() => logout()}>Logout</Button>
        </div>
    );
}