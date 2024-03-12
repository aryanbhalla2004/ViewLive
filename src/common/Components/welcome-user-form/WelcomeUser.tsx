import React, {useState, useRef, useEffect} from 'react'
import "./style.css";
import welcomeImage from "../../../assets/SVG/welcome-image.svg";
import locationSVG from "../../../assets/SVG/location.svg";
import allDone from "../../../assets/SVG/allDone.svg";
import { Button } from '../button/Button';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf'; // Optional: If you want to use the Turf.js library for geo calculations
import { SelectInput } from '../selectInput/SelectInput';
import { IStorageLocation } from '../../Interfaces/IStorageLocation';
mapboxgl.accessToken =`sk.eyJ1IjoiYXJ5YW5zMTIzIiwiYSI6ImNsbG11ODZzMTJiNzczZnFoc3FyaTdpajYifQ.M7OEhEU50r-lzmiSciKTfA`;// 'pk.eyJ1IjoiYXJ5YW5iaGFsbGEiLCJhIjoiY2ttbWMxYjN0MG4zNzJ2b2RzenNtNHloeCJ9.D28HxdUCUpf7YpvsQZ26AQ';
interface ILocation {
  latitude: number,
  longitude: number,
  zoom: number,
}

const optionsSelect = [{name: "5 km", value: 5}, {name: "10 km", value: 10}, {name: "15 km", value: 15}, {name: "20 km", value: 20}, {name: "25 km", value: 25}]
export const WelcomeUser = (props: any) => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [radius, setRadius] = useState<number>(5);
  let mapContainer = useRef<any>(null);
  let map = useRef<any>(null);
  const [state, setState] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const next = () => {
    setState(prev => prev + 1);
  }

  const enableLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(function(position) {
      
      // Log the latitude and longitude
      setLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        zoom: radius
      });
      setLoading(false);
      next();
      
    }, function(error) {
      console.log(error);
    });
  }


  const getLocationByIp = () => {
    //enableLocation();
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ipAddress = data.ip;
        const API = "aa30f0eba3fbde5c1d7c35c17de3d3a2";
        fetch(`http://api.ipstack.com/${ipAddress}?access_key=${API}`)
          .then(response => response.json())
          .then(data => {
            // Get the location data from the response
            const location = `${data.city}, ${data.region_name}, ${data.country_name}`;
            console.log("FROM IP", data.latitude, data.longitude);
            setLocation({
              longitude: data.longitude,
              latitude: data.latitude,
              zoom: radius
            });
            next();
          })
          .catch(error => {
            console.error('Error fetching location:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
      });
  }
  const webgl_support = () => { 
    try {
     var canvas = document.createElement('canvas'); 
     return !!window.WebGLRenderingContext &&
       (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch(e) {
      return false;
    }
  };
  useEffect(() => {

    if(location) {
      if(webgl_support()) {
        createMap(location?.latitude, location?.longitude);
      }
      console.log(location);
    }

    console.log("update Ruin");

  }, [location, radius]);

  const createMap = (lat:any, lng:any) => {
    let zoom = 10;
    if(radius == 10) {
      zoom = 9;
    } else if (radius == 15) {
      zoom = 8.5;
    } else if (radius == 20) {
      zoom = 8;
    } else if (radius == 25) {
      zoom = 8;
    }
    map.current = null;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [lng, lat],
      zoom: zoom
    });


    const marker1 = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);

    const center:any = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    };
    
    const circle = turf.circle(center, radius, { steps: 64, units: 'kilometers' });

    map.current.on('load', () => {
      map.current.addLayer({
        id: 'circle',
        type: 'fill',
        source: {
          type: 'geojson',
          data: circle
        },
        paint: {
          'fill-color': '#e0e3fb',
          'fill-opacity': 0.4
        }
      });
    });
  };

  const finishForm = () => {
    const userStorageObject: IStorageLocation = {
      geo: {
        latitude: location?.latitude,
        longitude: location?.longitude,
      },
      coverage_area: radius,
      createdDate: new Date(),
      location_data: "GPS",
    }

    localStorage.setItem("userLocationStorageViewLive", JSON.stringify(userStorageObject));
    props.setPopupFirstUserModal(false);
  }

  const selectRaduisChange = (data: any) => {
    setRadius(data['area-covered']);
  }

  return (
    <>
    {state === 1 &&
    <div className='welcome-box-main-container animated-entry-form-signup'>
      <div className='main-welcome-message'>
        <h2>Welcome, To <span className="primary-text">Views.Live</span></h2>
        <img src={welcomeImage} width={200}></img>
        <p>Welcome to our website! We're glad you're here. Feel free to look around and discover all we have to offer. If you need any assistance, just let us know. Enjoy your visit!</p>
        <div className='button-container-welcome'>
          <button className="light-button-gray" onClick={next}>Continue<i className="bi bi-arrow-right"></i></button>
        </div>
      </div>
    </div>}

    {state === 2 &&  <div className='welcome-box-main-container animated-entry-form-signup'>
      <div className='main-welcome-message'>
        <h2>Enable Location</h2>
        <img src={locationSVG} width={200}></img>
        <p>To suggest nearby stations, we require your location information. This helps us personalize your experience and provide relevant recommendations.</p>
        <div className='button-container-welcome'>
          <button className="light-button-gray" onClick={enableLocation}>Enable</button>
          <button className="text-button-pop-location" onClick={getLocationByIp}>Do Not Allow</button>
        </div>
        {loading && <div className='loading-window'>
            <span className="loader-spin"></span>
            <h1>Loading</h1>
          </div>}
      </div>
    </div>}

    {state === 3 && location != null &&  <div className='welcome-box-main-container animated-entry-form-signup'>
      <div className='main-welcome-message remove-padding'>
        <div ref={mapContainer} className="map-box-container" />
        <div className='map-region-area'>
          <h3>Your Region</h3>
          <div className='user-changes-location-form'>
            <SelectInput changeValue={selectRaduisChange} options={optionsSelect} name="area-covered" label='Area Covered (Radius in Km)' default='5 km'/>
          </div>
          <p>The region displayed above represents your current covered area, ensuring access to relevant information. If there is no data available in a specific region, the coverage area will expand automatically to provide you with more information. </p>
          
          <div className='button-container-welcome'>
            <button className="light-button-gray" onClick={next}>Continue</button>
          </div>
        </div>
      </div>
    </div>}

    {state === 4 && <div className='welcome-box-main-container animated-entry-form-signup'>
      <div className='main-welcome-message'>
        <h2>All Set!</h2>
        <img src={allDone} width={200}></img>
        <p>Congratulations, you have successfully completed the form! Thank you for taking the time to provide us with the necessary information.</p>
        <div className='button-container-welcome'>
          <Button text='Finish' loading={false} onClick={finishForm}></Button>
        </div>
      </div>
    </div>}
    </>
  )
}
