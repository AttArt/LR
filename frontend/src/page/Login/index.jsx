import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './login.css'
const Index = () => {
    return (
        <Card className="content_login" style={{ width: '100%', display:'flex', alignItems: "center", border: 0}}>
            <Card style={{ width: '30rem',padding: '3rem', marginTop: '1rem',}}>
            
                <Card style={{ marginBottom: '1rem', overflow: 'hidden', border: 0}}>
                    <div id="spinner" class="container_login">
                        <img style={{ width: '24rem'}} src="https://i.pinimg.com/originals/a4/48/f0/a448f012ac2681e47ebdd86aaf8a274a.gif"/>
                    </div>
                </Card>
                <Form action='/' >
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label >Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit" to="/" act>
                        Login
                    </Button>
                    
                </Form>
            </Card>
        </Card>
    );
}

export default Index;
