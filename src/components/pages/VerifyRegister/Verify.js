import React, { useState, useContext, useEffect } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Row, Col, Alert } from 'antd';
import Logo from "../../../assets/icons/starbucks_logo.svg";
import PhoneDrawedImage from "../../../assets/images/phone-drawed.webp";
import { useNavigate } from 'react-router-dom';
import ReactCodeInput from 'react-verification-code-input';
import { AuthContext } from '../../../helpers/AuthProvider';
import "./Verify.scss";
import { MailOutlined } from '@ant-design/icons';
import { Breakpoint, useCurrentWidth } from 'react-socks';

const CustomizedForm = Form.create({
    name: 'verify_form',
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            email_address: Form.createFormField({
                ...props.email_address,
                value: props.email_address.value,
            }),
            code: Form.createFormField({
                ...props.code,
                value: props.code.value,
            }),
        };
    },
    onValuesChange(_, values) {
        // console.table(values);
    },
})(props => {
    const { getFieldDecorator, validateFields } = props.form;
    const [errorMessage, setErrorMessage] = props.errors;
    const width = useCurrentWidth();

    return (
        <section className="verify-form-container form-container">
            <Form className="verify-form form-wrapper" onSubmit={(e) => props.onSubmit(e, validateFields)}>
                <Form.Item className='title-container'>
                    <span className="verify-welcome-title title">Authenticate Your Account</span>
                    <br />
                    <small>We've sent you a verification code to your email.<br /> It can take few minutes.</small>
                </Form.Item>
                {(props.email == null) &&
                    <Form.Item label="Email address" colon={false} hasFeedback className='input-block'>
                        {getFieldDecorator('email_address', {
                            rules: [{ type: 'email', message: 'The input is not valid email address!' }, { required: true, message: 'Please input your email address!', }],
                        })(
                            <Input
                                addonBefore={<MailOutlined />}
                                placeholder="example@email.com"
                                hasFeedback
                            />,
                        )}
                    </Form.Item>
                }
                <Form.Item label="Verification code" colon={false} className='input-block'>
                    {getFieldDecorator('code', {
                        rules: [{ required: true, message: 'Please input your verification code!' }, { min: 6, message: "Please input at least 6 characters!" }],
                    })(
                        <ReactCodeInput
                            type="number"
                            fields={6}
                            fieldWidth={width <= 992 ? 52 : 58}
                            fieldHeight={width <= 992 ? 52 : 58}
                            className="input-verification-code"
                        />
                    )}
                </Form.Item>
                {errorMessage ? (<Alert message={errorMessage} type="error" closable afterClose={() => setErrorMessage(null)} />) : null}
                <Form.Item className='input-block'>
                    <Row align="middle">
                        <Col xs={24} lg={12}>
                            <Row justify="center">
                                <Button block type="primary" loading={props.isValidating} htmlType="submit" className="verify-form-button">
                                    Verify
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </section>
    );
});

export default function Verify({ handleConfirmSignUp, email }) {
    let initial = {
        fields: {
            email_address: {
                value: '',
            },
            code: {
                value: null,
            },
        },
    };
    const [state, setState] = useState(initial);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isValidating, setIsValidating] = useState(false);
    const [userAttributes, setUserAttributes] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    const handleFormChange = changedFields => {
        setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    };

    const handleErrorSignUp = error => {
        setErrorMessage(error);
        setIsValidating(false);
    };

    useEffect(() => {
        (user) ? setUserAttributes(user.attributes) : setUserAttributes({ email });
    }, [user, email,])

    const handleSubmit = (e, onValidate) => {
        e.preventDefault();
        onValidate(async (err, { code, email_address }) => {
            if (!err) {
                setIsValidating(true);
                const data = { username: userAttributes?.email ? userAttributes.email : email_address, code: code };
                console.log(data);
                const confirmData = await handleConfirmSignUp(data);
                if (confirmData === "SUCCESS") navigate("/login");
                (confirmData && confirmData.message) ? handleErrorSignUp(confirmData.message) : setErrorMessage(null);
            }
        })
    };

    return (
        <main id="verifyView" className='auth-layout'>
            <Row justify="start" className='verify-interactive-side content-side'>
                <Col span={24} className='logo-container'>
                    <img src={Logo} alt="Starbucks logo" className="starbucks-logo" onClick={() => navigate("/")} />
                </Col>
                <Col span={24}>
                    <CustomizedForm {...state.fields} onChange={handleFormChange} errors={[errorMessage, setErrorMessage]} isValidating={isValidating} onSubmit={handleSubmit} />
                </Col>
            </Row>
            <Breakpoint medium up>
                <section className="verify-decoration-side">
                    <span>Account Verification</span>
                    <img src={PhoneDrawedImage} alt="Phone drawed with a star in the middle" />
                </section>
            </Breakpoint>
        </main>
    );
}