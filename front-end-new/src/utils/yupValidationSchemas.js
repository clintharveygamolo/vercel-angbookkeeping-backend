import * as Yup from 'yup';

export const loginValidation = Yup.object({
  userId: Yup.number().required().max(10),
  password: Yup.string().required().min(8),
});
