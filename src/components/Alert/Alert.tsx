import clsx from 'clsx';

import React from 'react';
import type {PropsWithChildren} from 'react';

import type {AlertProps} from '.';
import If from '../If';

const Alert = ({alertType = 'alert-error', children}: PropsWithChildren<AlertProps>) => {
  return (
    <If condition={Boolean(children)}>
      <div data-testid="alert" className={clsx('alert shadow-lg', alertType)}>
        {children}
      </div>
    </If>
  );
};

export default Alert;
