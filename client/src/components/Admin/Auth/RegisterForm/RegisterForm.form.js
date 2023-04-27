import * as Yup from "yup";

export function initialValues() {

    return {
        email: "",
        password: "",
        confirmtPassword: "",
        conditionsAccepted: false,
    };
}

export function validationSchema(){

    return Yup.object({
        email: Yup.string().email("Email not valid").required("Email is an obligatory field"),
        password: Yup.string().required("Password is an obligatory field"),
        confirmtPassword: Yup.string().required("Password is an obligatory field").oneOf([Yup.ref("password")], "Passwords must match"),
        conditionsAccepted: Yup.bool().isTrue(true),
    });
}