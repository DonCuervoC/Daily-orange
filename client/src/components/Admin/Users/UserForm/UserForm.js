import React from 'react';
import { Form } from 'semantic-ui-react';
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./UserForm.form";
import "./UserForm.scss";

export function UserForm(props) {
    const { close, onReload, user } = props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                console.log(formValue);
            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <Form className='user-form' onSubmit={formik.handleSubmit} >
            <div className='user-form__avatar'>
                <span>AVATAR</span>
            </div>

            <Form.Group widths="equal">
                <Form.Input name="firstname" placeholder="First Name"
                    onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname} />
                <Form.Input name="lastname" placeholder="Last Name"
                    onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname} />
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Input name="email" placeholder="E-mail"
                    onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
                <Form.Dropdown placeholder='Select a role'
                    options={roleOptions}
                    selection
                    onChange={(__, data) => formik.setFieldValue("role", data.value)}
                    value={formik.values.role}
                    error={formik.errors.role}
                />
            </Form.Group>

            <Form.Input type='password' name="password" placeholder="Password"
                onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} />

            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {user ? "Update user" : "Create user"}
            </Form.Button>

        </Form>
    );
}

const roleOptions = [
    {
        key: "user",
        text: "User",
        value: "user",
    },
    {
        key: "admin",
        text: "Administrator",
        value: "admin",
    },
]