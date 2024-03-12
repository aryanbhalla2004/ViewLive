import {useContext, useEffect, useState}from 'react'
import "./style.css";
import {Location, LocationHours, UpdateUserInput, User} from "../../../API";
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LikedButton } from '../like-button/LikedButton';
import { AccountContext } from '../../../setup/context-manager/AuthContext';
import { DatabaseContext } from '../../../setup/context-manager/dbContext';
import { updateUser} from '../../../graphql/mutations';
import {listUsers} from "../../../graphql/queries";
import { toast } from 'react-toastify';

interface props{
  data: Location;
  isSearchItem: boolean
}

export const LocationCard = (props : props) => {

  const {updateUserFunction, pullObj} = useContext(DatabaseContext);
  const {getUser, userProfile} = useContext(AccountContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [bannerImage, setBannerImage] = useState("");
  const [currentLocationStatus, setCurrentLocationStatus] = useState<String>();
  
  useEffect(() => {
    const fetchRequires = async () => {
      try {
        if(props.data.hours !== undefined && props.data.hours !== null && props.data.hours) {
          setCurrentLocationStatus(getCurrentlyOpenLocation(props.data.hours));
        }
        await getBannerImage();
      } catch(e) {
        console.log(e);
      }
    }
    
    fetchRequires();

  },[props.data]);

  const getBannerImage = async () => {
    if(props.data && props.data?.images) {
      const banner = props.data?.images[0].key;
      try {
        const img = new Image();
        img.onload = () => {
          setIsLoading(false);
        }
        img.src = `https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${banner}`;
        setBannerImage(img.src);
      } catch(e) {

      }
    }
  }

  useEffect(() => {
    if(userProfile != null) {
      if(userProfile.myFavourites != null && userProfile.myFavourites.includes(props.data.id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
   
  }, [userProfile]);

  // useEffect(() => {
  //   if(distance != null) {
  //     setIsLoading(false);
  //   }
  // }, [distance])

  const history = useNavigate();
  
  const changePage = () => {
    history(`/vendor/${props.data.id}`);
  }

  // const calculateDistance = async (lat:any, lng:any) => {
  //   const coord1 = [lng, lat]; // longitude, latitude of San Francisco

  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       const { latitude, longitude } = position.coords;
  //       const coord2 = [longitude, latitude];
  //       const from = turf.point(coord1);
  //       const to = turf.point(coord2);
  //       const options:any = { units: 'kilometers' }; // or 'kilometers', 'meters', 'feet', etc.
  //       const distance = turf.distance(from, to, options);
  //       setDistance(distance.toFixed(1))
  //     },
  //     error => console.log(error),
  //     { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  //   );
  // }

  const getCurrentlyOpenLocation = (entries: (LocationHours | null)[]) : String => {
    const currentTime = new Date();
    let todayDay:LocationHours | null = null;
    if(currentTime.getDay() === 0) {
      todayDay = entries[entries.length - 1];
    } else {
      todayDay = entries[currentTime.getDay() - 1];
    }

   
    if(todayDay != null) {
      if(todayDay.open) {
        if(isTimeInRange(todayDay.startTime, todayDay.endTime)) {
          return "Open"
        } else {
          return "Closed"
        }
      } else {
        return "Closed";
      }
    }

    return ""; // No location is currently open
  }

  const isTimeInRange = (startTime:any, endTime:any) => {
    
    const currentTime = new Date();
    const startDateTime = new Date();
    const endDateTime = new Date();
  
    // Set the current date as the base for startDateTime and endDateTime
    startDateTime.setHours(startTime.split(':')[0]);
    startDateTime.setMinutes(startTime.split(':')[1]);
    endDateTime.setHours(endTime.split(':')[0]);
    endDateTime.setMinutes(endTime.split(':')[1]);
  
    // Check if the end time is before the start time (e.g., for cases crossing midnight)
    if (endDateTime < startDateTime) {
      // Add one day to the endDateTime if it's before the startDateTime
      endDateTime.setDate(endDateTime.getDate() + 1);
    }
  
    // Compare the current time with the start and end time to check if it falls within the range
    return currentTime >= startDateTime && currentTime <= endDateTime;

    //console.log(`${currentTime.getFullYear()}-${currentTime.getDate()}-${currentTime.getMonth()}`);
    //return currentTime >= startDateTime && currentTime <= endDateTime;
    // return ;
  }

  const cardClick = (e: any) => {
    if(e.target.id === "like-button") {
      likeItem(props.data.id);
    } else {
      changePage();
    }
  }

  const likeItem = async (newItem: any) => {
    const id = getUser().username;
    
    try {
      const pullUser = await pullObj(listUsers);
      const myUser:User = pullUser.data.listUsers.items[0];
      const updatedUserObject : UpdateUserInput = {
        id: id,
        myFavourites: []
      }
      if(myUser.myFavourites?.includes(newItem)) {
        const filteredItem = myUser.myFavourites.filter(item => item != newItem);
        updatedUserObject.myFavourites = filteredItem;
        toast.success(`${props.data.name} is removed to your favorite list.`);
      } else {
        if(myUser.myFavourites && myUser.myFavourites?.length > 0) {
          updatedUserObject.myFavourites = [...myUser.myFavourites, newItem];
        } else {
          updatedUserObject.myFavourites = [newItem];
        }
        toast.success(`${props.data.name} is added to your favorite list.`);
      }
      const response:any = await updateUserFunction(updateUser, updatedUserObject);
      console.log(response); 
      // // const { id, myFavourites } = response.data.updateUser;
      // // console.log(`User with ID ${id} updated favourites:`, myFavourites);
      // // return myFavourites;
    } catch (error) {
      console.error('Error updating user favourites:', error);
      throw error;
    }
  }

  return (
    !props.isSearchItem ? 
    <div className={isLoading ? 'single-card-container-loading' : 'single-card-container'} onClick={cardClick}>
      <div className={isLoading ? 'image-pic-container-loader' : 'image-pic-container'}>
        {isLoading ? (
          <Skeleton width={'320px'} height={'200px'}/>
        ) : (
          <img srcSet={bannerImage} />
        )}
        {!isLoading && (
          <div className='over-lay-banner-image-single'>
            <LikedButton liked={isLiked}/>
          </div>
        )}
      </div>
      <div className='single-business-info'>
        <div className='top-list-single-card'>
          <div className='left-info-single-card'>
            {isLoading ? (
              <>
                <Skeleton width={'100px'}/>
                <Skeleton width={'200px'}/>
              </>
            ) : (
              <>
                <span>{props.data.category}</span>
                <h3 className='main-location-name-single-box'>{props.data.name}</h3>
              </>
            )}
          </div>
          <div className='review-small-selection'>
            {isLoading ? (
              <Skeleton width={"30px"}/>
            ) : (
              <>
                <i className="bi bi-star-fill"></i>
                <p>{props.data.avgRating?.toFixed(1)}</p>
              </>
            )}
          </div>
        </div>
        <div className='bottom-list-single-card'>
          {isLoading ? (
            <>
              <Skeleton width={"30px"}/>
            </>
          ) : (
            <p>Approx 5 km Away</p>
          )}
          <div className={currentLocationStatus === "Open" ? 'open-status-style money-cost-effectiveness' : 'money-cost-effectiveness'}>
          {isLoading ? (
            <>
              <Skeleton width={"40px"}/>
            </>
          ) : (
            currentLocationStatus
          )}
            
          </div>
        </div>
      </div>
    </div> : <>
    <div className="banner-image">
      {isLoading ? (
        <Skeleton width={'350px'} height={'200px'}/>
      ) : (
        <img srcSet={bannerImage} />
      )}
      <div className="over-lay-banner-image-single">
        <LikedButton liked={isLiked}/>
      </div>
    </div>
    <div className="single-location-info">
      <div>
        {isLoading ? (<>
          <Skeleton width={"100px"}/>
          <Skeleton width={"150px"}/>
          </>
        ) : (
          <>
            <h2>{props.data.name}</h2>
            <p>{props.data.category}<span className="hours-status">{currentLocationStatus}</span></p>
          </>
        )}
      </div>
        {isLoading ? (
          <Skeleton width={"50px"}/>
        ) : (
          <span className="rating"><i className="bi bi-star-fill"></i>{props.data.avgRating?.toFixed(1)}</span>
        )}
      
    </div>
    </>
    
  )
  
}