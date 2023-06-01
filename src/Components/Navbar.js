import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { LoginButton } from './Login';
import { LogoutButton } from './Logout';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<nav ref={navRef}>
				<a href="/BlogList" data-testid="list">Blog List</a>
				<a href="/BlogPost">Blog Post</a>	
				<a href="/Favorite">Favorites</a>
				<a href="/WatchList">Watch List</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
		
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
			<div className="login">
				<Profile/>
				<LoginButton/>
				<LogoutButton/>
			</div>
		</header>
	);
}

export {Navbar};