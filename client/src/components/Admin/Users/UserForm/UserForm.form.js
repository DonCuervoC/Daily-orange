import * as Yup from "yup";

export function initialValues(){

    return{
        avatar:"",
        fileAvatar:null,
        firstName:"",
        lastName:"",
        email:"",
        role:"",
        password:"",
    };
}

export function validationSchema(){

    return Yup.object({

        firstName: Yup.string().required(true),
        lastName: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        role: Yup.string().required(true),
        password: Yup.string().required(true),
    });
}