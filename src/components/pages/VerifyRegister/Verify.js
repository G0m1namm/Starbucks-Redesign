import React, { useState, useContext, useEffect } from 'react'
import { Form, Icon, Input, Button, Row, Col, Alert } from 'antd';
import WomanImage from "../../../assets/images/lookin-device.webp";
import Logo from "../../../assets/icons/starbucks_logo.svg";
import CloneStarGif from "../../../assets/images/clone-star.gif";
import { useHistory } from 'react-router-dom';
import ReactCodeInput from 'react-verification-code-input';
import "./Verify.scss";
import { AuthContext } from '../../../helpers/AuthProvider';

const CustomizedForm = Form.create({
    name: 'verify_form',
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
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
    // const [errorMessage, setErrorMessage] = props.errors;

    return (
        <section className="register-form-container">
            <Form className="register-form" onSubmit={(e) => props.onSubmit(e, validateFields)}>
                <Form.Item>
                    <span className="register-welcome-title">Authenticate Your Account</span>
                    <br />
                    <small>We've sent you a verification code to your email</small>
                </Form.Item>
                <Form.Item label="Verification code" colon={false}>
                    {getFieldDecorator('code', {
                        rules: [{ required: true, message: 'Please input your verification code!' }, { min: 6, message: "Please input at least 6 characters!" }],
                    })(
                        <ReactCodeInput type="number" fields={6} className="input-verification-code" />
                    )}
                </Form.Item>
                {/* {errorMessage ? (<Alert message={errorMessage} type="error" closable afterClose={() => setErrorMessage(null)} />) : null} */}
                <Form.Item>
                    <Row gutter={12} type="flex" justify="center">
                        <Col>
                            <Button block type="primary" loading={props.isValidating} htmlType="submit" className="register-form-button">
                                Verify
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
                <div className="register-form-actions-container">
                    <span>It may take a minute to receive your code. Haven't received it? <a href="#" className="green">Resend a new code</a>.</span>
                </div>
            </Form>
        </section>
    );
});

export default function Verify({handleConfirmSignUp, handleResendSignUp, email}) {
    let initial = {
        fields: {
            code: {
                value: null,
            },
        },
    };
    const [state, setState] = useState(initial);
    // const [errorMessage, setErrorMessage] = useState(null);
    const [isValidating, setIsValidating] = useState(false);
    const [userAttributes, setUserAttributes] = useState(null);
    const history = useHistory();
    const { user } = useContext(AuthContext);


    const handleFormChange = changedFields => {
        setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    };

    // const handleErrorSignUp = error => {
    //     setErrorMessage(error);
    //     setIsValidating(false);
    // };

    const handleResendCode = () => {

    }

    useEffect(() => {
        (user) ? setUserAttributes(user.attributes) : setUserAttributes(email);
    }, [user, email])

    const handleSubmit = (e, onValidate) => {
        e.preventDefault();
        onValidate(async (err, {code}) => {
            if (!err) {
                setIsValidating(true);
                const data = {username: userAttributes.email, code: parseInt(code)};
                const confirmData = await handleConfirmSignUp(data);
                console.log(confirmData);
                // (signUpError.message) ?  handleErrorSignUp(signUpError.message) : setErrorMessage(null);
            }
        })
    };

    return (
        <main id="registerView">
            <img src={Logo} alt="Starbucks logo" className="starbucks-logo" onClick={() => history.push("/home")} />
            <CustomizedForm {...state.fields} onChange={handleFormChange} isValidating={isValidating} onSubmit={handleSubmit} />
            <section className="register-decoration-side">
                <span>Sign Up</span>
                {/* <span><small>Easy and fast</small></span> */}
                <img src={CloneStarGif} alt="Star clonning itself gif" />
            </section>
            {/* <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre> */}
        </main>
    );
}