import { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { IconType } from 'react-icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  iconClassName?: string;
  primary?: boolean;
  outline?: boolean;
  hideLabel?: boolean;
  icon?: IconType;
  sm?: boolean;
  xs?: boolean;
}

const Button = ({
  children,
  className,
  iconClassName,
  primary,
  outline,
  hideLabel,
  icon: Icon,
  sm,
  xs,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(
        `relative w-full col-span-full border font-semibold rounded-md py-1.5 px-2 transition duration-200
        `,
        className,
        {
          'bg-primary border-primary text-white hover:bg-transparent hover:text-primary':
            primary && !outline,
          'bg-transparent border-primary text-primary hover:bg-primary hover:text-white':
            outline && primary,
          'flex items-center justify-center': hideLabel && Icon,
          'text-sm font-medium': sm && !xs,
          'text-xs font-normal': xs,
        }
      )}
      {...rest}
    >
      {Icon && (
        <Icon
          className={cn(iconClassName, {
            'absolute left-[10px] top-[50%] translate-y-[-50%]': !hideLabel,
          })}
        />
      )}
      {!hideLabel && <>{children}</>}
    </button>
  );
};

// Button.propTypes = {
//   checkVariationValue: ({ primary }) => {
//     const count = Number(!!primary);
//   },
// };

export default Button;
