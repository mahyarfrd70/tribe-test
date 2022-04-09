import clsx from 'clsx';

import React, {memo} from 'react';

import type {TextInputProps} from '.';
import If from '../If';

const TextInput = ({
  name,
  value,
  placeholder = '',
  type = 'text',
  invalidMessage,
  infoText,
  onChange,
}: TextInputProps) => {
  return (
    <>
      <input
        data-testid={name}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        className={clsx('input input-bordered mb-1 w-full', {'input-error': invalidMessage})}
        onChange={onChange}
      />
      <If condition={Boolean(!invalidMessage && infoText)}>
        <div data-testid={`${name}-info-text`} className="text-sm bg-blue-100 text-blue-700 px-4 py-3">
          {infoText}
        </div>
      </If>
      <If condition={Boolean(invalidMessage)}>
        <div data-testid={`${name}-invalid-text`} className="text-error text-sm">
          {invalidMessage}
        </div>
      </If>
    </>
  );
};

export default memo(TextInput);
