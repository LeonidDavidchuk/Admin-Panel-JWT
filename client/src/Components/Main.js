import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Login from '../Authorization/Login';
import Register from '../Authorization/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function MainComponent() {

    return (
        <Container>
            <Row>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <Register />
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
    )
}

