import React, {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import type { IconType } from 'react-icons';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import { DropdownMenuProvider } from '../context/dropdown-context';
import { useDropdown } from '../hooks/use-dropdown';

export const DropdownLabel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='font-bold border-b w-full text-start py-1.5 px-2 text-black'>
      {children}
    </div>
  );
};

interface DropdownActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: IconType | null;
}

export const DropdownAction = ({
  children,
  className,
  icon: Icon,
  onClick,
  ...props
}: DropdownActionProps) => {
  const { setOpen } = useDropdown();

  return (
    <button
      className={`py-1.5 px-2 w-full rounded flex items-center justify-start text-sm font-semibold bg-white hover:bg-black/10 transition duration-200 ${
        className && className
      }`}
      onClick={(e) => {
        onClick(e);
        setOpen(false);
      }}
      {...props}
    >
      {Icon && <Icon size={16} className='mr-2' />}
      {children}
    </button>
  );
};

export const DropdownSeparator = () => {
  return <div className='border-b my-1.5 w-full' />;
};

export const DropdownShelf = ({ children }: { children: ReactNode }) => {
  return (
    <div className='py-1.5 px-2 w-full flex flex-col items-start'>
      {children}
    </div>
  );
};

interface DropdownMenuProps {
  children: ReactNode;
  trigger: ReactNode;
  showChevron?: boolean;
  className?: string;
}

const DropdownMenuWrapped = ({
  children,
  trigger,
  showChevron,
  className,
}: DropdownMenuProps) => {
  const { open, setOpen } = useDropdown();
  const divEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (divEl.current && !divEl.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [setOpen]);

  let chevron;
  if (showChevron) {
    chevron = open ? (
      <GoChevronDown className='mr-2' />
    ) : (
      <GoChevronLeft className='mr-2' />
    );
  }

  return (
    <div className='relative' ref={divEl}>
      <div
        onClick={() => setOpen(!open)}
        className='flex items-center justify-start'
      >
        {trigger}
        {chevron}
      </div>
      {open && (
        <div
          className={`absolute top-full border shadow bg-white rounded w-48 flex flex-col items-start z-30 ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownMenu = ({
  children,
  trigger,
  showChevron,
  className,
}: DropdownMenuProps) => {
  return (
    <DropdownMenuProvider>
      <DropdownMenuWrapped
        trigger={trigger}
        showChevron={showChevron}
        className={className}
      >
        {children}
      </DropdownMenuWrapped>
    </DropdownMenuProvider>
  );
};
