import { IconType } from 'react-icons';
import cn from 'classnames';

interface ActionProps {
  label: string;
  icon: IconType;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  active?: boolean;
  className?: string;
  labelClassName?: string;
  iconClassName?: string;
}

const Action = ({
  label,
  icon: Icon,
  onClick,
  active,
  className,
  iconClassName,
  labelClassName,
}: ActionProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        `flex flex-col items-center gap-2 border-[1px] rounded-md py-4 px-1 w-fit min-w-[80px] group cursor-pointer hover:text-primary ${
          active && 'shadow-md'
        } hover:shadow-md transition duration-200`,
        className
      )}
    >
      <Icon className={cn(`w-5 h-5 `, iconClassName)} />
      <h1 className={cn(`font-semibold text-sm`, labelClassName)}>{label}</h1>
    </div>
  );
};

export default Action;
