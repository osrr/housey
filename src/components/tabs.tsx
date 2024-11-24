import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Tab<T> {
  label: string;
  value: T;
}

interface TabsProps<T> {
  tabs: Tab<T>[];
}

const Tabs = <T,>({ tabs }: TabsProps<T>) => {
  const [selectedTab, setSelectedTab] = useState<Tab<T>>(tabs[0]);

  return (
    <div className='w-full'>
      <div className='bg-gray-200 p-1 rounded-md border'>
        <ul className='flex items-center justify-between w-full h-[24px]'>
          {tabs.map((item) => (
            <li
              key={item.label}
              className={`relative w-full text-center h-full cursor-pointer ${
                item === tabs[0] ? '' : 'border-l border-gray-300'
              }`}
              onClick={() => setSelectedTab(item)}
            >
              {item === selectedTab ? (
                <p className='absolute w-full top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-20'>
                  {item.label}
                </p>
              ) : (
                <p>{item.label}</p>
              )}
              {item === selectedTab && (
                <motion.div
                  className='absolute w-[90%] mx-auto h-full top-0 bottom-0 left-0 right-0 bg-white rounded-md z-10'
                  layoutId='underline'
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <main>
        <AnimatePresence mode='wait'>
          <motion.div
            key={selectedTab ? selectedTab.label : 'empty'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='w-full mt-3 min-h-[200px]'
          >
            {selectedTab ? `${selectedTab.value}` : <></>}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Tabs;
