import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    userId: Yup.number().required("User ID is required!"),
    password: Yup.string().required("Password is required!"),
});