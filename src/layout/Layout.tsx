import React, {PropsWithChildren} from 'react';

import Header from './Header';

const Layout = ({children}: PropsWithChildren<Record<string, unknown>>) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
