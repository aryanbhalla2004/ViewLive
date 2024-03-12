import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

export const Footer = () => {
  return (
    <>
      <div className="main_footer">
        <div className="content-sizing main_footer_links">
          <section className="main_footer_content">
            <div>
              <h5>Support</h5>
            </div>
            <ul>
              <li>
                <Link to="/" className="Link">Help Centre</Link>
              </li>
              <li>
                <Link to="/" className="Link">Live Chat</Link>
              </li>
              <li>
                <Link to="/" className="Link">Account Issue</Link>
              </li>
              <li>
                <Link to="/" className="Link">Report Spam</Link>
              </li>
              <li>
                <Link to="/" className="Link">COVID-19 Response</Link>
              </li>
            </ul>
          </section>
          <section className="main_footer_content">
            <div>
              <h5>Get to Know Us</h5>
            </div>
            <ul>
              <li>
                <Link to="/" className="Link">About Us</Link>
              </li>
              <li>
                <Link to="/" className="Link">Blog</Link>
              </li>
              <li>
                <Link to="/" className="Link">Socialize</Link>
              </li>
              <li>
                <Link to="/" className="Link">Quickmunch</Link>
              </li>
              <li>
                <Link to="/" className="Link">Perks</Link>
              </li>
              <li>
                <Link to="/" className="Link">FAQ</Link>
              </li>
            </ul>
          </section>
          <section className="main_footer_content">
            <div>
              <h5>Doing Business</h5>
            </div>
            <ul>
              <li>
                <Link to="/" className="Link">Suggest an Idea</Link>
              </li>
              <li>
                <Link to="/" className="Link">Be a Partner restaurant</Link>
              </li>
              <li>
                <Link to="/" className="Link">Create an Account</Link>
              </li>
              <li>
                <Link to="/" className="Link">Help</Link>
              </li>
            </ul>
          </section>
          <section className="main_footer_content">
            <div>
              <h5>Hosting</h5>
            </div>
            <ul>
              <li>
                <Link to="/" className="Link">Try Hosting</Link>
              </li>
              <li>
                <Link to="/" className="Link">Account Issue</Link>
              </li>
              <li>
                <Link to="/" className="Link">Report Spam</Link>
              </li>
              <li>
                <Link to="/" className="Link">COVID-19 Response</Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className="social-media-icons-footer">
        <ul>
          <li><i className="fa-brands fa-facebook-f"></i></li>
          <li><i className="fa-brands fa-twitter"></i></li>
          <li><i className="fa-brands fa-instagram"></i></li>
          <li><i className="fa-brands fa-google"></i></li>
          <li><i className="fa-brands fa-youtube"></i></li>
        </ul>
      </div>
      <footer>
        <div className="content-sizing footer-container">
          <p>© View Live - 2023 | All Right Reserved</p>
          <ul>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms & Agreement</Link></li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export const FooterSmall = () => {
  return (

      <footer>
        <div className="content-sizing footer-container">
          <p>© View Live - 2023 | All Right Reserved</p>
          <ul>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms & Agreement</Link></li>
          </ul>
        </div>
      </footer>
  )
}