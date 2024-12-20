import { ChangeEvent, useEffect, useState } from 'react';
import Input from '../../components/form/input';
import UnitList from '../../components/unit-list';
import Select from '../../components/form/select';
import Button from '../../components/button';
import { FaRedo } from 'react-icons/fa';
import { fetchPosts, useAppDispatch, useAppSelector } from '../../store';

const UnitsPage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(({ posts }) => posts.data);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const [filters, setFilters] = useState({
    location: '',
    type: '',
    beds: '',
    baths: '',
    sqft: '',
  });

  const [appliedFilters, setAppliedFilters] = useState({
    location: '',
    type: '',
    beds: '',
    baths: '',
    sqft: '',
  });

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const locationQuery = queryParams.get('location');
    const typeQuery = queryParams.get('type');

    if (locationQuery) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        location: locationQuery,
      }));
      setAppliedFilters((prevFilters) => ({
        ...prevFilters,
        location: locationQuery,
      }));
    }
    if (typeQuery) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        type: typeQuery,
      }));
      setAppliedFilters((prevFilters) => ({
        ...prevFilters,
        type: typeQuery,
      }));
    }
  }, [location]);

  const filteredPosts = posts?.filter((post) => {
    const matchesLocation =
      !appliedFilters.location ||
      post.location.city
        .toLowerCase()
        .includes(appliedFilters.location.toLowerCase()) ||
      post.location.address
        .toLowerCase()
        .includes(appliedFilters.location.toLowerCase());
    const matchesType =
      !appliedFilters.type || post.type === appliedFilters.type;
    const matchesBeds =
      !appliedFilters.beds || parseInt(appliedFilters.beds, 10) <= post.beds;
    const matchesBaths =
      !appliedFilters.baths || parseInt(appliedFilters.baths, 10) <= post.baths;
    const matchesSqft =
      !appliedFilters.sqft || parseInt(appliedFilters.sqft, 10) <= post.sqft;

    return (
      matchesLocation &&
      matchesType &&
      matchesBeds &&
      matchesBaths &&
      matchesSqft
    );
  });

  return (
    <div className='grid grid-cols-8 gap-4 mt-6'>
      <div className='col-span-2 sticky top-0 border-r p-2'>
        <div className='flex items-center justify-between mb-5'>
          <h1 className='text-xl font-semibold'>Filters</h1>
          <Button
            className='ml-auto text-xs w-8 h-8'
            onClick={() => {
              setFilters({
                location: '',
                type: '',
                beds: '',
                baths: '',
                sqft: '',
              });
              setAppliedFilters({
                location: '',
                type: '',
                beds: '',
                baths: '',
                sqft: '',
              });
            }}
          >
            <FaRedo />
          </Button>
        </div>
        <div className='flex flex-col items-start w-full gap-4'>
          <Input
            name='location'
            value={filters.location}
            onChange={handleChange}
            label='Search Location'
            placeholder='Enter location'
            wrapperClassName='w-full'
          />
          <Select
            name='type'
            value={filters.type}
            wrapperClassName='md:col-span-2'
            label='House Type'
            options={[
              { label: 'Choose House Type', value: '' },
              { label: 'Apartment', value: 'Apartment' },
              { label: 'Farmhouse', value: 'Farmhouse' },
              { label: 'House', value: 'House' },
              { label: 'Skyscraper', value: 'Skyscraper' },
            ]}
            onChange={handleChange}
          />
          <Input
            name='beds'
            value={filters.beds || ''}
            onChange={handleChange}
            label='Beds'
            wrapperClassName='w-full'
          />
          <Input
            name='baths'
            value={filters.baths || ''}
            onChange={handleChange}
            label='Baths'
            wrapperClassName='w-full'
          />
          <Input
            name='sqft'
            value={filters.sqft || ''}
            onChange={handleChange}
            label='Sqft'
            type='number'
            wrapperClassName='w-full'
          />

          <Button primary onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
      <div className='col-span-6 flex flex-wrap gap-8'>
        <UnitList posts={filteredPosts} />
      </div>
    </div>
  );
};

export default UnitsPage;
