import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './LoginForm.form';
import { Auth } from '../../../../api';

const authController = new Auth();


export function LoginForm() {

    const [error, setError] = useState("");

    const formik = useFormik({

        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {

            try {
                setError("");
                //  console.log(formValue);
                const response = await authController.login(formValue);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Input name="email" placeholder="Email" onChange={formik.handleChange}
                    value={formik.values.email} error={formik.errors.email}
                />
                <Form.Input name="password" type="password" placeholder="Password" onChange={formik.handleChange}
                    value={formik.values.password} error={formik.errors.password}
                />
                <Form.Button type='submit' primary fluid loading={formik.isSubmitting} >
                    Login
                </Form.Button>
            </Form>
        </div>
    )
}
