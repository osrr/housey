import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../helpers';

interface ModalProps {
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ className, onClose, children }: ModalProps) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div onClick={onClose} className='fixed inset-0 bg-zinc-800/80'></div>
      <div
        className={cn(
          'fixed inset-x-[600px] inset-y-40 p-10 bg-white rounded-md',
          className
        )}
      >
        <div className='flex flex-col justify-between h-full'>
          {children}
          <div className='flex justify-end'></div>
        </div>
      </div>
    </div>,
    document.querySelector('.modal-container')!
  );
};

export default Modal;
