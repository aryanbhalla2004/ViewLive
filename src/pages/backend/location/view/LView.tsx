import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { listLocations, listBusinesses } from '../../../../graphql/queries';
import { DatabaseContext } from '../../../../setup/context-manager/dbContext';
import {Business,Location, Status} from "../../../../API";
import waiting from "../../../../assets/SVG/waiting-dashboard.svg";
import newLocation from "../../../../assets/SVG/newlocation.svg";
import './style.css';
import Loading from '../../../../common/Components/pre-loader/Loading';
import { ModualPop } from '../../../../common/Components/module-pop/ModualPop';
import { PopupStory } from '../view-live-story/PopupStory';

const BView = () => {
 // const [data]:any = useOutletContext();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState<String>("WAITING");
  const [myBusiness,setBusiness] = useState<Business>();
  const [locationCount, setLocationCount] = useState("WAITING");
  const [myLocations,setLocations] = useState<Location[]>();
  const {fetchData } = useContext(DatabaseContext);
  const [postStoryData, setPostStoryData] = useState<Location | null>(null);

  useEffect(() => {
    pull();
  }, []);

  useEffect(() => {
    if(myBusiness != null) {
      if(myBusiness.status !== Status.APPROVED) {
        setIsValid("PENDING");
      } else {
        setIsValid("COMPLETE");
        pullLocation();
      }
    }
    
  }, [myBusiness]);
  
  const pull = async () => {
    const item = await fetchData(listBusinesses);
    setBusiness(item.data.listBusinesses.items[0]);
  }

  const pullLocation = async () => {
    const items = await fetchData(listLocations);
    setLocations(items.data.listLocations.items);
    if(items.data.listLocations.items.length > 0) {
      setLocationCount("COMPLETE");
    } else {
      setLocationCount("PENDING");
    }
  }

  const timeLeft = (time: any) => {
    // Get the current time
    const currentTime = new Date();

    const timeParsed:any = currentTime.getTime().toString().slice(0, -3);
    // Calculate the difference in milliseconds between the current time and the timestamp
    const differenceMs = time - timeParsed;

    const hoursLeft = Math.floor(differenceMs / ( 60 * 60));

    return hoursLeft;
  };

  const formatTime = (hoursLeft: any) => {
    if(hoursLeft >= 2) {
      return "Expires in " + hoursLeft + " Hours";
    } else if(hoursLeft == 1) {
      return "Expires in " + hoursLeft + " Hour";
    } else if (hoursLeft == 0) {
      return "Expires in less then an hour";
    } else {
      return "Expired";
    }
  }

  return (
    <>
      <div className='bbView-container'>
        <div className='dash-header-page'>
          <div className='name-path-dash-page'>
            <h2>My Locations</h2>
            <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i> Locations</p>
          </div>
          <div className='action-button-container-dash'>
            {isValid === "COMPLETE" && <Link to="/dashboard/locations/create" className='link-button btn-primary'><i className="bi bi-plus-lg"></i> Add New Location</Link> }
          </div>
        </div>
        <table className='table-of-items'>
          <thead>
            <th>Business <i className="bi bi-arrow-down"></i></th>
            <th>Status</th>
            <th>Story</th>
          </thead>
          <tbody>  
            {
            isValid === "WAITING" ? <Loading /> : isValid === "PENDING" ? 
              <div className='waiting-aprocal-box-desgine'>
                <img src={waiting} width={500} />
                <h2>Pending Approval</h2>
                <p>Thank you for submitting your request. Your request is currently pending approval and will be processed as soon as possible. We appreciate your patience and understanding. If you have any questions or concerns, please don't hesitate to reach out to us.</p>
              </div> : locationCount === "WAITING" ? <Loading/> : locationCount === "PENDING" ? <div className='waiting-aprocal-box-desgine'>
                <img src={newLocation} width={300} />
                <h2>Create Your First Location</h2>
                <p>We noticed that you haven't made any entries yet. Don't worry, it's easy to get started. Simply click on the 'Create New Entry' button to begin. We can't wait to see what you create. If you have any questions or need assistance, please feel free to reach out to our support team.</p>
              </div> : myLocations?.map((item: Location) => (
                <tr>
                  <td className='single-location-icon-style'>
                    {!item?.isPublished ? <i className="bi bi-pause"></i>: <i className="bi bi-play"></i>}
                    <div className='company-info-bview' onClick={e => navigate('/vendor/' + item.id)}>
                      <h3>{item.name}</h3>
                      <p>{item.address.address}, {item.address.city} {item.address.state}, {item.address.postalcode} {item.address.country}</p>
                    </div>
                  </td>
                  <td>{item.status === Status.WAITING && <div className='status-bar-view-location'><i className="bi bi-three-dots"></i>In Review</div>} {item.status === Status.APPROVED && <div className='status-bar-view-location'><i className="bi bi-broadcast"></i>{item.status}</div>} {item.status === Status.REJECTED && <div className='status-bar-view-location suspended-style'><i className="bi bi-broadcast"></i>{item.status}</div>}</td>
                  <td>
                    <div className='post-story-container'>
                      {item.LiveSnap === null ? <>
                      <button className='btn-primary' onClick={() => setPostStoryData(item)}><i className="bi bi-camera" ></i> Add Story</button>
                      </> : <>
                        <button className='danger-button' onClick={() => setPostStoryData(item)}><i className="bi bi-trash3"></i>Delete Story</button> 
                        <p>{formatTime(timeLeft(item.LiveSnap?.expirationUnixTime))}</p>
                      </>}
                    </div>
                  </td>
                  <td><Link to={"/dashboard/locations/"+item.id} className='light-button link-button'>Manage Location</Link></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <ModualPop show={postStoryData !== null ? true : false} child={<PopupStory postStoryData={postStoryData} setPostStoryData={setPostStoryData} pullLocation={pullLocation}/>}/>    </>
  )
}

export default BView;