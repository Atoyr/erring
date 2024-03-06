import { Suspense } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import { Loading } from '@/components/Loading';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={ <Loading /> } >
      <CssBaseline />
      {children}
    </Suspense>
  );
};
