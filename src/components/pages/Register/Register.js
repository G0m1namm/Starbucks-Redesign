import React, { useState } from 'react'
import { Form, Icon, Input, Button, Row, Col, Alert } from 'antd';
import WomanImage from "../../../assets/images/lookin-device.webp";
import Logo from "../../../assets/icons/starbucks_logo.svg";
import CloneStarGif from "../../../assets/images/clone-star.gif";
import "./Register.scss";
import { useHistory } from 'react-router-dom';

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
    },
    onValuesChange(_, values) {
        // console.table(values);
    },
})(props => {
    const { getFieldDecorator, validateFields } = props.form;
    const [errorMessage, setErrorMessage] = props.errors;

    return (
        <section className="register-form-container">
            <Form className="register-form" onSubmit={(e) => props.onSubmit(e, validateFields)}>
                <Form.Item>
                    <span className="register-welcome-title">Join Us!</span>
                    <br />
                    <small>Create an account</small>
                </Form.Item>
                <Form.Item label="Nickname" colon={false} hasFeedback>
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!' }, { min: 8, message: "Please input at least 8 characters!" }],
                    })(
                        <Input
                            addonBefore={<Icon type="user" />}
                            placeholder="MyNickname"
                            hasFeedback
                            autoFocus
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Email address" colon={false} hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [{ type: 'email', message: 'The input is not valid email address!' }, { required: true, message: 'Please input your email address!', }],
                    })(
                        <Input
                            addonBefore={<Icon type="mail" />}
                            placeholder="example@email.com"
                            hasFeedback
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
                    <Row gutter={12} type="flex" justify="center">
                        <Col>
                            <Button block type="primary" loading={props.isValidating} htmlType="submit" className="register-form-button">
                                Create account
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
                <div className="register-form-actions-container">
                    <span>Already have an account? <a href="/register" className="green">Join Now!!</a></span>
                </div>
            </Form>
        </section>
    );
});

export function Register({ handleSignUp, setEmail }) {
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
        onValidate(async (err, { email, password, nickname }) => {
            if (!err) {
                setIsValidating(true);
                setEmail(email);
                const signUpError = await handleSignUp({ username: email, password, nickname });
                (signUpError.message) ?  handleErrorSignUp(signUpError.message) : setErrorMessage(null);
            }
        })
    };

    return (
        <main id="registerView">
            <img src={Logo} alt="Starbucks logo" className="starbucks-logo" onClick={() => history.push("/home")} />
            <CustomizedForm {...state.fields} onChange={handleFormChange} errors={[errorMessage, setErrorMessage]} isValidating={isValidating} onSubmit={handleSubmit} />
            <section className="register-decoration-side">
                <span>Sign Up</span>
                {/* <span><small>Easy and fast</small></span> */}
                <img src={CloneStarGif} alt="Star clonning itself gif" />
            </section>
            {/* <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre> */}
        </main>
    );
}