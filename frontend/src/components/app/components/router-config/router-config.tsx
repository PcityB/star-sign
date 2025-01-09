import { RouteObject, Navigate } from 'react-router-dom';
import { AppPath } from '../../../../common/enums/enums';
import Layout from '../layout/layout';
import ProtectedRoute from '../protected-route/protected-route';
import { NotFound } from '~/pages/not-found/not-found';
import { UserDTO } from '~/common/types/types';
import { Auth } from '~/pages/auth/auth';
import { Profile } from '~/pages/profile/profile';
import { Main } from '~/pages/main/main';
import { AstroProfile } from '~/pages/astro-profile/astro-profile';
import { FindMatch } from '~/pages/find-match/find-match';
import { MutualMatches } from '~/pages/mutual-matches/mutual-matches';
import { Messages } from '~/pages/chat/chat';

interface RouterConfigProps {
  user: UserDTO | null;
  authChecked: boolean;
}

export const createRoutes = ({ user, authChecked }: RouterConfigProps): RouteObject[] => [
  {
    path: AppPath.ROOT,
    element: <Layout />,
    children: [
      {
        path: AppPath.SIGN_IN,
        element: user ? <Navigate to="/" /> : <Auth />,
      },
      {
        path: AppPath.SIGN_UP,
        element: user ? <Navigate to="/" /> : <Auth />,
      },
      {
        index: true,
        element: <ProtectedRoute user={user} authChecked={authChecked} element={<Main />} />,
      },
      {
        path: AppPath.ROOT,
        element: <ProtectedRoute user={user} authChecked={authChecked} element={<Main />} />,
      },
      {
        path: AppPath.PROFILE,
        element: <ProtectedRoute user={user} authChecked={authChecked} element={<Profile />} />,
      },
      {
        path: AppPath.ASTROPROFILE,
        element: <ProtectedRoute user={user} authChecked={authChecked} element={<AstroProfile />} />,
      },
      {
        path: AppPath.FIND_MATCH,
        element: <ProtectedRoute user={user} authChecked={authChecked} element={<FindMatch />} />,
      },
      {
        path: AppPath.MUTUAL_MATCHES,
        element: <ProtectedRoute user={user} authChecked={authChecked} element={<MutualMatches />} />,
      },
      {
        path: AppPath.MESSAGES,
        element: <ProtectedRoute user={user} authChecked={authChecked} element={<Messages />} />,
      },
      {
        path: AppPath.ANY,
        element: <NotFound />,
      },
    ],
  },
];
