import * as Yup from 'yup';

export const Validate = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email !')
    .required('Email is required !'),
  firstname: Yup.string()
    .min(3, 'Must be at least 3 character long !')
    .required('First name is required !'),
  lastname: Yup.string()
    .min(3, 'Must be at least 3 character long !')
    .required('Last name is required !'),
  password: Yup.string()
    .min(5, 'Choose a strong password !')
    .required('Password is required !'),
  cpassword: Yup.string()
    .required('Confirm password is required !')
    .oneOf(
      [Yup.ref('password'), null],
       'Passwords must match',
     )
});
