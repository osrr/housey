import { Link, useLocation, useNavigate } from 'react-router-dom';
import MobileNav from './mobile-nav';
import { FaBell, FaPlus } from 'react-icons/fa';
import NavSearch from './nav-search';
import { useAuth } from '../../hooks/use-auth';
import Button from '../Button';

export type linkType = { to: string; label: string };

const links: linkType[] = [
  { to: '/', label: 'Home' },
  { to: '/units', label: 'Units' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
];

interface NavbarProps {
  search?: boolean;
}

const Navbar = ({ search }: NavbarProps) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='mt-[10px]'>
      {/* navigation */}
      <div className='hidden md:flex items-center justify-between border-b'>
        <Link to={'/'} className='text-3xl font-bold '>
          Housey
        </Link>
        <div className='flex items-center gap-2 lg:gap-4'>
          {links.map((link) => {
            return (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            );
          })}
        </div>
        {/* user actions */}
        <div className='flex items-center gap-4'>
          <div>
            <p>John doe</p>
          </div>
          <button className=''>
            <FaBell className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* mobile-navigation */}
      <div className='md:hidden flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <MobileNav links={links} />
          <div className='flex items-center gap-4'>
            {!location.pathname.startsWith(`/profile/new-post/`) && (
              <Button
                primary
                iconClassName='w-4 h-4'
                xs
                onClick={() => navigate(`profile/new-post/${currentUser.id}`)}
              >
                new post
              </Button>
            )}
            <button className=''>
              <FaBell className='w-5 h-5' />
            </button>
          </div>
        </div>
        {search && <NavSearch />}
      </div>
    </div>
  );
};

export default Navbar;
