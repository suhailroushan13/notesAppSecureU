import React, { useState, useEffect } from 'react';
import { List, Form, Input, Button, Modal, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from './axiosConfig'; // Use the Axios instance
import Cookies from 'js-cookie';
import './Notes.css';
import config from "./config.json"
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [form] = Form.useForm();
    const URL = config.URL

    const navigate = useNavigate();

    useEffect(() => {
        fetchNotes();
    }, []);


    const convertToIST = (timestamp) => {
        const options = {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
        return new Date(timestamp).toLocaleString("en-US", options);
    };

    console.log(convertToIST("2024-06-06T01: 17: 44.979Z"));


    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${URL}/api/notes/notes`, { withCredentials: true });
            console.log(`${URL}/api/notes/notes`);
            console.log(response.data); // Log the response data
            setNotes(response.data);
        } catch (error) {
            notification.error({
                message: 'Error Fetching Notes',
                description: error.response?.data?.msg || 'An error occurred while fetching notes.',
            });
            console.error('Error fetching notes:', error.response?.data?.msg);
        }
    };


    const addNote = async (values) => {
        try {
            await axios.post(`${URL}/api/notes/notes`, values);
            fetchNotes();
            notification.success({
                message: 'Note Added',
                description: 'Your note has been added successfully.',
            });
        } catch (error) {
            notification.error({
                message: 'Error Adding Note',
                description: error.response?.data?.msg || 'An error occurred while adding the note.',
            });
            console.error('Error adding note:', error);
        }
    };

    const editNote = async (id, values) => {
        try {
            await axios.put(`${URL}/api/notes/notes/${id}`, values);
            fetchNotes();
            notification.success({
                message: 'Note Edited',
                description: 'Your note has been edited successfully.',
            });
        } catch (error) {
            notification.error({
                message: 'Error Editing Note',
                description: error.response?.data?.msg || 'An error occurred while editing the note.',
            });
            console.error('Error editing note:', error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${URL}/api/notes/notes/${id}`);
            fetchNotes();
            notification.success({
                message: 'Note Deleted',
                description: 'Your note has been deleted successfully.',
            });
        } catch (error) {
            notification.error({
                message: 'Error Deleting Note',
                description: error.response?.data?.msg || 'An error occurred while deleting the note.',
            });
            console.error('Error deleting note:', error);
        }
    };

    const showModal = (note) => {
        setCurrentNote(note);
        setVisible(true);
        if (note) {
            form.setFieldsValue(note);
        } else {
            form.resetFields();
        }
    };

    const handleCancel = () => {
        setVisible(false);
        setCurrentNote(null);
        form.resetFields();
    };

    const handleFinish = (values) => {
        if (currentNote) {
            editNote(currentNote._id, values);
        } else {
            addNote(values);
        }
        setVisible(false);
        setCurrentNote(null);
        form.resetFields();
    };

    const handleLogout = () => {
        Cookies.remove('session_id');

        localStorage.clear();
        sessionStorage.clear();

        notification.success({
            message: 'Logged Out',
            description: 'You have successfully logged out.',
        });

        navigate('/login');
    };

    return (
        <>
            <Button className="logout-button" onClick={handleLogout}>Logout</Button>
            <div className="notes-container">
                <h1>Notes</h1>
                <Button type="primary" onClick={() => showModal(null)}>Add Note</Button>

                <List
                    itemLayout="horizontal"
                    dataSource={Array.isArray(notes) ? notes : []}
                    renderItem={note => (
                        <List.Item
                            actions={[
                                <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(note)}>Edit</Button>,
                                <Button icon={<DeleteOutlined />} onClick={() => deleteNote(note._id)} danger>Delete</Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={<span><strong>Title:</strong> {note.title}</span>}
                                description={
                                    <>
                                        <p><strong>Description:</strong> {note.description}</p>
                                        <p><strong>Date:</strong> {new Date(note.created).toLocaleString()}</p>
                                    </>
                                }
                            />

                        </List.Item>
                    )}
                />

                <Modal
                    title={currentNote ? 'Edit Note' : 'Add Note'}
                    visible={visible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form} // Attach form instance to Form component
                        initialValues={currentNote || { title: '', description: '' }}
                        onFinish={handleFinish}
                    >
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: 'Please input the title!' }]}
                        >
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Input.TextArea placeholder="Description" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {currentNote ? 'Edit' : 'Add'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default Notes;
