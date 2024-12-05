import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "../views/Home";
import SignIn from "../views/SignIn";
import Signup from "../views/SignUp";
import Settings from "../views/Settings";
import Dashboard from "../views/Dashboard";
import Form from "../views/Form";
import Protected from "./protected";
import {
  isAuthenticated,
  handleVerificationProtected,
} from "../services/authentication";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Protected />}>
        <Route
          index
          element={<Home />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path="dashboard"
          element={<Dashboard />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path="new/:type"
          element={<Form />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path=":type/:id"
          element={<Form />}
          loader={() => handleVerificationProtected()}
        />
        <Route
          path="settings"
          element={<Settings />}
          loader={() => handleVerificationProtected()}
        />
      </Route>
      <Route
        path="signin"
        element={<SignIn />}
        loader={() => isAuthenticated()}
      />
      <Route
        path="signup"
        element={<Signup />}
        loader={() => isAuthenticated()}
      />
    </Route>
  )
);

const Index = () => {
  return <RouterProvider router={router} />;
};
export default Index;
