import { IconType } from 'react-icons';

interface ActionProps {
  label: string;
  icon: IconType;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  active?: boolean;
}

const Action = ({ label, icon: Icon, onClick, active }: ActionProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center gap-2 border-[1px] rounded-md py-4 px-1 w-fit min-w-[80px] cursor-pointer group ${
        active && 'shadow-md'
      } hover:shadow-md transition duration-200`}
    >
      <Icon
        className={`w-5 h-5 ${
          active && 'text-primary'
        } group-hover:text-primary transition duration-200`}
      />
      <h1
        className={`font-semibold text-sm ${
          active && 'text-primary'
        } group-hover:text-primary transition duration-200`}
      >
        {label}
      </h1>
    </div>
  );
};

export default Action;
