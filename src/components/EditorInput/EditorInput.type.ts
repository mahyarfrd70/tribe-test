export interface EditorInputProps {
  value: string;
  name: string;
  onChange: (e: {target: {value: string; name: string}}) => void;
}
