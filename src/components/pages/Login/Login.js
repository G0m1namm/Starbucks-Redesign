import React, { useState } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Row, Col, Alert } from 'antd';
import WomanImage from "../../../assets/images/lookin-device.webp";
import Logo from "../../../assets/icons/starbucks_logo.svg";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import "./Login.scss";
import { Breakpoint } from 'react-socks';

const CustomizedForm = Form.create({
    name: 'global_state',
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
        };
    },
    onValuesChange(_, values) {
        // console.table(values);
    },
})(props => {
    const { getFieldDecorator, validateFields } = props.form;
    const [errorMessage, setErrorMessage] = props.errors;

    return (
        <section className="login-form-container">
            <Form className="login-form" onSubmit={(e) => props.onSubmit(e, validateFields)}>
                <Form.Item className='login-title-container'>
                    <span className="login-welcome-title">Welcome!</span>
                    <br />
                    <small>Login to your account</small>
                </Form.Item>
                <Form.Item label="Email address" colon={false} hasFeedback className='input-block'>
                    {getFieldDecorator('email', {
                        rules: [{ type: 'email', message: 'The input is not valid email address!' }, { required: true, message: 'Please input your email address!', }],
                    })(
                        <Input
                            addonBefore={<MailOutlined />}
                            placeholder="example@email.com"
                            hasFeedback
                            autoFocus
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Password" colon={false} hasFeedback className='input-block'>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }],
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
                    <Row gutter={12} align="middle">
                        <Col xs={24} lg={12}>
                            <Row justify="center">
                                <Button block type="primary" loading={props.isValidating} htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Row>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Row justify="center">
                                <a className="login-form-forgot lightgray" href="/register">
                                    without account? <strong className="green">Join Us!</strong>
                                </a>
                            </Row>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </section>
    );
});

export default function Login({ handleSignIn }) {
    let initial = {
        fields: {
            email: {
                value: '',
            },
            password: {
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
        onValidate(async (err, { email, password }) => {
            if (!err) {
                setIsValidating(true);
                const signUpError = await handleSignIn({ username: email, password });
                (signUpError && signUpError.message) ? handleErrorSignUp(signUpError.message) : setErrorMessage(null);
            }
        })
    };

    return (
        <main id="loginView" className='auth-layout'>
            <Row justify="start" className='login-interactive-side'>
                <Col span={24} className='login-logo-container'>
                    <img src={Logo} alt="Starbucks logo" className="starbucks-logo" onClick={() => navigate("/")} />
                </Col>
                <Col span={24}>
                    <CustomizedForm {...state.fields} onChange={handleFormChange} errors={[errorMessage, setErrorMessage]} isValidating={isValidating} onSubmit={handleSubmit} />
                </Col>
            </Row>
            <Breakpoint medium up>
                <section className="login-decoration-side">
                    <span>Sign In</span>
                    <img src={WomanImage} alt="Woman watching a device" />
                </section>
            </Breakpoint>
        </main>
    );
}