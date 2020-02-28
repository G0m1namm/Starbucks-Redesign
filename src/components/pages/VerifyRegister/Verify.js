import React, { useState, useContext, useEffect } from 'react'
import { Form, Icon, Input, Button, Row, Col, Alert } from 'antd';
import Logo from "../../../assets/icons/starbucks_logo.svg";
import PhoneDrawedImage from "../../../assets/images/phone-drawed.webp";
import { useHistory } from 'react-router-dom';
import ReactCodeInput from 'react-verification-code-input';
import { AuthContext } from '../../../helpers/AuthProvider';
import "./Verify.scss";

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

    return (
        <section className="verify-form-container">
            <Form className="verify-form" onSubmit={(e) => props.onSubmit(e, validateFields)}>
                <Form.Item>
                    <span className="verify-welcome-title">Authenticate Your Account</span>
                    <br />
                    <small>We've sent you a verification code to your email.<br/> It can take few minutes.</small>
                </Form.Item>
                {(props.email == null) && 
                    <Form.Item label="Email address" colon={false} hasFeedback>
                        {getFieldDecorator('email_address', {
                            rules: [{ type: 'email', message: 'The input is not valid email address!' }, { required: true, message: 'Please input your email address!', }],
                        })(
                            <Input
                                addonBefore={<Icon type="mail" />}
                                placeholder="example@email.com"
                                hasFeedback
                            />,
                        )}
                    </Form.Item>
                }
                <Form.Item label="Verification code" colon={false}>
                    {getFieldDecorator('code', {
                        rules: [{ required: true, message: 'Please input your verification code!' }, { min: 6, message: "Please input at least 6 characters!" }],
                    })(
                        <ReactCodeInput type="number" fields={6} className="input-verification-code" />
                    )}
                </Form.Item>
                {errorMessage ? (<Alert message={errorMessage} type="error" closable afterClose={() => setErrorMessage(null)} />) : null}
                <Form.Item>
                    <Row gutter={12} type="flex" justify="center">
                        <Col>
                            <Button block type="primary" loading={props.isValidating} htmlType="submit" className="verify-form-button">
                                Verify
                            </Button>
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
            email_address:{
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
    const history = useHistory();
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
        (user) ? setUserAttributes(user.attributes) : setUserAttributes(email);
    }, [user, email])

    const handleSubmit = (e, onValidate) => {
        e.preventDefault();
        onValidate(async (err, { code, email_address }) => {
            if (!err) {
                setIsValidating(true);
                const data = { username: (userAttributes) ? userAttributes.email : email_address, code: code };
                console.log(data);
                const confirmData = await handleConfirmSignUp(data);
                if(confirmData === "SUCCESS") history.push("/login");
                (confirmData && confirmData.message) ?  handleErrorSignUp(confirmData.message) : setErrorMessage(null);
            }
        })
    };

    return (
        <main id="verifyView">
            <img src={Logo} alt="Starbucks logo" className="starbucks-logo" onClick={() => history.push("/home")} />
            <CustomizedForm {...state.fields} onChange={handleFormChange} errors={[errorMessage, setErrorMessage]} isValidating={isValidating} onSubmit={handleSubmit} email={email}/>
            <section className="verify-decoration-side">
                <span>Account Verification</span>
                <img src={PhoneDrawedImage} alt="Phone drawed with a star in the middle" />
            </section>
        </main>
    );
}