/* eslint-disable */
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ChatContainer from "./pages/ChatContainer";
import CreateProfile from "./pages/CreateProfile";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { api } from "./api";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import PendingUsers from "./pages/PendingUsers";
import RejectedUsers from "./pages/RejectedUsers";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ViewBlog from "./pages/ViewBlog";
import OtherUser from "./pages/OtherUser";
import IdsPage from "./components/Form/idsPage";
import BestModel from "./components/Form/bestModel";
import Scan from "./pages/Scan";
import WSA_Home from "./webSecurityAssessment/pages/Home";
import WSA_Learn from "./webSecurityAssessment/LearnVuln/Learn";
import Contri from "./pages/Contributor";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const params = {
        username: cookies["UserId"],
        requested_id: cookies["UserId"],
      };
      if (!params.username) {
        return;
      }
      const data = await api.getSelf(params);

      if (isSubscribed) {
        setUser(data.data);
      }
    };
    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, [cookies["UserId"]]);

  // console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <Navbar user={user} />
              {!cookies["UserId"] && <Login />}
              {cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar user={user} />
              {!cookies["UserId"] && <Signup />}
              {cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Navbar user={user} />
              <Home user={user} />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <Navbar user={user} />
                  <ChatContainer user={user} />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />
        <Route
          path="/createprofile"
          element={
            <>
              {cookies["UserId"] && <CreateProfile />}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />
        <Route
          path="/createpost"
          element={
            <>
              {cookies["UserId"] && <CreatePost />}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />
        <Route
          path="/pendingusers"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <Navbar user={user} />
                  <PendingUsers user={user} />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <Navbar user={user} />
                  <Profile user={user} />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <Navbar user={user} />
                  <OtherUser user={user} setUser={setUser} />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />
        <Route
          path="/rejectedusers"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <Navbar user={user} />
                  <RejectedUsers setCurUser={setUser} />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <Navbar user={user} />
                  <Dashboard user={user} />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />

        <Route
          path="/viewblog"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <Navbar user={user} />
                  <ViewBlog user={user} />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />
        <Route
          path="/ids"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <Navbar user={user} />
                  <IdsPage />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />

        <Route
          path="/scan"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <Scan />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />

        <Route
          path="/scan"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <Scan />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />

        <Route
          path="/WSA_Home_Page"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <WSA_Home />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />

        <Route
          path="/Learn"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <WSA_Learn />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />
        <Route
          path="/Contri"
          element={
            <>
              {cookies["UserId"] && (
                <>
                  <Navbar user={user} />
                  <Contri />
                </>
              )}
              {!cookies["UserId"] && <Navigate to="/" />}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
