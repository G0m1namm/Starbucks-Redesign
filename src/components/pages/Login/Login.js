import React, { useContext } from 'react'
import { FormDataContext } from "../../../utils/AuthProvider";
import { useForm } from 'react-hook-form';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
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
            remember: Form.createFormField({
                ...props.remember,
                value: props.remember.value,
            }),
        };
    },
    onValuesChange(_, values) {
        // console.table(values);
    },
})(props => {
    const { getFieldDecorator } = props.form;
    return (
        <section className="login-form-container">
            <Form className="login-form">
                <Form.Item label="Email">
                    {getFieldDecorator('email', {
                        rules: [{type: 'email', message: 'The input is not valid E-mail!'},{ required: true, message: 'Please input your email!',  }],
                    })(
                        <Input
                            addonBefore={<Icon type="mail" />}
                            placeholder="example@email.com"
                            hasFeedback
                            autoFocus 
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Password">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            addonBefore={<Icon type="lock"  />}
                            type="password"
                            placeholder="Password"
                            hasFeedback 
                        />,
                    )}
                </Form.Item>
                <Form.Item className="login-form-actions-container">
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
          </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
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
            remember: {
                value: true,
            },
        },
    };

    handleFormChange = changedFields => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    };

    render() {
        const { fields } = this.state;
        return (
            <main id="loginView">
                <CustomizedForm {...fields} onChange={this.handleFormChange} />
                <section className="login-decoration-side">

                </section>
                {/* <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre> */}
            </main>
        );
    }
}