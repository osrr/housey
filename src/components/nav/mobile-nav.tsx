import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenu } from 'react-icons/hi';
import MobileNavLink from './mobile-nav-link';
import { linkType } from './navbar';
import { IoClose } from 'react-icons/io5';

const MobileNav = ({ links }: { links: linkType[] }) => {
  const [open, setOpen] = useState(false);

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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
