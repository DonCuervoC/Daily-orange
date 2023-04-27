import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues } from "./RegisterForm.form";
import "./RegisterForm.scss";


export function RegisterForm() {

    const [error, setError] = useState("");

    const formik = useFormik({

        initialValues: initialValues(),
        onSubmit: async (formValue) => {
            try {
                console.log(formValue);
            } catch (error) {
                console.log(error);
            }

        }
    })

    return (
        <div>
            <Form className='register-form' onSubmit={formik.handleSubmit} >
                <Form.Input name="email" placeholder="E-mail"
                    onChange={formik.handleChange} value={formik.values.email}
                />
                <Form.Input name="password" type='password' placeholder="Password"
                    onChange={formik.handleChange} value={formik.values.password}
                />
                <Form.Input name="confirmtPassword" type='password' placeholder="Confirm Password"
                    onChange={formik.handleChange} value={formik.values.confirmtPassword}
                />
                <Form.Checkbox name="conditionsAccepted" label="I have read and accept the privacy policy"
                    onChange={(_, data) => formik.setFieldValue("conditionsAccepted", data.checked)}
                    checked={formik.values.conditionsAccepted}
                />
                <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                    Create Account
                </Form.Button>
                {/* <p className='register-form__error'>An error has occurred</p> */}
                <p className='register-form__error'>{error}</p>
            </Form>
        </div>
    )
}
