import React, { useState, useEffect } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Row, Col, Alert } from 'antd';
import Logo from "../../../assets/icons/starbucks_logo.svg";
import CloneStarGif from "../../../assets/images/clone-star.gif";
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import "./Register.scss";
import { Breakpoint } from 'react-socks';

const CustomizedForm = Form.create({
    name: 'register_form',
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            email: Form.createFormField({
                ...props.email,
                value: props.email.value,
            }),
            password: Form.createFormField({
                ...props.password,
                value: props.password.value,
            }),
            nickname: Form.createFormField({
                ...props.nickname,
                value: props.nickname.value,
            }),
        };
    }
})(props => {
    const { getFieldDecorator, validateFields } = props.form;
    const [errorMessage, setErrorMessage] = props.errors;

    return (
        <section className="register-form-container form-container">
            <Form className="register-form form-wrapper" onSubmit={(e) => props.onSubmit(e, validateFields)}>
                <Form.Item className='register-title-container title-container'>
                    <span className="register-welcome-title title">Join Us!</span>
                    <br />
                    <small>Create an account</small>
                </Form.Item>
                <Form.Item label="Nickname" colon={false} hasFeedback className='input-block'>
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!' }, { min: 8, message: "Please input at least 8 characters!" }],
                    })(
                        <Input
                            addonBefore={<UserOutlined />}
                            placeholder="MyNickname"
                            hasFeedback
                            autoFocus
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Email address" colon={false} hasFeedback className='input-block'>
                    {getFieldDecorator('email', {
                        rules: [{ type: 'email', message: 'The input is not valid email address!' }, { required: true, message: 'Please input your email address!', }],
                    })(
                        <Input
                            addonBefore={<MailOutlined />}
                            placeholder="example@email.com"
                            hasFeedback
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Password" colon={false} hasFeedback className='input-block'>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }, { min: 8, message: "Please use at least 8 characters!" }],
                    })(
                        <Input.Password
                            addonBefore={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                {errorMessage ? (<Alert message={errorMessage} type="error" closable afterClose={() => setErrorMessage(null)} />) : null}
                <Form.Item className='input-block'>
                    <Row align="middle">
                        <Col xs={24} lg={12}>
                            <Row justify="center">
                                <Button block type="primary" loading={props.isValidating} htmlType="submit" className="register-form-button">
                                    Create account
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Form.Item>
                <div className="register-form-actions-container">
                    <span>Already have an account? <a href="/login" className="green">Sign In!!</a></span>
                </div>
            </Form>
        </section>
    );
});

export default function Register({ handleSignUp, setEmail }) {
    let initial = {
        fields: {
            email: {
                value: '',
            },
            password: {
                value: '',
            },
            nickname: {
                value: '',
            },
        },
    };
    const [state, setState] = useState(initial);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isValidating, setIsValidating] = useState(false);
    const navigate = useNavigate();

    const handleFormChange = changedFields => {
        setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    };

    const handleErrorSignUp = error => {
        setErrorMessage(error);
        setIsValidating(false);
    };

    const handleSubmit = (e, onValidate) => {
        e.preventDefault();
        onValidate(async (err, { email, password, nickname }) => {
            if (!err) {
                setIsValidating(true);
                setEmail(email);
                const signUpError = await handleSignUp({ username: email, password, nickname });
                console.log(signUpError);
                (signUpError && signUpError.message) ? handleErrorSignUp(signUpError.message) : setErrorMessage(null);
            }
        })
    };

    useEffect(() => { console.log("in register") }, []);

    return (
        <main id="registerView" className='auth-layout'>
            <Row justify="start" className='register-interactive-side content-side'>
                <Col span={24} className='register-logo-container logo-container'>
                    <img src={Logo} alt="Starbucks logo" className="starbucks-logo" onClick={() => navigate("/")} />
                </Col>
                <Col span={24}>
                    <CustomizedForm {...state.fields} onChange={handleFormChange} errors={[errorMessage, setErrorMessage]} isValidating={isValidating} onSubmit={handleSubmit} />
                </Col>
            </Row>
            <Breakpoint medium up>
                <section className="register-decoration-side">
                    <span>Sign Up</span>
                    <img src={CloneStarGif} alt="Star clonning itself gif" />
                </section>
            </Breakpoint>
        </main>
    );
}