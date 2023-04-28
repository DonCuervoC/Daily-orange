import * as Yup from "yup";

export function initialValues() {

    return {
        email: "",
        password: "",
    };
}

export function validationSchema() {

    return Yup.object({
        email: Yup.string().email("Email not valid").required("Please enter your email"),
        password: Yup.string().required("Password not valid").required("please enter your password"),
    });
}