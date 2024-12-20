import propertyImage from '../../public/hero-image.jpg';
import { MdLocationPin } from 'react-icons/md';
import Button from './button';
import Select from './form/select';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

const Hero = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    beds: '',
    baths: '',
    sqft: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (filters.location) queryParams.append('location', filters.location);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.beds) queryParams.append('beds', filters.beds);
    if (filters.baths) queryParams.append('baths', filters.baths);
    if (filters.sqft) queryParams.append('sqft', filters.sqft);

    navigate(`/units?${queryParams.toString()}`);
  };

  return (
    <div className='hidden md:block relative w-full my-4'>
      <div className='relative w-full h-[500px]'>
        <div className='bg-black/50 absolute inset-0 rounded-md z-10' />
        <img
          src={propertyImage}
          alt='property'
          className='w-full h-full object-cover object-center rounded-md'
        />
      </div>
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-white'>
            Find Your Dream Home Today!
          </h1>
          <p className='text-white/60 font-semibold'>
            Explore the best properties at unbeatable prices.
          </p>
        </div>
        <div className='hidden lg:grid grid-cols-6 gap-4 p-4 bg-white shadow-lg rounded-md'>
          <div className='border col-span-4 px-2 rounded-md flex items-center gap-2 py-2'>
            <MdLocationPin className='w-7 h-7 text-primary' />
            <input
              name='location'
              value={filters.location}
              className='w-full h-full outline-none'
              placeholder='Enter location'
              onChange={handleChange}
            />
          </div>
          <Select
            name='type'
            options={[
              { label: 'Choose House Type', value: '' },
              { label: 'Apartment', value: 'Apartment' },
              { label: 'Farmhouse', value: 'Farmhouse' },
              { label: 'House', value: 'House' },
              { label: 'Skyscraper', value: 'Skyscraper' },
            ]}
            value={filters.type}
            onChange={handleChange}
            wrapperClassName='col-span-2'
            className='py-3'
          />
          <Button primary className='col-span-2' onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
