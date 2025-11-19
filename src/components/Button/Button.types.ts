export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonClassName?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
