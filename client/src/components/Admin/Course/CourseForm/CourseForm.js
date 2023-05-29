import React, { useCallback } from 'react';
import { Form, Image } from 'semantic-ui-react';
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { Course} from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./CourseForm.form";
import "./CourseForm.scss";

const courseController = new Course();

export function CourseForm(props) {
    const {onClose, onReload} = props;

    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {

            try {
                // console.log(formValue);
                await courseController.createCourse(accessToken, formValue);
                //refresh course list
                onReload();
                //Close modal
                onClose();

            } catch (error) {
                console.error(error);
            }
        }
    })

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        //console.log(file);
        //upload image on web temporary url
        formik.setFieldValue("miniature", URL.createObjectURL(file));
        //upload image on server
        formik.setFieldValue("file", file);
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
    });

    const getMiniature = () => {

        if(formik.values.file){
            // upload manually
            return formik.values.miniature;
            // from server
        } /*else if (formik.values.miniature){
            return "";
        }*/
        return null;
    };

    return (
        <Form className='course-form' onSubmit={formik.handleSubmit}>
            <div className='course-form__miniature' {...getRootProps()}>
                <input {...getInputProps()} />
                {getMiniature() ? (
                    <Image size='small' src={getMiniature()} />
                ) : (
                    <div>
                        <span>Drag your miniature</span>
                    </div>
                )}
            </div>
            <Form.Input name="title" placeholder="Course name"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.errors.title}
            />
            <Form.Input name="url" placeholder="Course url"
                onChange={formik.handleChange}
                value={formik.values.url}
                error={formik.errors.url}
            />
            <Form.TextArea name="description" placeholder="Short course description"
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.errors.description}
            />

            <Form.Group widths="equal" >
                <Form.Input type='number' name='price' placeholder='Course price'
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    error={formik.errors.price}
                />
                <Form.Input type='number' name='score' placeholder='Course score'
                    onChange={formik.handleChange}
                    value={formik.values.score}
                    error={formik.errors.score}
                />
            </Form.Group>

            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                Create course
            </Form.Button>

        </Form>
    )
}
