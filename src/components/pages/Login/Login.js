import React, { useContext } from 'react'
import { FormDataContext } from "../../../utils/AuthProvider";
import { useForm } from 'react-hook-form';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import "./Login.scss";

export function Login() {
    const {register, handleSubmit} = useForm();
    const updateFormData = useContext(FormDataContext);
    
    return (
        <Form onSubmit={handleSubmit(updateFormData)} className="login-form">
            <input type="email" placeholder="email" name="email" ref={register}/>
            <input type="password" placeholder="pass" name="email" ref={register}/>
            <button className="btn btn-primary">Submit</button>
        </Form>
    );
}
