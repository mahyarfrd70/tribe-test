import {useFormik} from 'formik';
import * as Yup from 'yup';

import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

import Container from '@/components/Container';
import EditorInput from '@/components/EditorInput';
import HTMLHeadWrapper from '@/components/HTMLHeadWrapper';
import If from '@/components/If';
import Spinner from '@/components/Spinner';
import errorMessages from '@/constants/errorMessages';
import useAddPost from '@/hooks/useAddPost';
import useAuth from '@/hooks/useAuth';

const Alert = dynamic(() => import('@/components/Alert'));
const InputWrapper = dynamic(() => import('@/components/InputWrapper'));
const TextInput = dynamic(() => import('@/components/TextInput'));
const Button = dynamic(() => import('@/components/Button'));

const AddPost = () => {
  const router = useRouter();
  const {isLoggedIn, isFetching} = useAuth();
  const {addPost, isLoading, isError} = useAddPost();

  const {values, handleChange, touched, errors, handleSubmit} = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      body: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      if (!isLoggedIn) router.replace('/signin');
      else await addPost(values);
    },
  });

  return (
    <HTMLHeadWrapper title="Tribe test | Add Post" description="Add your own Post">
      <Container className="flex flex-col justify-center max-w-lg px-2 pt-16 ">
        <If condition={isFetching}>
          <Spinner />
        </If>
        <If condition={!isFetching}>
          <h1 className="text-2xl mb-5">Add Post</h1>
          <Alert>{isError && errorMessages.default}</Alert>
          <form onSubmit={handleSubmit}>
            <InputWrapper label="Title">
              <TextInput
                name="title"
                placeholder="Enter Title"
                value={values.title}
                invalidMessage={touched.title && errors.title}
                onChange={handleChange}
              />
            </InputWrapper>
            <InputWrapper label="Body">
              <EditorInput name="body" value={values.body} onChange={handleChange} />
            </InputWrapper>
            <Button isLoading={isLoading} className="mt-3">
              Submit
            </Button>
          </form>
        </If>
      </Container>
    </HTMLHeadWrapper>
  );
};

export default AddPost;
