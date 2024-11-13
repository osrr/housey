import { FaMicrophone, FaSearch } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';
import Action from '../action';
import { TbBuildingSkyscraper } from 'react-icons/tb';
import { PiFarm } from 'react-icons/pi';
import { MdApartment } from 'react-icons/md';

const NavSearch = () => {
  return (
    <div className='flex flex-col gap-[10px]'>
      <h1 className='text-xl font-semibold'>Hi, There!</h1>
      <div className='bg-gray-200  rounded-[5px] h-[32px] flex items-center py-1.5 px-4'>
        <FaSearch className='text-zinc-400' />
        <input
          type='text'
          placeholder='Search'
          className='bg-transparent w-full px-4 border-none outline-none'
        />
        <FaMicrophone className='text-zinc-400' />
      </div>
      <div className='flex items-center gap-[12px] my-[20px]'>
        <Action label='House' icon={FaHouse} active />
        <Action label='Apartment' icon={MdApartment} />
        <Action label='Farmhouse' icon={PiFarm} />
        <Action label='Skyscraper' icon={TbBuildingSkyscraper} />
      </div>
    </div>
  );
};

export default NavSearch;
