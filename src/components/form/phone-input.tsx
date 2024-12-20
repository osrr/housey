import { ChangeEvent, forwardRef } from 'react';
import MaskInput from './mask-input';
import { cn } from '../../helpers';

interface PhoneInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
  error?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    { error, value, onChange, wrapperClassName, ...rest }: PhoneInputProps,
    ref
  ) => {
    return (
      <div className={cn(`w-full col-span-full`, wrapperClassName)}>
        <h1 className='text-sm font-semibold'>Phone</h1>
        <div className='flex items-center'>
          <div
            className={`border rounded-l-md h-full py-1.5 px-2 bg-gray-200 ${
              error ? 'border-red-500' : ''
            }`}
          >
            <h1>+971</h1>
          </div>
          <MaskInput
            mask='99-999-9999'
            value={value}
            onChange={onChange}
            className={`border-r border-t border-b py-1.5 px-2 w-full rounded-r-md ${
              error ? 'border-red-500' : ''
            }`}
            {...rest}
          />
        </div>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>
    );
  }
);
export default PhoneInput;
