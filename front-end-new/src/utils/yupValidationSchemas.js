import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  userId: Yup.number().required('User ID is required!').max(10),
  password: Yup.string().required('Password is required!').min(8),
});

// export const userCreateValidationSchema = Yup.object({
//   userId: Yup.number()
//     .required('User ID is required!')
//     .max(10, 'User IDs are only 5-10 numbers long'),
//   password: Yup.string()
//     .required('password is required')
//     .min(8, 'Password must be at least 8 characters'),
// });
