import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const MobileNavLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          filter: 'blur(10px)',
          transform: 'scale(0.5)',
        },
        visible: {
          opacity: 1,
          filter: 'blur(0px)',
          transform: 'scale(1)',
          transition: { duration: 0.2 },
        },
      }}
    >
      <Link className='text-3xl font-bold p-[10px]' to={to} onClick={onClick}>
        {children}
      </Link>
    </motion.div>
  );
};

export default MobileNavLink;
