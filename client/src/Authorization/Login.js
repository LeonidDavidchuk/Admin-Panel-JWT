import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from "axios"
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Login() {

    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [auth, setAuth] = React.useState(false);

    const handleSubmit = (e) => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/login",
            data: {
                login,
                password,
            },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                    expires: Date().now + 5
                });
                // redirect user to the auth page
                window.location.href = "/auth";
                setAuth(true);
            })
        // prevent the form from refreshing the whole page
        e.preventDefault();
    }

    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                {/* login */}
                <Form.Group controlId="formBasicLogin">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="login"
                        name="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Enter email"
                    />
                </Form.Group>

                {/* password */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>
                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Submit
                </Button>
                {/* display success message */}
                {auth ? (
                    <p className="text-success">You Are Logged in Successfully</p>
                ) : (
                    <p className="text-danger">You Are Not Logged in</p>
                )}
            </Form>
        </>
    )
}
