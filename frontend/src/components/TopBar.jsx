
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { LuHistory } from "react-icons/lu";
import { MdPlaylistAdd } from "react-icons/md";
import { BiVideo, BiMoviePlay } from "react-icons/bi";
import { UserDataContext } from "../context/UserContext";
import { searchVideos } from "../service/api";
import SearchBox from "../components/SearchBox";
import DesktopNav from "../components/DesktopNav";
import MobileMenu from "../components/MobileMenu";


function TopBar() {
  const { user, setUser, loading } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  const navItems = [
    { path: "/", icon: GoHome, label: "Home" },
    { path: "/topvideos", icon: BiVideo, label: "Top Videos" },
    { path: "/topmovies", icon: BiMoviePlay, label: "Top Movies" },
    { path: "/like", icon: FiHeart, label: "Liked" },
    { path: "/history", icon: LuHistory, label: "History" },
    { path: "/mylist", icon: MdPlaylistAdd, label: "My List" },
    { path: "/comment", icon: FaRegCommentDots, label: "Comments" },
    { path: "/notification", icon: IoIosNotificationsOutline, label: "Notifications" },
  ];

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }
    const id = setTimeout(() => {
      setIsSearching(true);
      searchVideos(searchQuery)
        .then((data) => {
          setResults(data?.videos || []);
          setShowResults(true);
        })
        .catch(() => {
          setResults([]);
        })
        .finally(() => setIsSearching(false));
    }, 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
        setShowSearch(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleVideoClick(id) {
    navigate(`/video/${id}`);
    setSearchQuery("");
    setShowResults(false);
    setShowSearch(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    setShowMenu(false);
  }

  if (loading) return null;

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-8 bg-black">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <img
          src="../src/assets/veedoLogo.png"
          alt="Veedo Logo"
          className="w-8 md:w-12 lg:w-16 h-auto hover:scale-110 transition-transform duration-300"
        />
      </Link>

      {/* Desktop Nav & Search */}
      <DesktopNav navItems={navItems} />

      <div className="hidden md:block relative flex-1 max-w-md mx-6" ref={searchRef}>
        <SearchBox
          isMobile={false}
          containerRef={searchRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showResults={showResults}
          setShowResults={setShowResults}
          results={results}
          isSearching={isSearching}
          onClickVideo={handleVideoClick}
        />
      </div>

      {/* Desktop Right Icons */}
      <div className="hidden md:flex items-center gap-6 text-white">
        <NavLink to="/comment" className="hover:text-[#e473ff] p-2">
          <FaRegCommentDots size={20} />
        </NavLink>
        <NavLink to="/notification" className="hover:text-[#e473ff] p-2">
          <IoIosNotificationsOutline size={22} />
        </NavLink>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden lg:flex items-center text-gray-300 hover:text-white">
              <AiOutlineUser className="mr-2" size={20} />
              {user.firstname}
            </span>
            <button
              onClick={handleLogout}
              className="bg-[#d60c73] px-4 py-2 rounded-xl hover:bg-[#eb6dae] text-sm font-medium shadow-lg transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4 text-sm">
            <Link to="/login" className="hover:text-[#e473ff] px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">Login</Link>
            <Link to="/signup" className="bg-[#e473ff] px-4 py-2 rounded-xl hover:bg-[#eb6dae] text-white font-medium shadow-lg transition-colors">Signup</Link>
          </div>
        )}
      </div>

      {/* Mobile Search & Menu Toggles */}
      <div className="flex md:hidden items-center gap-3">
        <button
          onClick={() => { setShowSearch((v) => !v); setShowMenu(false); }}
          className="text-white hover:text-[#e473ff] p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <CiSearch size={20} />
        </button>
        <button
          onClick={() => { setShowMenu((v) => !v); setShowSearch(false); }}
          className="text-white hover:text-[#e473ff] p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`bg-current block h-0.5 w-6 rounded-sm transition-all duration-300 ${showMenu ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-current block h-0.5 w-6 rounded-sm my-0.5 transition-all duration-300 ${showMenu ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-current block h-0.5 w-6 rounded-sm transition-all duration-300 ${showMenu ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Search Dropdown */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-black bg-opacity-90 px-4 py-2 z-40 md:hidden" ref={searchRef}>
          <SearchBox
            isMobile={true}
            containerRef={searchRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showResults={showResults}
            setShowResults={setShowResults}
            results={results}
            isSearching={isSearching}
            onClickVideo={handleVideoClick}
          />
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {showMenu && (
        <MobileMenu
          navItems={navItems}
          user={user}
          onLogout={handleLogout}
          onClose={() => setShowMenu(false)}
          innerRef={menuRef}
        />
      )}
    </div>
  );
}

export default TopBar;
