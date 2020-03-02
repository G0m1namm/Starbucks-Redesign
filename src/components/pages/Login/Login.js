import React, { useState } from 'react'
import { Form, Icon, Input, Button, Row, Col, Alert } from 'antd';
import WomanImage from "../../../assets/images/lookin-device.webp";
import Logo from "../../../assets/icons/starbucks_logo.svg";
import "./Login.scss";
import { useHistory } from 'react-router-dom';

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
                <Form.Item>
                    <span className="login-welcome-title">Welcome!</span>
                    <br />
                    <small>Login to your account</small>
                </Form.Item>
                <Form.Item label="Email address" colon={false} hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [{ type: 'email', message: 'The input is not valid email address!' }, { required: true, message: 'Please input your email address!', }],
                    })(
                        <Input
                            addonBefore={<Icon type="mail" />}
                            placeholder="example@email.com"
                            hasFeedback
                            autoFocus
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Password" colon={false} hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                        <Input.Password
                            addonBefore={<Icon type="lock" />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                {errorMessage ? (<Alert message={errorMessage} type="error" closable afterClose={() => setErrorMessage(null)} />) : null}
                <Form.Item>
                    <Row gutter={12} type="flex">
                        <Col span={12}>
                            <Button block type="primary" loading={props.isValidating} htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Col>
                        <Col span={12}>
                            <a className="login-form-forgot lightgray" href="/register">
                                without account? <strong className="green">Join Us!</strong>
                            </a>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </section>
    );
});

export default function Login({handleSignIn}) {
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
    const history = useHistory();

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
        onValidate(async (err, {email, password}) => {
            if (!err) {
                setIsValidating(true);
                const signUpError = await handleSignIn({ username: email, password });
                (signUpError && signUpError.message) ?  handleErrorSignUp(signUpError.message) : setErrorMessage(null);
            }
        })
    };

    return (
        <main id="loginView">
            <img src={Logo} alt="Starbucks logo" className="starbucks-logo" onClick={() => history.push("/home")}/>
            <CustomizedForm {...state.fields} onChange={handleFormChange} errors={[errorMessage, setErrorMessage]} isValidating={isValidating} onSubmit={handleSubmit} />
            <section className="login-decoration-side">
                <span>Sign In</span>
                <img src={WomanImage} alt="Woman watching a device" />
            </section>
        </main>
    );
}