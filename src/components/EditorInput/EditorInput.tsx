import 'suneditor/dist/css/suneditor.min.css';

import {memo, useCallback} from 'react';

import dynamic from 'next/dynamic';

import {EditorInputProps} from './EditorInput.type';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const EditorInput = ({value, name, onChange}: EditorInputProps) => {
  const handleChange = useCallback((content: string) => {
    onChange({target: {value: content, name}});
  }, []);

  return <SunEditor defaultValue={value} onChange={handleChange} />;
};
export default memo(EditorInput);
