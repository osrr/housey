import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  wrapperClassName?: string;
}

const Input = ({ label, wrapperClassName, ...props }: InputProps) => {
  return (
    <div
      className={`flex flex-col items-start gap-2 col-span-full ${wrapperClassName}`}
    >
      <label className='text-sm font-semibold'>{label}</label>
      <input className='border py-1.5 px-2 rounded-md w-full' {...props} />
    </div>
  );
};

export default Input;
