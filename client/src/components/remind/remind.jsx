import React from 'react';
import { useState } from 'react';
import { NavLink, Card, CardText, Button, Col, Container, Input, Row } from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
import { request } from '../../util/http';

const Remind = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState(null);

    const remind = () => {
        const data = {
            email: email
        }

        request('/api/remind', data, 'POST')
            .then(res => res.json())
            .then(res => {
                setMsg('wow');
                console.log(res.message);
            })
    }

    return (
       <section className="page-state">
            <Container>
                <Row className="login">
                    <Col md={6} className="m-auto">
                        {
                            msg &&
                        <Alert color='success'>{msg} Check your email</Alert>
                        }
                        <Card body>
                            <CardText >
                                Enter your email address to receive a secured link
                            </CardText>
                            <CardText>
                                <Input onChange={(e) => setEmail(e.target.value)} />
                            </CardText>
                            <Button className='mt-6' onClick={remind} color='primary'>Recovery</Button>
                            <NavLink href='/login' >Back</NavLink>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

export default Remind;