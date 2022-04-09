import {useFormik} from 'formik';
import * as Yup from 'yup';

import type {JoinNetworkInput} from '@tribeplatform/gql-client/types';

import Alert from '@/components/Alert';
import Button from '@/components/Button/Button';
import Container from '@/components/Container';
import HTMLHeadWrapper from '@/components/HTMLHeadWrapper';
import InputWrapper from '@/components/InputWrapper';
import TextInput from '@/components/TextInput';
import {regexPatterns} from '@/constants/regex';
import validationMessages from '@/constants/validationMessages';
import useSignUp from '@/hooks/useSignup';

const SignUp = () => {
  const {signup, isLoading, errorMessage} = useSignUp();
  const {values, handleChange, touched, errors, handleSubmit} = useFormik<JoinNetworkInput>({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Required'),
      name: Yup.string().required('Required'),
      password: Yup.string().matches(regexPatterns.password, validationMessages.password.info).required('Required'),
    }),
    onSubmit: (values) => {
      signup(values);
    },
  });

  return (
    <HTMLHeadWrapper title="Sign Up" description="Create an account">
      <Container className="flex flex-col justify-center max-w-lg px-2 pt-16">
        <h1 className="text-2xl mb-5">Sign Up</h1>
        <Alert>{errorMessage}</Alert>
        <form onSubmit={handleSubmit}>
          <InputWrapper label="Email">
            <TextInput
              name="email"
              placeholder="Enter your email"
              value={values.email}
              invalidMessage={touched.password && errors.email}
              onChange={handleChange}
            />
          </InputWrapper>
          <InputWrapper label="Name">
            <TextInput
              name="name"
              placeholder="Enter your name"
              value={values.name}
              invalidMessage={touched.password && errors.name}
              onChange={handleChange}
            />
          </InputWrapper>
          <InputWrapper label="Password">
            <TextInput
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              invalidMessage={touched.password && errors.password}
              infoText={!touched.password && validationMessages.password.info}
              onChange={handleChange}
            />
          </InputWrapper>
          <Button isLoading={isLoading} className="mt-3">
            Sign Up
          </Button>
        </form>
      </Container>
    </HTMLHeadWrapper>
  );
};

export default SignUp;
