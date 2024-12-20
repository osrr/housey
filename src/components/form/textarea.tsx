import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  className?: string;
  wrapperClassName?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, className, wrapperClassName, error, ...rest }: TextareaProps,
    ref
  ) => {
    return (
      <div className={`col-span-full ${wrapperClassName}`}>
        <label className='text-sm font-semibold'>{label}</label>
        <textarea
          ref={ref}
          className={`border rounded-md w-full py-1.5 px-2 ${className} ${
            error ? 'border-red-500' : ''
          }`}
          {...rest}
        />
        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </div>
    );
  }
);

export default Textarea;
