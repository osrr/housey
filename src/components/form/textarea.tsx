import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, ...rest }: TextareaProps, ref) => {
    return (
      <div className='col-span-full'>
        <label className='text-sm font-semibold'>Description</label>
        <textarea
          ref={ref}
          className={`border rounded-md w-full py-1.5 px-2 ${
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
