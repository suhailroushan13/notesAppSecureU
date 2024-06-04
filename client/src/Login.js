import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from './axiosConfig';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import config from "./config.json"

const Login = () => {
    const navigate = useNavigate();
    const URL = config.URL

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`${URL}/api/user/login`, values);
            notification.success({
                message: 'Login Successful',
                description: 'You have successfully logged in.',
            });
            // Store session ID in a cookie
            Cookies.set('session_id', response.data.session_id, { expires: 7 }); // Expires in 7 days

            // Store user details in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect to /notes
            console.log('Navigating to /notes');
            navigate('/notes');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                notification.error({
                    message: 'Login Failed',
                    description: error.response.data.msg,
                });
            } else {
                notification.error({
                    message: 'Login Failed',
                    description: 'An unexpected error occurred.',
                });
                console.error(error);
            }
        }
    };

    return (
        <div className="login-container">
            <Form
                name="login"
                onFinish={onFinish}
                initialValues={{
                    email: '',
                    password: '',
                }}
                className="login-form"
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-button">
                        Login
                    </Button>
                </Form.Item>

                <hr></hr>
                <Form.Item>
                    <Button type="primary" onClick={() => navigate('/register')} className="register-button">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
