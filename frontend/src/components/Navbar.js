import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setshowBurger] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Adjust the value as needed to determine when to show the button
      setshowBurger(window.innerWidth < 920);
      // setIsOpen(false); // Close the menu if the button is hidden
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run initially

    return () => window.removeEventListener("resize", handleResize);
  });

  const toggleMenu = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <nav className="nav">
        {/* add home to the below path="/" to point the site-title to /home if enabled in App.js */}
        <Link to="/" className="site-title">
          <img
            src="img/logo-transparent-bg.png"
            alt=""
            height="100"
            width="100"
          />
          Smoothie Buddy
        </Link>
        <CustomLink to="/kitchen">My Kitchen</CustomLink>
      </nav>
    </header>
  );
}

export function CustomLink({ to, children, ...props }) {
  const toggleMenu = () => {
    console.log("this should close menu");
  };

  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
