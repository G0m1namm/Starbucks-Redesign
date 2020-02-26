import React, { useContext } from 'react'
import { FormDataContext } from "../../../utils/AuthProvider";
import { useForm } from 'react-hook-form';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import "./Login.scss";

export function Login() {
    const { register, handleSubmit } = useForm();
    const updateFormData = useContext(FormDataContext);

    return (
        <Form onSubmit={handleSubmit(updateFormData)} className="login-form">
            <input type="email" placeholder="email" name="email" ref={register} />
            <input type="password" placeholder="pass" name="email" ref={register} />
            <button className="btn btn-primary">Submit</button>
        </Form>
    );
}

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
            // remember: Form.createFormField({
            //     ...props.remember,
            //     value: props.remember.value,
            // }),
        };
    },
    onValuesChange(_, values) {
        // console.table(values);
    },
})(props => {
    const { getFieldDecorator, validateFields } = props.form;
    return (
        <section className="login-form-container">
            <Form className="login-form" onSubmit={(e) => props.onSubmit(e, validateFields)}>
                <Form.Item label="Email" colon={false} hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Please input your email!', }],
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
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            addonBefore={<Icon type="lock" />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Row gutter={12} type="flex">
                        <Col span={12}>
                            <Button block type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Col>
                        <Col span={12}>
                            <a className="login-form-forgot green" href="">
                                Forgot password
                            </a>
                        </Col>
                    </Row>
                </Form.Item>
                <div className="login-form-actions-container">
                    <span>Already have an account? <a href="" className="green">Join Now!!</a></span>
                </div>
            </Form>
        </section>
    );
});

export class Demo extends React.Component {
    state = {
        fields: {
            email: {
                value: '',
            },
            password: {
                value: '',
            },
            // remember: {
            //     value: true,
            // },
        },
    };

    handleFormChange = changedFields => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    };

    handleSubmit = (e, onValidate) => {
        e.preventDefault();
        onValidate((err, values) => {
            if (!err) {
                console.table(values)
            }
        })
    };

    render() {
        const { fields } = this.state;
        return (
            <main id="loginView">
                <CustomizedForm {...fields} onChange={this.handleFormChange} onSubmit={this.handleSubmit} />
                <section className="login-decoration-side">

                </section>
                {/* <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre> */}
            </main>
        );
    }
}