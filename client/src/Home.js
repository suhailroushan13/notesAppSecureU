import React from 'react';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    LoginOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import './Home.css';

const { Header, Content, Footer } = Layout;

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Layout className="layout">
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate('/')}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="2" icon={<LoginOutlined />} onClick={() => navigate('/login')}>
                        Login
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserAddOutlined />} onClick={() => navigate('/register')}>
                        Register
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content" style={{ marginTop: '20px' }}>
                    <Routes>
                        <Route path="/" element={<h1>Welcome to Notes App</h1>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Notes App ©2024 Created by <a href="https://suhailroushan.com" target="_blank" rel="noopener noreferrer">Suhail Roushan</a>
            </Footer>
        </Layout>
    );
};

export default HomePage;
