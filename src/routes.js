import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import NotFound from 'src/features/404/NotFound';
import Transactions from 'src/features/transactions';
import Report from 'src/features/report';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Transactions /> },
      { path: 'report', element: <Report /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
