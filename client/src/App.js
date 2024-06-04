import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import publicRoutes from "./routes/public";
import privateRoutes from "./routes/private";

const useAuth = () => {
  const user = localStorage.getItem("user");
  return { user };
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PrivateRoute>{route.element}</PrivateRoute>}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;