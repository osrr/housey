import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '../../helpers';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string | number }[];
  wrapperClassName?: string;
  className?: string;
  error?: string;
  sm?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      className,
      wrapperClassName,
      error,
      sm,
      ...rest
    }: SelectProps,
    ref
  ) => {
    return (
      <div
        className={cn(
          'col-span-full w-full flex flex-col items-start gap-2',
          wrapperClassName
        )}
      >
        {label && <h1 className='text-sm font-semibold'>{label}</h1>}
        <select
          ref={ref}
          className={cn(
            `border rounded-md w-full py-1.5 px-2 ${
              error ? 'border-red-500' : ''
            }`,
            className,
            {
              'p-1 text-xs font-semibold': sm,
            }
          )}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </div>
    );
  }
);

export default Select;
