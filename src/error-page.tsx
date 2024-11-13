import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className='flex flex-col items-center justify-center h-[100vh] gap-5 relative'>
      <Link className='absolute top-5 left-5 text-2xl font-bold' to={'/'}>
        Housey
      </Link>
      <h1 className='text-5xl'>Oops!</h1>
      <p className='text-xl'>Sorry, an unexpected error has occurred.</p>
      <p className='text-xl'>
        {/*@ts-expect-error object error is of type unknown but has properties message and statusText */}
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
