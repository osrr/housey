import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  wrapperClassName?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, wrapperClassName, error, ...props }: InputProps, ref) => {
    return (
      <div
        className={`flex flex-col items-start gap-2 col-span-full ${wrapperClassName}`}
      >
        <label className='text-sm font-semibold'>{label}</label>
        <input
          ref={ref}
          className={`border py-1.5 px-2 rounded-md w-full ${
            error ? 'border-red-500' : ''
          }`}
          {...props}
        />
        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </div>
    );
  }
);

export default Input;
