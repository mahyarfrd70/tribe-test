import React from 'react';

import type {NextPage} from 'next';

import HTMLHeadWrapper from '@/components/HTMLHeadWrapper';
import Header from '@/layout/Header';

const Home: NextPage = () => {
  return (
    <HTMLHeadWrapper title="Tribe test | Posts" description="Posts' list of community">
      <Header />
    </HTMLHeadWrapper>
  );
};

export default Home;
