import { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "./store/authSlice";

import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActivitiesPage = () => {
  return (
    <Box sx={{ p: 2, border: "1px dashed gray" }}>
      <ActivityForm onActivitiesAdded={() => window.location.reload()} />
      <ActivityList />
    </Box>
  );
};

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        <Button
          variant="contained"
          onClick={() => {
            logIn();
          }}
        >
          Login
        </Button>
      ) : (
        <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
          <Button variant="contained" onClick={() => {
            dispatch(logout());
            logOut();
          }}>
            Logout
          </Button>
          <Routes>
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/callback" element={<Navigate to="/activities" replace />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to="/activities" replace />
                ) : (
                  <div>Welcome! Please Login</div>
                )
              }
            />
          </Routes>
        </Box>
      )}
    </Router>
  );
}

export default App;
