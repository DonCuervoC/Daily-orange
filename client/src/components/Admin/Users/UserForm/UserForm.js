import React, { useCallback } from 'react';
import { Form, Image } from 'semantic-ui-react';
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { Images } from "../../../../assets";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils"
import { initialValues, validationSchema } from "./UserForm.form";
import "./UserForm.scss";

const userController = new User();

export function UserForm(props) {
    const { close, onReload, user } = props;
    //console.log(useAuth());
    //console.log(user);
    const { accessToken } = useAuth();
    //console.log("Access Token : " , accessToken);

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(user),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                //console.log(formValue);
                if (!user) {
                    await userController.createUser(accessToken, formValue);
                } else {
                    // console.log("UPDATE");
                    // console.log(formValue);
                    await userController.updateUser(accessToken, user._id,formValue);
                }
                onReload();
                close();
            } catch (error) {
                console.error(error);
            }
        }
    });

    const onDrop = useCallback((acceptedFiles) => {
        // console.log(acceptedFiles);
        const file = acceptedFiles[0];
        formik.setFieldValue("avatar", URL.createObjectURL(file));
        formik.setFieldValue("fileAvatar", file);

    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png  ",
        onDrop,
    });

    const getAvatar = () => {
        if (formik.values.fileAvatar) {
            return formik.values.avatar;
        } else if (formik.values.avatar) {
            return `${ENV.BASE_PATH}/${formik.values.avatar}`;
        }
        return Images.alienAvatar;
    };

    return (
        <Form className='user-form' onSubmit={formik.handleSubmit} >
            <div className='user-form__avatar' {...getRootProps()}>
                <input {...getInputProps()} />
                <Image avatar size="small" src={getAvatar()} />
                {/* <span>AVATAR</span> */}
            </div>

            <Form.Group widths="equal">
                <Form.Input name="firstName" placeholder="First Name"
                    onChange={formik.handleChange} value={formik.values.firstName} error={formik.errors.firstName} />
                <Form.Input name="lastName" placeholder="Last Name"
                    onChange={formik.handleChange} value={formik.values.lastName} error={formik.errors.lastName} />
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