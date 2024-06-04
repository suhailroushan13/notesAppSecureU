import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import config from "./config.json"
const URL = config.URL

const Register = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`${URL}/api/user/register`, values);
            notification.success({
                message: 'Registration Successful',
                description: response.data.msg,
            });
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                notification.error({
                    message: 'Registration Failed',
                    description: error.response.data.msg,
                });
            } else {
                notification.error({
                    message: 'Registration Failed',
                    description: 'An unexpected error occurred.',
                });
                console.error(error);
            }
        }
    };

    return (
        <div className="register-container">
            <Form
                name="register"
                onFinish={onFinish}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    password: '',
                }}
                className="register-form"
            >
                <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your First Name!' }]}
                >
                    <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your Last Name!' }]}
                >
                    <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                >
                    <Input placeholder="Phone" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-button">
                        Register
                    </Button>
                </Form.Item>
                <hr></hr>
                <Form.Item>
                    <Button type="primary" onClick={() => navigate('/login')} className="register-button">
                        Login
                    </Button>
                </Form.Item>

            </Form>

        </div>
    );
};

export default Register;
