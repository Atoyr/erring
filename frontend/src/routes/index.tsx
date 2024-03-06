import { useRoutes } from 'react-router-dom';

import { mode } from '@/config';

import { Home, NotFound } from '@/features/misc';

const pages = [
      { index: true, element: <Home /> }, 
      { path: 'index', element: <Home /> }, 
      { path: '*', element: <NotFound />}, 
];

export const AppRoutes = () => {
  const routes = mode === "dev" ? [...pages] : [...pages];

  const element = useRoutes(routes);

  return <>{element}</>;
}
