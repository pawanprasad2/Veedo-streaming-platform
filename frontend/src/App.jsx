import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

import Layout from "./components/Layout";
import Like from "./pages/Like";

import History from "./pages/History";
import TopMovies from "./pages/TopMovies";
import TopVideos from "./pages/TopVideos";
import Comment from "./pages/Comment";
import Notification from "./pages/Notification";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import SearchResults from "./pages/SearchResults";
import { checkAuth } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loader } from "lucide-react";
function App() {
  const dispatch = useDispatch();
  const { authUsers, isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isCheckingAuth && !authUsers) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={authUsers?<Home /> :<Navigate to="/login"/>} />
            <Route path="/like" element={<Like />} />

            <Route path="/history" element={ authUsers?<History /> :<Navigate to="/login"/>} />
            <Route path="/topmovies" element={ authUsers?<TopMovies /> :<Navigate to="/login"/> } />
            <Route path="/search" element={ authUsers? <SearchResults />:<Navigate to="/login"/>} />
            <Route path="/topvideos" element={ authUsers?<TopVideos />:<Navigate to="/login"/>} />
            <Route path="/comment" element={ authUsers? <Comment />:<Navigate to="/login" />} />
            <Route path="/video/:id" element={   authUsers? <VideoPlayerPage /> :<Navigate to="/login" />} />
            <Route path="/notification" element={   authUsers? <Notification />:<Navigate to="/login" />} />
          </Route>
          <Route path="/login" element={ !authUsers ? <Login /> :<Navigate to='/'/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={ !authUsers?<Signup />: <Navigate to='/'/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
