import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='w-full flex items-center justify-between mt-auto border-t pt-2'>
      <Link to={'/'} className='text-3xl font-bold text-primary'>
        HOUSEY
      </Link>
      <div className='flex items-center gap-8 space-x-8'>
        <button className='text-sm font-semibold'>Terms</button>
        <button className='text-sm font-semibold'>Privacy</button>
        <button className='text-sm font-semibold'>Cookies</button>
      </div>
      <div className='flex items-center gap-4'>
        <div className='rounded-full p-1 border border-primary text-primary'>
          <a href='https://www.linkedin.com/in/osamma-aroud-a0a41024b/'>
            <FaLinkedin className='w-5 h-5' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
