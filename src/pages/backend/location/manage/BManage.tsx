import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, Route, Routes, useParams, useNavigate} from 'react-router-dom';
import "./style.css";
import { DatabaseContext } from '../../../../setup/context-manager/dbContext';
import { getLocation } from '../../../../graphql/queries';
import { Location, UpdateLocationInput } from '../../../../API';
import { ModualPop } from '../../../../common/Components/module-pop/ModualPop';
import { LocationStatusSet } from './review/Components/location-status-set/LocationStatusSet';
import { updateLocation } from '../../../../graphql/mutations';
import { toast } from 'react-toastify';

const BManage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {pullObj, updateLocationFunction} = useContext(DatabaseContext);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [showLocationPause, setShowLocationPause] = useState<boolean>(false);
  const [images, setImages] = useState({
    profile: "",
    main: "",
    storeOne: "",
    storeTwo: "",
    storeThree: "",
    storeFour: "",
  });

  useEffect(() => {
    pullLocation();
  }, []);

  useEffect(() => {
    getImages();
  }, [currentLocation])

  const pullLocation = async () => {
    try {
      const data = await pullObj(getLocation, id);
      //console.log(data);
      if(data.data.getLocation != null) {
        setCurrentLocation(data.data.getLocation);

      } else {
        navigate('/dashboard/locations');
      }
      
    } catch(e) {
      console.log(e);
    }
  }

  const getImages = async () => {
    const gallery = currentLocation?.images;
    if(gallery) {
      for(let i = 0; i <  gallery?.length; i++) {
        const currentItem = gallery[i];

        setImages(prev => (
          {...prev, [currentItem.type]: currentItem.key}
        ));
      }
    }
  }

  const changeLocationStatus = async (status: boolean) => {
    if(currentLocation?.id != null) {
      const variable: UpdateLocationInput = {
        id: currentLocation?.id && currentLocation?.id,
        isPublished: status
      }

      try {
        const response = await updateLocationFunction(updateLocation, variable);
        await pullLocation();
        setShowLocationPause(false);
        if(status) {
          toast.success("Location status changed to published");
        } else {
          toast.success("Location status changed to paused");
        }
      } catch(e) {
        console.log(e);
      }
    }
    
  }

  return (
    <div className='bbView-container'>
      <div className='dash-header-page'>
        <div className='name-path-dash-page'>
          <h2>{currentLocation?.name}</h2>
          <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i> Location <i className="bi bi-chevron-right"></i> Manage</p>
        </div>
        <div className='action-button-container-dash'>
          <Link to="/dashboard/locations" className='link-button btn-primary'><i className="bi bi-arrow-left"></i> Back</Link>
          <Link to={`/dashboard/locations/edit/${id}`} className='link-button btn-primary'>Edit</Link>
          {/* <Link to={`/dashboard/locations/addUser/${id}`} className='link-button btn-primary'>Add Location Manager</Link> */}
          <Link to="" className='link-button light-button' onClick={() => setShowLocationPause(!showLocationPause)}>{currentLocation?.isPublished ? <><i className="bi bi-pause"></i> Pause Business</> : <><i className="bi bi-play"></i>Publish Business</>}</Link>
        </div>
      </div>
      <div className='manage-bb-content-box'>
        <ul>
          <li><Link to={"/dashboard/locations/"+id}>General</Link></li>
          <li><Link to={"/dashboard/locations/"+id+"/analytics"}>Analytics</Link></li>
          {/* <li><Link to="/dashboard/business/123123232/advertise">Advertise</Link></li> */}
          <li><Link to={"/dashboard/locations/"+id+"/reviews"}>Review</Link></li>
          <li><Link to={"/dashboard/locations/"+id+"/settings"}>Settings</Link></li>
        </ul>
        {currentLocation && !currentLocation?.isPublished && <div className='currentStatus-business-status'>
          <div className='icon-wait'>
            <i className="bi bi-pause"></i>
          </div>
          <div className='status-pending'>
            <h3>Location is Paused</h3>
            <p>Your location is currently paused, so no user will be available to visit your page</p>
          </div>
        </div>}
        <div className='page-content-for-managing'>
          <Outlet context={[currentLocation, images]}/>
        </div>
      </div>
      <ModualPop show={showLocationPause} child={<LocationStatusSet currentLocation={currentLocation} setShowLocationPause={setShowLocationPause} updateLocation={changeLocationStatus}/> } />
    </div>
  )
}

export default BManage;
