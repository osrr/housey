import { Link, useLocation, useNavigate } from 'react-router-dom';
import MobileNav from './mobile-nav';
import { FaBell, FaSignOutAlt, FaUser } from 'react-icons/fa';
import NavSearch from './nav-search';
import Button from '../button';
import { flushUser, useAppDispatch, useAppSelector } from '../../store';
import {
  DropdownAction,
  DropdownLabel,
  DropdownMenu,
  DropdownSeparator,
  DropdownShelf,
} from '../dropdown-menu';

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
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(flushUser(null));
  };

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
            <p>{currentUser.username}</p>
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
            <DropdownMenu
              trigger={
                <div>
                  <div className='border rounded-full w-10 h-10 flex items-center justify-center'>
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                </div>
              }
              className='left-[-145px] right-0'
            >
              <DropdownLabel>{currentUser.username}</DropdownLabel>
              <DropdownShelf>
                <DropdownAction
                  onClick={() => navigate(`/profile/${currentUser.id}`)}
                  icon={FaUser}
                >
                  Profile
                </DropdownAction>
                <DropdownSeparator />
                <DropdownAction
                  onClick={() => handleClick()}
                  className='text-red-500'
                  icon={FaSignOutAlt}
                >
                  Log out
                </DropdownAction>
              </DropdownShelf>
            </DropdownMenu>
          </div>
        </div>
        {search && <NavSearch />}
      </div>
    </div>
  );
};

export default Navbar;
