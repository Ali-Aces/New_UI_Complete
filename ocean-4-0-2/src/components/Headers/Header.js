import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../GlobalProvider';
const Header = () => {
  // const{ loginUsername, matchedUser } = useContext(GlobalContext);
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleFileDropdown = () => {
    setIsFileDropdownOpen(!isFileDropdownOpen);
  };

  const toggleHelpDropdown = () => {
    setIsHelpDropdownOpen(!isHelpDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleMenuClick = (menu) => {
    // Implement your logic here based on the menu item clicked
    console.log(`Clicked on ${menu}`);
  };

  return (
    <div className="header-main">
      <nav className='navmenu'>
        <ul className="header__list">
          <li className="header__list" onClick={toggleFileDropdown}> File
            <ul className={`dropdown ${isFileDropdownOpen ? 'show' : ''}`}>
              <li onClick={() => handleMenuClick('Option 1')}>Open</li>
              <li onClick={() => handleMenuClick('Option 2')}>Save</li>
              <li onClick={() => handleMenuClick('Option 2')}>Exit</li>
            </ul>
          </li>
          <li className="header__list" onClick={toggleHelpDropdown}> Help
            <ul className={`dropdown ${isHelpDropdownOpen ? 'show' : ''}`}>
              <li onClick={() => handleMenuClick('FAQ')}>FAQ</li>
              <li onClick={() => handleMenuClick('Contact Us')}>Contact Us</li>
              {/* Add more dropdown options */}
            </ul>
          </li>
          <li > Data</li>
          <li > Server</li>
          
        </ul>
      </nav>
      <div> <h2 className='toolname'>Ocean-Data Analytics Tool</h2></div>
      <div className="user-section text-end">
    <Link href="/" className="dropdown-toggle" onClick={toggleUserDropdown}>
      <FaRegUserCircle size="29px" color='#fff' />
      <span className="user-name">Ali</span>
    </Link>
    <ul className={`dropdown ${isUserDropdownOpen ? 'show' : ''}`} data-popper-placement="bottom-start">
              <li><Link className="dropdown-item" to="/" onClick={() => handleMenuClick('Settings')}>Settings</Link></li>
              <li><Link className="dropdown-item" to="/" onClick={() => handleMenuClick('Profile')}>Profile</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to="/" onClick={() => handleMenuClick('Sign out')}>Sign out</Link></li>
            </ul>
  </div>
</div>


    
  );
};

export default Header;
