import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AccountContext } from '../../../setup/context-manager/AuthContext';

export const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { getUser } = useContext(AccountContext); // Get authentication status from context/hook

  return (
    <Route
      {...rest}
      element={
        getUser() ? (
          <Navigate to="/" replace />
        ) : (
          <Component />
        )
      }
    />
  );
}