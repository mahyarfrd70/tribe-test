import {useFormik} from 'formik';
import * as Yup from 'yup';

import {useEffect} from 'react';

import {useRouter} from 'next/router';

import Alert from '@/components/Alert';
import Button from '@/components/Button/Button';
import Container from '@/components/Container';
import HTMLHeadWrapper from '@/components/HTMLHeadWrapper';
import If from '@/components/If';
import InputWrapper from '@/components/InputWrapper';
import Spinner from '@/components/Spinner';
import TextInput from '@/components/TextInput';
import {regexPatterns} from '@/constants/regex';
import validationMessages from '@/constants/validationMessages';
import useAuth from '@/hooks/useAuth';
import useSignIn from '@/hooks/useSignin';
import type {LoginValues} from '@/hooks/useSignin';

const SignIn = () => {
  const router = useRouter();
  const {isLoggedIn, isFetching} = useAuth();

  const {signin, isLoading, errorMessage} = useSignIn();
  const {values, handleChange, touched, errors, handleSubmit} = useFormik<LoginValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Required'),
      password: Yup.string().matches(regexPatterns.password, validationMessages.password.info).required('Required'),
    }),
    onSubmit: (values) => {
      signin(values);
    },
  });

  useEffect(() => {
    if (isLoggedIn) router.replace('/');
  }, [isLoggedIn]);

  return (
    <HTMLHeadWrapper title="Sign In" description="Login to your account">
      <Container className="flex flex-col justify-center max-w-lg px-2 pt-16 ">
        <If condition={isFetching}>
          <Spinner />
        </If>
        <If condition={!isFetching}>
          <h1 className="text-2xl mb-5">Sign In</h1>
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
              Sign In
            </Button>
          </form>
        </If>
      </Container>
    </HTMLHeadWrapper>
  );
};

export default SignIn;
