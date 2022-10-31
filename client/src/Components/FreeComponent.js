import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Col, Row } from 'react-bootstrap';
import Login from '../Authorization/Login';
import Register from '../Authorization/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function FreeComponent() {

    const [message, setMessage] = React.useState("");

    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/free-endpoint",
        };

        axios(configuration)
            .then((result) => {
                setMessage(result.data.message);
            })
            .catch((error) => {
                error = new Error();
            });
    }, [])

    return (
        <Container>
            <Row>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <Login />
                </Col>
            </Row>

            <Row>
                <Col className="text-center">
                    <section id="navigation">
                        <a href="/">Register</a>
                        <a href="/free">Login</a>
                        <a href="/auth">Admin</a>
                    </section>
                </Col>
            </Row>
        </Container>
    );
}