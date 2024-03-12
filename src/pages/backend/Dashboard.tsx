import React, {useEffect, useContext, useState} from 'react'
import {useNavigate, Link, Outlet } from 'react-router-dom';
import { AccountContext } from '../../setup/context-manager/AuthContext';
import logo from "../../assets/Brand/logo.jpeg";
import { IUserAttributes } from "../../common/Interfaces/IUserAttributes";
import "./style.css";
import { API } from 'aws-amplify';
import {listBusinesses, listLocations} from "../../graphql/queries";
import { DatabaseContext } from '../../setup/context-manager/dbContext';
import { Business } from '../../API';


export const Dashboard = () => {
  const {isLoading, isAuthenticated, getUser} = useContext(AccountContext);
  const [group, setGroup] = useState<string>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business>();
  const [locations, setLocations] = useState<Location[]>([]);
  const {fetchData} = useContext(DatabaseContext);


  useEffect(() => {
    if(isAuthenticated) {
      const data = getUser();
      setGroup(data?.signInUserSession.accessToken.payload['cognito:groups'][0]);
      const getData = async () => {
        try{
          let b = await fetchData(listBusinesses);
          //console.log(b.data.listBusinesses.items[0]);
          // await setBusiness(b.data.listBusinesses.items);

          // let l = await fetchData(listLocations);
          // //console.log(l.data.listLocations.items);
          // await setLocations(l.data.listLocations.items);

        } catch(response){
          console.log(response);
        }
      }
      getData();
      //console.log(business);
      //console.log(locations);
      // const signUpStatus = data?.attributes["custom:sign_up_status"];
      // if(signUpStatus === "pending" && group != "Admin") {
      //   navigate("/finialize-details");
      // } else {
        //console.log(data);
      
      // }
    } else {
      navigate('/');
      console.log("stay");
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   fetchBB();
  // }, []);

  // const fetchBB = async () => {
  //   try {
  //     const response = await API.graphql({query: listBusinesses, authMode: "AMAZON_COGNITO_USER_POOLS"});
  //     //console.log(response);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  return (
    <div className='dashboard-container'>
      <aside>
        <div className='logo-holder-dashboard'>
          <img src={logo} width="180"></img>
        </div>
        <nav className='dashboard-nav'>
          {group === "Regular" && <ul>
            <div className='small-category'><span className='sm-text'>Home</span></div>
            <li><Link to="/"><i className="bi bi-houses"></i>Home</Link></li>
            <li><Link to="/"><i className="bi bi-grid-3x3-gap"></i>Dashboard</Link></li>
            <div className='small-category'><span className='sm-text'>Content</span></div>
            <li><Link to="/"><i className="bi bi-send"></i>Messages</Link></li>
            <li><Link to="my-favourites"><i className="bi bi-heart"></i>favourites</Link></li>
            <li><Link to="my-reviews"><i className="bi bi-layout-text-sidebar-reverse"></i>My Reviews</Link></li>
            <div className='small-category'><span className='sm-text'>Account / Support</span></div>
            <li><Link to="/"><i className="bi bi-gear-wide-connected"></i>Setting</Link></li>
            <li><Link to="/"><i className="bi bi-question-lg"></i>Get Help</Link></li>
          </ul> }

          {group === "Business" && <ul>
            <div className='small-category'><span className='sm-text'>Home</span></div>
            <li><Link to="/"><i className="bi bi-houses"></i>Home</Link></li>
            <li><Link to="/"><i className="bi bi-grid-3x3-gap"></i>Dashboard</Link></li>
            <div className='small-category'><span className='sm-text'>Content</span></div>
            <li><Link to="/dashboard/business"><i className="bi bi-building-check"></i>My Business</Link></li>
            <li><Link to="/dashboard/locations"><i className="bi bi-map"></i>My Locations</Link></li>
            <li><Link to="/"><i className="bi bi-send"></i>Messages</Link></li>
            <div className='small-category'><span className='sm-text'>Account / Support</span></div>
            <li><Link to="/"><i className="bi bi-gear-wide-connected"></i>Setting</Link></li>
            <li><Link to="/"><i className="bi bi-question-lg"></i>Get Help</Link></li>
          </ul> }

          {group === "Admin" && <ul>
            <div className='small-category'><span className='sm-text'>Home</span></div>
            <li><Link to="/"><i className="bi bi-houses"></i>Home</Link></li>
            <li><Link to="/"><i className="bi bi-grid-3x3-gap"></i>Dashboard</Link></li>
            <div className='small-category'><span className='sm-text'>Content</span></div>
            <li><Link to="/dashboard/admin/business-inquires"><i className="bi bi-building-check"></i>Business Inquires</Link></li>
            <li><Link to="/dashboard/admin/location-inquires"><i className="bi bi-map"></i>Location Inquires</Link></li>
            <li><Link to="/dashboard/admin/business"><i className="bi bi-send"></i>All Businesses</Link></li>
            <div className='small-category'><span className='sm-text'>Account</span></div>
            <li><Link to="/dashboard/admin/user-management"><i className="bi bi-map"></i>User Accounts</Link></li>
            <div className='small-category'><span className='sm-text'>Account / Support</span></div>
            <li><Link to="/"><i className="bi bi-gear-wide-connected"></i>Setting</Link></li>
            <li><Link to="/"><i className="bi bi-question-lg"></i>Get Help</Link></li>
          </ul> }
          
        </nav>
      </aside>
      <div className='content-wrapper-dashboard'>
        <div className='header-top-dashboards'>
          <div className=''>
            <button className='close-sidebar-dashboars'><i className="bi bi-list"></i></button>
          </div>
        </div>
        <div className='content-page-data'>
          <div className='content-sizing-dash'>
            <Outlet context={[business]}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;