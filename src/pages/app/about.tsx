import trustImage from '../../../public/trust.png';
import customerImage from '../../../public/customer.png';
import innovationImage from '../../../public/innovation.png';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className='container mx-auto px-4 py-8 space-y-12'>
      {/* Title */}
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>About Us</h1>
        <p className='text-lg text-gray-600 mt-4'>
          Discover what makes Housey your trusted partner in real estate.
        </p>
      </div>

      {/* Mission */}
      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold'>Our Mission</h2>
        <p className='text-gray-600'>
          Our mission is to connect people with their perfect homes while
          ensuring a seamless real estate experience.
        </p>
      </div>

      {/* Core Values */}
      <div>
        <h2 className='text-2xl font-semibold mb-6'>Our Values</h2>
        <ul className='text-primary font-semibold text-xl gap-4 flex items-center justify-center'>
          <li className='flex flex-col items-center gap-2 border rounded-md py-1.5 px-2 h-[400px]'>
            <div className='w-[300px] h-[300px]'>
              <img
                src={trustImage}
                alt='trust'
                className='w-full h-full object-cover'
              />
            </div>
            <h1>Trust and Transparency</h1>
          </li>
          <li className='flex flex-col items-center gap-2 border rounded-md py-1.5 px-2 h-[400px]'>
            <div className='w-[300px] h-[300px]'>
              <img
                src={customerImage}
                alt='trust'
                className='w-full h-full object-cover'
              />
            </div>
            <h1>Customer Focus</h1>
          </li>
          <li className='flex flex-col items-center gap-2 border rounded-md py-1.5 px-2 h-[400px]'>
            <div className='w-[300px] h-[300px]'>
              <img
                src={innovationImage}
                alt='trust'
                className='w-full h-full object-cover'
              />
            </div>
            <h1>Innovation in Real Estate</h1>
          </li>
          <li className='flex flex-col items-center gap-2 border rounded-md py-1.5 px-2 h-[400px]'>
            <div className='w-[300px] h-[300px]'>
              <img
                src={customerImage}
                alt='trust'
                className='w-full h-full object-cover'
              />
            </div>
            <h1>Commitment to Excellence</h1>
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className='text-center'>
        <h2 className='text-2xl font-semibold'>Let’s Get Started</h2>
        <p className='text-gray-600 mt-4'>
          Ready to find your dream home?{' '}
          <Link to='/contact' className='text-blue-500 hover:underline'>
            Contact us
          </Link>{' '}
          today!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
