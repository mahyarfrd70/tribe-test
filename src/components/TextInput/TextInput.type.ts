import type {ChangeEventHandler} from 'react';

export interface TextInputProps {
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  invalidMessage?: string | false;
  infoText?: string | false;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
