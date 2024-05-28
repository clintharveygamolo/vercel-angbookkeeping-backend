import * as Yup from 'yup';

export const createUserValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Names have a maximum limit of 50 characters only'),
  password: Yup.string()
    .required('Password is required!')
    .min(8, 'Password must at least be 8 characters')
    .max(64, 'Passwords have a maximum limit of 64 characters only'),
  role: Yup.string()
    .required()
    .oneOf(['Admin', 'Viewer', 'Employee'], 'Invalid Role'),
});

export const editUserValidationSchema = Yup.object({
  name: Yup.string()
    .notRequired()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Names have a maximum limit of 50 characters only'),
  // password: Yup.string().notRequired().min(8).max(64),
  password: Yup.string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Passwords have a maximum limit of 64 characters only'),
  role: Yup.string()
    .notRequired()
    .oneOf(['Admin', 'Viewer', 'Employee'], 'Invalid Role'),
});

// export const userCreateValidationSchema = Yup.object({
//   userId: Yup.number()
//     .required('User ID is required!')
//     .max(10, 'User IDs are only 5-10 numbers long'),
//   password: Yup.string()
//     .required('password is required')
//     .min(8, 'Password must be at least 8 characters'),
// });
