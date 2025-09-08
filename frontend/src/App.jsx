import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/like" element={<Like />} />

            <Route path="/history" element={<History />} />
            <Route path="/topmovies" element={<TopMovies />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/topvideos" element={<TopVideos />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/video/:id" element={<VideoPlayerPage />} />
            <Route path="/notification" element={<Notification />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
