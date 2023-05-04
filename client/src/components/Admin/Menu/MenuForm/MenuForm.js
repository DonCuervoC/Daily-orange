import React from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import { useFormik } from "formik";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./MenuForm.form";

const menuController = new Menu();

export function MenuForm(props) {

    const { onClose, onReload, menu } = props;
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                //console.log(formValue);
                const data = {
                    title: formValue.title,
                    path: `${formValue.protocol}${formValue.path}`,
                    order: formValue.order,
                    active: formValue.active,
                };
                // console.log(data);
                if (menu) {
                    console.log("UPDATE MENU");
                } else {
                    await menuController.createMenu(accessToken, data);
                }
                onReload();
                onClose();
            } catch (error) {
                console.log(error);
                console.error(error);
            }
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>

            <Form.Group widths="equal">
                <Form.Input name="title" placeholder="Title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title} />

                <Form.Input name="order" type="number" placeholder="Order"
                    onChange={formik.handleChange}
                    value={formik.values.order}
                    error={formik.errors.order} />
            </Form.Group>

            <Input name="path" placeholder="URL" fluid
                onChange={formik.handleChange}
                value={formik.values.path}
                error={formik.errors.path}

                label={!menu ? (
                    <Dropdown
                        options={options}
                        onChange={(_, data) =>
                            formik.setFieldValue("protocol", data.value)
                        }
                        value={formik.values.protocol}
                        error={formik.errors.protocol}
                    />
                ) : null}
            />

            <Form.Group />

            <Form.Button type='submit' primary fluid loading={formik.isSubmitting} >
                {menu ? "Update menu" : "Create menu"}
            </Form.Button>
        </Form>
    );
}


const options = [
    { key: "https://", text: "https://", value: "https://" },
    { key: "http://", text: "http://", value: "http://" },
    { key: "/", text: "/", value: "/" },
]