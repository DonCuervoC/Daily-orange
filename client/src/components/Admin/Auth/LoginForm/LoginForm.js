import React from 'react';
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./LoginForm.form";

const authController = new Auth();

export function LoginForm() {

    const { login } = useAuth();

    const formik = useFormik({

        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                //  console.log(formValue);
                const response = await authController.login(formValue);
                console.log(response);
                // console.log(response.access);
                authController.setAccessToken(response.access);
                //console.log(response.refresh);
                authController.setRefreshToken(response.refresh);

                login(response.access);
                //console.log(login);
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
