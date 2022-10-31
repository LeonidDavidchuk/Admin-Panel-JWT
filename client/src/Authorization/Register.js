import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from "axios"


export default function Register() {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [register, setRegister] = React.useState(false);



    const handleSubmit = (e) => {
        const configuration = {
            method: "POST",
            url: "http://localhost:3000/register",
            data: {
                login,
                password,
            },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
                setRegister(true);
            })
            .catch((error) => {
                error = new Error();
            });
        // prevent the form from refreshing the whole page
        e.preventDefault();

    };

    return (
        <>
            <h2>Register</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                {/* login */}
                <Form.Group controlId="formBasicLogin">
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                        type="login"
                        name="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Enter login"
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
                    Register
                </Button>

                {/* display success message */}
                {register ? (
                    <p className="text-success">You Are Registered Successfully</p>
                ) : (
                    <p className="text-danger">You Are Not Registered</p>
                )}
            </Form>
        </>
    )
}