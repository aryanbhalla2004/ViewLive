import React, { useEffect, useState } from 'react'
import "./style.css";
import { useOutletContext } from 'react-router-dom';
import { AmenitieInput, Location, LocationHours } from '../../../../../API';
import { categories } from '../../../../../common/util/categories';
import { getIcon } from '../../../../../common/util/iconHelper';

const LGeneral = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [data, images]:any = useOutletContext();
  

  useEffect(() => {
    setLocation(data);
  }, [data]);

  const convertTimeToRegualar = (militaryTime: string) => {
    let timeArr = militaryTime.split(":");
    let hours = parseInt(timeArr[0]);
    let minutes = timeArr[1]; 
    let period = (hours >= 12) ? "PM" : "AM";
    hours = (hours > 12) ? hours - 12 : hours;
    hours = (hours == 0) ? 12 : hours;
    return hours + ":" + minutes + " " + period;
  }

  const getTodayTiming = (entries: (LocationHours | null )[]): String => {
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
          return "Open";
        } else {
          return "Closed"
        }
      } else {
        return "Closed";
      }
    }

    return ""; // No location is currently open

    // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    // const getDay = new Date().getDate();

    // if(currentLocation?.hours != null) {
    //   const findTime = currentLocation?.hours.find(item => item?.name === weekday[getDay]);
    //   if(findTime?.open) {
    //     return "Open " + ;
    //   } else {
    //     return "Closed";
    //   }
    // }
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

  const iconsLoader = (label:any, icon:string) => {
    let Icon =  getIcon(icon);
    return (
      <div>
        <li>{Icon && <Icon />}</li>
      </div>
      
    );

    return (<></>)
  };

  return (
    <div className='container-for-managment-bb'>
      <div className='single-col-management-bb'>
        <h3>Store Gallery</h3>
        <div className='inputs-holder-below-title-bb'>
          <div className='manage-ll-dd-images'>
            <div className='banner-image'>
              <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${images.main}`}/>
            </div>
            <div className='store-images'>
              <div className='store-img'>
                <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${images.storeOne}`}/>
              </div>
              <div className='store-img'>
                <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${images.storeTwo}`}/>
              </div>
              <div className='store-img'>
                <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${images.storeThree}`}/>
              </div>
              <div className='store-img'>
                <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${images.storeFour}`}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='single-col-management-bb'>
        <h3>About Your Location</h3>
        <div className='inputs-holder-below-title-bb'>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Location Name</span>
              <p>{location?.name}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Category</span>
              <p className='category-box'><i className={location?.category ? categories[`${location?.category}`] : ""}></i> {location?.category}</p>
            </div>
          </div>
          <div className='col-2-container-bgeneral'>
            <div className='single-item-in-bgeneral'>
              <span>Email</span>
              <p>{location?.email}</p>
            </div>
            <div className='single-item-in-bgeneral'>
              <span>Phone Number</span>
              <p>{location?.phoneNumber}</p>
            </div>
          </div>
          <div className='single-item-in-bgeneral'>
            <span>Address</span>
            <p>{location?.address?.address}, {location?.address?.city} {location?.address.state}, {location?.address.country} {location?.address.postalcode}</p>
          </div>
          <div className='single-item-in-bgeneral'>
            <span>Description</span>
            <p>{location?.description}</p>
          </div>
        </div>
      </div>
      <div className='side-2-col-management'>
        <div className='side-bar-single-item-location-data'>
          <h2>Today’s Business Hours</h2>
          <div className='current-hours'>
            <p>Now: {location?.hours && getTodayTiming(location?.hours)}</p>
          </div>
          <p className='all-week-message'>- Show All Week’s Timing</p>
          <ul className='current-hours-list'>
            {location?.hours?.map(item => (
              <li><span>{item?.name}</span> <span className="span-time-container">{item?.open ? <>{item?.startTime ? convertTimeToRegualar(item?.startTime) : ""} - {item?.endTime ? convertTimeToRegualar(item?.endTime) : ""}</> : <span className='danger'>CLOSED</span>}</span></li>
            ))}
          </ul>
        </div>
        <div className='key-words-list-and-amentities'>

        
          <div className='single-col-management-bb'>
            <h3>Keywords ({location?.keywords.length})</h3>
            <ul className="keywords-list-ul-BCreate">
              {location?.keywords ? location?.keywords?.map((item, index) => (<><li>{item}</li></>))  : <p>No Keywords Found</p>}
            </ul>
          </div>
    

          <div className='single-col-management-bb'>
            <h3>Amentites  ({location?.amenities.length})</h3>
            <ul className="keywords-list-ul-BCreate">  
              {location?.amenities.map((item: AmenitieInput) => (
                <li>
                  {/* {iconsLoader(item.label, item.icon)}  */}
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className='single-col-management-bb'>
            <h3>Social Links</h3>
            <ul className="keywords-list-ul-BCreate social-icon-list">
              {location?.social?.map((item, index) => (
                <li><p>{item?.type}</p> <p className={item?.address === "" ? "missing-link" : "success-link"}>{item?.address === "" ? "Missing link" : "Working"}</p></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LGeneral;
