import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthProvider from 'react-auth-kit';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Login from './pages/Authentication/LogInForm';
import Calendar from './pages/Calendar';
import Reports from './pages/Reports';
import ECommerce from './pages/Dashboard/ECommerce';
// import FormElements from './pages/ForputAccountss';
import Accounts from './pages/Form/Accounts';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Deposits from './pages/Form/Deposits';
import Withdraws from './pages/Form/Withdraws';
import BankAndCompany from './pages/Form/BankAndCompany';

import createStore from 'react-auth-kit/createStore';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'http:',
    // refresh: refresh,
    debug: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider store={store}>
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Sign In | Ang Book Keeping" />
              <Login />
            </>
          }
        />
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route
            path="/"
            element={
              <>
                <PageTitle title="Dashboard" />
                <ECommerce />
              </>
            }
          />
          <Route
            path="/reports"
            element={
              <>
                <PageTitle title="Reports" />
                <Reports />
              </>
            }
          />
          <Route
            path="/forms/accounts"
            element={
              <>
                <PageTitle title="Accounts" />
                <Accounts />
              </>
            }
          />
          <Route
            path="/forms/bank&company"
            element={
              <>
                <PageTitle title="Bank and Company" />
                <BankAndCompany />
              </>
            }
          />
          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar" />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile" />
                <Profile />
              </>
            }
          />
          {/* <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements" />
                <FormElements />
              </>
            }
          /> */}
          <Route
            path="/forms/form-deposit"
            element={
              <>
                <PageTitle title="Deposits" />
                <Deposits />
              </>
            }
          />
          <Route
            path="/forms/form-withdraws"
            element={
              <>
                <PageTitle title="Withdraws" />
                <Withdraws />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings" />
                <Settings />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons" />
                <Buttons />
              </>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
