import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import todo from '../assets/images/todo.png'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [username, setUsername] = useState('')

    const [password, setPassword] = useState('')

    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return (
        <div className='auth-page-container'>
            <div className='auth-brand'>
                <div className='mb-3'>
                    <img src={logo} alt="logo" />
                </div>
                <div>
                    <img src={todo} alt="todo" />
                </div>
            </div>
            <div className='auth-form'>
                <div>
                    <h3>Welcome to To Do List</h3>
                    <p>Please sign-in to your account, and start manage further</p>
                </div>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password" placeholder="....."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button disabled={isLoading}
                            className="mt-3 w-100"
                            type="submit"
                            variant="primary">Sign In</Button>
                        {error && <div className="error">{error}</div>}
                    </Form.Group>
                </Form>
                <div>
                    Don't have an account?
                    <Link to='/signup'>
                        <span className=''>
                            Sign Up
                        </span>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Login