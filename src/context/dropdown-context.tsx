import { createContext, useState } from 'react';

interface DropdownMenuContextProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const DropdownMenuContext =
  createContext<DropdownMenuContextProps | null>(null);

export const DropdownMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownMenuContext.Provider>
  );
};
