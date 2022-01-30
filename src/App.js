import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import configureStore from "./redux/store"
import { Provider } from "react-redux";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Landing from "./pages/Public/Landing";
import NotFound from "./pages/Public/NotFound"
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
import ForgotPassword from "./pages/Auth/forgotPassword";
import ResetPassword from "./pages/Auth/resetPassword";

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            exact
            path='/login'
            element={
              <PublicRoute restricted={true} component={<Login />} />
            }
          />
          <Route
            exact
            path='/signup'
            element={
              <PublicRoute restricted={true} component={<Signup />} />
            }
          />
          <Route
            exact
            path='/forgot-password'
            element={
              <PublicRoute restricted={true} component={<ForgotPassword />} />
            }
          />
          <Route
            exact
            path='/reset-password'
            element={
              <PublicRoute restricted={true} component={<ResetPassword />} />
            }
          />
          <Route
            exact
            path='/'
            element={
              <PublicRoute component={<Landing />} />
            }
          />
          <Route
            path='*'
            element={
              <PublicRoute component={<NotFound />} />
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
