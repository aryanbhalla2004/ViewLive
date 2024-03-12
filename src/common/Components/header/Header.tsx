import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./style.css";
import logo from "../../../assets/Brand/logo.jpeg";
import { AccountContext } from '../../../setup/context-manager/AuthContext';


export const Header = () => {
  const {isAuthenticated, isLoading, getUser, getUserProfile} = useContext(AccountContext);
  const [dropDown, setDropDown] = useState<boolean>(false);

  console.log(getUser());

  useEffect(() => {
    document.addEventListener('click', (e: any) => {
      if(e.target.className !== "item-open-show-2323" && e.target.className !== "email-account item-open-show-2323") {
        setDropDown(false);
      }
    });
  }, []);

  return (
    <header>
      <div className='content-sizing header-wrapper'>
        <Link to="/"><img src={logo} width={190} alt="View.Live logo"></img></Link>
        <nav className='header-navbar'>
          <ul>
            <li><Link to="/live-gallery">Live Gallery <i className="bi bi-chevron-down"></i></Link></li>
            <li><Link to="/about-us">About us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </nav>
        {isLoading ? <h1>loading</h1> :
          (!isAuthenticated ?
          <div className='action-buttons'>
            <Link to="/auth" className='text-link'><i className="bi bi-person"></i> Sign in</Link>
            <Link to="/auth/sign-up" className='link-button btn-primary'>Get Started <i className="bi bi-arrow-right"></i></Link>
          </div> : 
          <div className='user-login item-open-show-2323' onClick={() => setDropDown(!dropDown)}>
            <div style={{backgroundColor: getUserProfile(getUser().username)}} className="user-avatar-container item-open-show-2323">{getUser()?.attributes?.given_name[0]}</div>
            <div className='item-open-show-2323'>
              <h4 className='item-open-show-2323'>{getUser()?.attributes?.family_name}, {getUser()?.attributes?.given_name} </h4>
              <p className='email-account item-open-show-2323'>{getUser()?.attributes?.email}</p>
            </div>
            <i className="bi bi-chevron-down"></i>
            {dropDown && 
            <div className='drop-down-header'>
              <ul>
                <li><Link to="/dashboard"><i className="bi bi-grid-3x3-gap-fill"></i>Dashboard</Link></li>
                <li><Link to=""><i className="bi bi-gear-wide-connected"></i>Settings</Link></li>
                <li><Link to="/logout/true"><i className="bi bi-box-arrow-in-right"></i>Logout</Link></li>
              </ul>
            </div> }
          </div>)
        }
      </div>
    </header>
  )
}
