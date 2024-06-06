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
                        <Route path="/" element={
                            <div>
                                <h1>Welcome to Notes App</h1>
                                <div className="why-secureu">
                                    <h2>Why SECUREU?</h2>
                                    <p>We excel in developing top-tier, easily integrable security products and offering personalized solutions for businesses with up to 100+ employees. If you are one such company seeking robust security, consider us your dedicated partner, allowing you to focus on your business’s growth while we ensure its security.</p>

                                    <h3>Dedicated Resources</h3>
                                    <p>Security is a full-time job, an attack never comes with a warning. However it can be difficult to keep a dedicated security personnel within small and medium businesses. That is where SECUREU can help you with on-demand security consultation and help you build a strong wall to protect all your data.</p>

                                    <h3>Infrastructure Management</h3>
                                    <p>We aren’t just talking about systems that are 10 years old, infrastructure is aging every day. A machine bought three months ago can be open to vulnerabilities today. Our team of experts study these unpatched vulnerabilities & implement security patches to ensure you are protected at all times.</p>

                                    <h3>Customized Solutions</h3>
                                    <p>Traditional security solutions from larger firms often mismatch the needs & budgets of small and medium businesses, leading to overspending or security vulnerabilities. SECUREU provides customized security services, ensuring cost-effective, exact-fit protection for your specific business requirements.</p>
                                </div>
                            </div>
                        } />
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