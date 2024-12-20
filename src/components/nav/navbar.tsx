import { Link, useLocation, useNavigate } from 'react-router-dom';
import MobileNav from './mobile-nav';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import NavSearch from './nav-search';
import Button from '../custom-button';
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
    <nav className='mt-[10px]'>
      {/* navigation */}
      <div className='hidden md:flex items-center justify-between pb-2 border-b'>
        <div className='flex items-center'>
          <Link to={'/'} className='text-3xl font-bold text-primary'>
            HOUSEY
          </Link>
          <div className='flex items-center gap-2 lg:gap-4 px-4 py-1.5 ml-6 '>
            {links.map((link) => {
              if (link.to === '/') {
                return;
              }

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className='text-sm font-semibold'
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        {/* user actions */}
        <div className='flex items-center gap-4'>
          {!location.pathname.startsWith(`/profile/new-post/`) && (
            <Button
              primary
              iconClassName='w-4 h-4'
              xs
              onClick={() => navigate(`profile/new-post/${currentUser.id}`)}
            >
              New Post
            </Button>
          )}
          <div>
            <p>{currentUser.username}</p>
          </div>
          <button className=''>
            <DropdownMenu
              trigger={
                <div>
                  <div className='border rounded-full w-10 h-10 flex items-center justify-center'>
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        className='w-full h-full object-cover rounded-full'
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
                New Post
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
    </nav>
  );
};

export default Navbar;
