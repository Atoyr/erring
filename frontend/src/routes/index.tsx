import { useRoutes } from 'react-router-dom';

import { mode } from '@/config';

import { Home, NotFound } from '@/features/misc';
import { Board } from '@/features/board';
import { Canv } from '@/features/board';

const pages = [
      { index: true, element: <Home /> }, 
      { path: 'index', element: <Home /> }, 
      { path: 'board', element: <Board /> }, 
      { path: 'canv', element: <Canv /> }, 
      { path: '*', element: <NotFound />}, 
];

export const AppRoutes = () => {
  const routes = mode === "dev" ? [...pages] : [...pages];

  const element = useRoutes(routes);

  return <>{element}</>;
}
