import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getLocation, getUser as getUserDb } from '../../../graphql/queries';
import { AccountContext } from '../../../setup/context-manager/AuthContext';
import { DatabaseContext } from '../../../setup/context-manager/dbContext';
import { Location, User } from '../../../API';
import noData from "../../../assets/SVG/no-data.svg";
import "./style.css";
import { Button } from '../../../common/Components/button/Button';
import Loading from '../../../common/Components/pre-loader/Loading';
import { LocationCard } from '../../../common/Components/business-card/LocationCard';

export const MyFavourites = () => {
  const [myFavLocation, setMyFavLocation] = useState<Location[] | null>(null);
  const {userProfile} = useContext(AccountContext);
  const {pullDataAPI} = useContext(DatabaseContext)

  useEffect(() => {
    getMyFav();
  }, [userProfile]);

  const getMyFav = async () => {
    if(userProfile != null) {
      const myFav = userProfile.myFavourites;
      const allMyFav:Location[] = [];
      for(let i = 0; i < myFav.length; i++) {
        const locationId = myFav[i];

         try {
          const res = await pullDataAPI(getLocation, locationId);
          const location:Location = res.data.getLocation;
          allMyFav.push(location);
        } catch(e) {
          console.log(e);
        }
      }

      setMyFavLocation(allMyFav);
    }
  }

  return (
    <div className='bbView-container'>
      <div className='dash-header-page'>
        <div className='name-path-dash-page'>
          <h2>My Favorites</h2>
          <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i>My Favorites</p>
        </div>
        <div className='action-button-container-dash'>
          <Link to="/dashboard/locations/create" className='link-button btn-primary'> Clear All</Link>
        </div>
      </div>
      <div className='fav-main-div-db'>
        {myFavLocation === null ? <Loading/> : myFavLocation.length > 0 ? <>
          <div >
            <ul>
              {myFavLocation.map(item => (
                <LocationCard data={item} isSearchItem={false}/>
              ))}
            </ul>
          </div>
        </> : 
        <div className='no-data-found-favorite-db'>
          <img src={noData} width={300}/>
          <h2>You haven't favorited any places yet.</h2>
          <p>Next time you come across something you enjoy, be sure to give it a like.</p>
          <Button text='Explore Places' loading={false}/>
        </div>}
      </div>
    </div>
  )
}
