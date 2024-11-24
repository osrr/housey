import { useContext } from 'react';
import { DropdownMenuContext } from '../context/dropdown-context';

export const useDropdown = () => {
  const context = useContext(DropdownMenuContext);

  if (context === null) {
    throw new Error('Dropdown provider was not used!');
  }

  return context;
};
