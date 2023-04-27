import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { Auth } from '../../../../api';
import { initialValues, validationSchema } from "./RegisterForm.form";
import "./RegisterForm.scss";


const authController = new Auth();

export function RegisterForm(props) {

    const {openLogin} = props;
    const [error, setError] = useState("");

    const formik = useFormik({

        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,

        onSubmit: async (formValue) => {
            try {
                setError("");
                console.log(formValue);
                await authController.register(formValue);
                openLogin();

            } catch (error) {
                console.log(error);
                setError("Error on server");
            }
        },
    });

    return (
        <div>
            <Form className='register-form' onSubmit={formik.handleSubmit} >
                <Form.Input name="email" placeholder="E-mail"
                    onChange={formik.handleChange} value={formik.values.email}
                    error={formik.errors.email}
                />
                <Form.Input name="password" type='password' placeholder="Password"
                    onChange={formik.handleChange} value={formik.values.password}
                    error={formik.errors.password}
                />
                <Form.Input name="confirmtPassword" type='password' placeholder="Confirm Password"
                    onChange={formik.handleChange} value={formik.values.confirmtPassword}
                    error={formik.errors.confirmtPassword}
                />
                <Form.Checkbox name="conditionsAccepted" label="I have read and accept the privacy policy"
                    onChange={(_, data) => formik.setFieldValue("conditionsAccepted", data.checked)}
                    checked={formik.values.conditionsAccepted}
                    error={formik.errors.conditionsAccepted}
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
