import { useState } from 'react';
import { UploadedFile } from '../../types';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';
import { FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface SlideShowProps {
  slides: UploadedFile[];
}

const SlideShow = ({ slides }: SlideShowProps) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, slides.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <>
      <AnimatePresence>
        <motion.img
          key={page}
          src={slides[imageIndex]?.url}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className='absolute h-[100%] w-full rounded-md translate-x-[-50%]'
        />
      </AnimatePresence>
      <div
        className='absolute top-[50%] left-[10px] translate-y-[-50%] p-2 bg-white rounded-full border cursor-pointer z-20'
        onClick={() => paginate(-1)}
      >
        <FaChevronLeft />
      </div>
      <div
        className='absolute top-[50%] right-[10px] translate-y-[-50%] p-2 bg-white rounded-full border cursor-pointer z-20'
        onClick={() => paginate(1)}
      >
        <FaChevronRight />
      </div>
      <div className='absolute bg-white rounded-md flex items-center gap-2 z-20 px-2 py-1.5 border bottom-[10px] right-[10px] text-gray-500'>
        <FaImage />
        <p className='text-sm font-semibold'>{slides.length}</p>
      </div>
    </>
  );
};

export default SlideShow;
