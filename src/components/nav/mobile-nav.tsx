import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenu } from 'react-icons/hi';
import MobileNavLink from './mobile-nav-link';
import { linkType } from './navbar';
import { IoClose } from 'react-icons/io5';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../../hooks/use-auth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

const MobileNav = ({ links }: { links: linkType[] }) => {
  const { currentUser, isAuthorized } = useAuth();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    signOut(auth);
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} className=''>
        <HiMenu className='w-7 h-7' />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            exit={{ x: -1000 }}
            transition={{ ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 }}
            className='bg-white shadow-xl h-[100vh] w-[400px] fixed top-0 left-0 translate-x-[-100%] will-change-transform z-40'
          >
            <button onClick={() => setOpen(false)}>
              <IoClose className='w-8 h-8 absolute top-[15px] right-[10px]' />
            </button>
            <motion.div
              initial='hidden'
              animate='visible'
              exit='hidden'
              variants={{
                visible: {
                  transition: {
                    delayChildren: 0.45,
                    staggerChildren: 0.2,
                  },
                },
                hidden: {},
              }}
              className='pt-[100px] pl-[100px] flex flex-col gap-[20px]'
            >
              {links.map((link) => {
                return (
                  <MobileNavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </MobileNavLink>
                );
              })}
            </motion.div>
            {/* user */}
            <motion.div className='absolute bottom-20 left-24 flex items-center gap-4 cursor-pointer'>
              {isAuthorized ? (
                <>
                  <div className='w-10 h-10 p-2 flex items-center justify-center border rounded-full'>
                    <FaUser />
                  </div>
                  <Link
                    to={`profile/${currentUser.id}`}
                    className='text-lg font-bold'
                  >
                    {currentUser.username}
                  </Link>
                  <button onClick={handleClick}>
                    <FaSignOutAlt className='w-5 h-5 text-red-500' />
                  </button>
                </>
              ) : (
                <div className='w-full'>
                  <Link
                    to={'/auth/sign'}
                    className='w-full bg-primary rounded-md py-2 px-4 text-white border border-primary hover:text-primary hover:bg-transparent transition duration-300'
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
