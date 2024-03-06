import { useRoutes } from 'react-router-dom';

import { mode } from "@/config";

import { PublicRoutes } from './public';
import { DevRoutes } from './dev';


export const AppRoutes = () => {
  const routes = mode === "dev" ? [...PublicRoutes, ...DevRoutes ] : [...PublicRoutes];

  const element = useRoutes(routes);

  return <>{element}</>;
}
