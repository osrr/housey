import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/app/root';
import ErrorPage from './error-page';
import Unit from './pages/app/unit-details';
import ContactPage from './pages/app/contact';
import AboutPage from './pages/app/about';
import { Provider } from 'react-redux';
import store from './store';
import UnitsPage from './pages/app/units';
import SignPage from './pages/auth/sign';
import RegisterPage from './pages/auth/register';
import AuthIndex from './pages/auth';
import AppIndex from './pages/app';
import ProfilePage from './pages/profile/profile';
import ProfileNewPostPage from './pages/profile/new-post';
import ProfileIndex from './pages/profile';
import ProfileEditPostPage from './pages/profile/edit-post';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppIndex />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'units',
        element: <UnitsPage />,
      },
    ],
  },
  {
    path: 'unit',
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':id',
        element: <Unit />,
      },
    ],
  },
  {
    path: 'profile',
    element: <ProfileIndex />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':id',
        element: <ProfilePage />,
      },
      {
        path: 'new-post/:id',
        element: <ProfileNewPostPage />,
      },
      {
        path: 'edit-post/:id',
        element: <ProfileEditPostPage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthIndex />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'sign',
        element: <SignPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
