import React, { useState, useEffect } from 'react';
import { Container, Alert, Input, Col, Card, CardText } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { Loading } from '../Loading';
import { request } from '../../util/http';
import Button from 'reactstrap/lib/Button';
import { isValidInput } from '../../util/check';
import FormFeedback from 'reactstrap/lib/FormFeedback';

function InputForm(props) {
    const [isValid, toggleValid] = useState('');
    const [newFeedback, setFeedback] = useState(null);

    const inputChange = (e) => {
        const { name, value } = e.target;

        if (isValidInput(name, value)) {
            toggleValid('is-valid');
            if (name === 'rePass' && props.new !== value) {
                toggleValid('is-invalid');
                setFeedback('Password does not match');
            }
            if (name === 'newPass')
                props.set(value);
        }
        else {
            toggleValid('is-invalid');
        }
    };

    return (
        <div>
            <Input
                type='password'
                name={props.name}
                onChange={inputChange}
                onBlur={props.checkBtn}
                className={isValid}
                onBlur={props.checkBtn}
            />
            <FormFeedback>{newFeedback || props.feedback}</FormFeedback>
        </div>
    )
}

const Restore = () => {
    const { email, hash } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [Msg, setMsg] = useState(null);
    const [newPass, setPass] = useState();
    const [isActive, toggleBtn] = useState(true);

    useEffect(() => {
        const data = {
            email: email,
            hash: hash
        }
        request('/api/remind/check', data, 'POST')
            .then((res) => res.json())
            .then((res) => {
                setLoading(false);

                if (!res.success)
                    setMsg(res.message);

            })
    }, [email, hash])

    const checkBtn = () => {
        const countInvalidInputs = document.querySelectorAll(".is-valid").length;

        if (countInvalidInputs === 2)
            toggleBtn(false);
        else
            toggleBtn(true);
    }

    const handleBtn = () => {
        const data = {
            email: email,
            password: newPass
        }

        request('/api/remind/restore', data, 'POST')
            .then((res) => res.json())
            .then( (res) => setMsg(res.message));
    }

    if (isLoading)
        return (
            <Loading />
        )

    if (Msg)
        return (
            <Alert color='info'>{Msg}</Alert>
        )

    return (
        <section className="page-state">
            <Container>
                    <Col md={6} className="m-auto">
                        <Card body>
                            <CardText>
                                Create a new password
                            </CardText>
                            <CardText>
                                <InputForm name='newPass' placeholder='New password' feedback='Too weak pass' set={setPass} checkBtn={checkBtn}/>     
                            </CardText>
                            <CardText>
                                <InputForm name='rePass' placeholder='Repeat password' feedback='Too weak pass' new={newPass} checkBtn={checkBtn}/>
                            </CardText>
                            <Button className='mt-6' color='primary' disabled={isActive} onClick={handleBtn}>Change</Button>
                        </Card>
                    </Col>
            </Container>
        </section>
    )
}

export default Restore;