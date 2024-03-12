import React, { useContext, useEffect, useRef, useState } from 'react'
import "./style.css";
import mapboxgl from 'mapbox-gl';
import { IStorageLocation } from '../../../common/Interfaces/IStorageLocation';
import { Location } from '../../../API';
import * as turf from '@turf/turf'; 
import LInquireManage from '../../backend/Admin/locationInquires/manage/LInquireManage';
import { categories } from '../../../common/util/categories';
import { DatabaseContext } from '../../../setup/context-manager/dbContext';
import { AnyPtrRecord } from 'dns';
import { Zoom } from 'react-toastify';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ5YW5iaGFsbGEiLCJhIjoiY2ttbWMxYjN0MG4zNzJ2b2RzenNtNHloeCJ9.D28HxdUCUpf7YpvsQZ26AQ';
interface props {
  locations?: Location[]
}

export const LiveGallery = (prop: props) => {
  const {fetchPublicObject, calculateRange, getLocationByGEO} = useContext(DatabaseContext);
  const mapContainer = useRef<any>(null);
  const [showLocationInfo, setLocationInfo] = useState<Location | null>(null);
  const map = useRef<any>(null);
  const [locationsList, setLocationList] = useState<Location[] | null>(null);
  const [userData, setUserData] = useState<IStorageLocation>();
  const [locationBanner, setLocationBanner] = useState<any>();

  useEffect(() => {
    const data:IStorageLocation = JSON.parse(localStorage.getItem("userLocationStorageViewLive") || "");
    setUserData(data);
    createMap(data.geo.latitude, data.geo.longitude, data.coverage_area);
  }, []);

  useEffect(() => {
    if(prop.locations != undefined && prop.locations != null) {
      setLocationList(prop?.locations);
    }
  }, [prop.locations]);


  const createMap = (lat:any, lng:any, myZone: any) => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/aryanbhalla/clqziy5cm00e201qv3n9h2uwx',
      center: [lng, lat],
      dragRotate: false,
      zoom: 13,
      pitch: 60, // Set the pitch to make the map 3D
      bearing: -17.6, // Adjust the bearing for a better perspective
    });

    var newCenter = map.current.getCenter();
    newCenter.lng -= 0.015; 

    map.current.jumpTo({
      center: newCenter
    });

    const navigation = new mapboxgl.NavigationControl();
    map.current.addControl(navigation, 'bottom-right');

    const center:any = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    };

    const circle = turf.circle(center, myZone, { steps: 64, units: 'kilometers' });

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
          'fill-opacity': 0.1
        }
      });

      map.current.on('moveend', () => {
        // Get the updated center coordinates after the map has moved
        const center = map.current.getCenter();
        fetchLocations(center, myZone);
      });
    });

    
  
    


    // Current User Marker
    var markerContainer = document.createElement('div');
    markerContainer.className = 'marker-container';

    var marker = document.createElement('div');
    marker.className = 'marker';

    var animationRing = document.createElement('div');
    animationRing.className = 'animation-ring';

    markerContainer.appendChild(animationRing);
    markerContainer.appendChild(marker);

    new mapboxgl.Marker(markerContainer)
      .setLngLat([lng, lat])
      .addTo(map.current);
  };

  useEffect(() => {
    if(locationsList != null) {
      locationsList.forEach((item: Location) => {
        var locationContainer = document.createElement('div');
        locationContainer.className = 'custom-marker';

        //locationContainer.setAttribute('data-location-id', item.id);

        locationContainer.addEventListener('click', function() {
          setLocation(item);
        });
        
        var markerSub = document.createElement('div');
        markerSub.className = 'marker-location';
        markerSub.innerHTML = `<i class="${categories[item.category]}"></i>`;
        
        var pointAtBottom = document.createElement('div');
        pointAtBottom.className = 'point-at-bottom';

        var infoBanner = document.createElement('div');
        infoBanner.className = 'info-banner';
        infoBanner.innerHTML = `
          <div class="single-loc-burst"> 
            <p>Video Playing....</p>
          </div>
          <section>
            <h3>${item.name}</h3>
            ${
              item.avgRating !== null && item.Reviews?.items && item.Reviews.items.length > 0 ?
              `<p class="top-address"><i class="bi bi-star-fill review-color"></i> ${item.avgRating && item.avgRating.toFixed(1)} (${item.Reviews.items.length} ${item.Reviews.items.length !== 1 ? "Reviews" : "Review"})</p>` :
              ""
            }
            <p>${item.category} <i class="bi bi-dot"></i> ${item.address.address}</p>
            <p class="store-open-status">Open</p>
          </section>
        `;

        

        locationContainer.appendChild(markerSub);
        locationContainer.appendChild(pointAtBottom);
        locationContainer.appendChild(infoBanner);


        new mapboxgl.Marker(locationContainer)
          .setLngLat([item.longitude, item.latitude])
          .addTo(map.current);
      });
    }
  }, [locationsList, map.current]);


  const drawLocation = () => {
    if(locationsList != undefined) {
      map.current.on('load', () => {
        locationsList.forEach((item: Location) => {
          var locationContainer = document.createElement('div');
          locationContainer.className = 'custom-marker';

          //locationContainer.setAttribute('data-location-id', item.id);

          locationContainer.addEventListener('click', function() {
            setLocation(item);
          });
          
          var markerSub = document.createElement('div');
          markerSub.className = 'marker-location';
          markerSub.innerHTML = `<i class="${categories[item.category]}"></i>`;
          
          var pointAtBottom = document.createElement('div');
          pointAtBottom.className = 'point-at-bottom';

          var infoBanner = document.createElement('div');
          infoBanner.className = 'info-banner';
          infoBanner.innerHTML = `
            <div class="single-loc-burst"> 
              <p>Video Playing....</p>
            </div>
            <section>
              <h3>${item.name}</h3>
              ${
                item.avgRating !== null && item.Reviews?.items && item.Reviews.items.length > 0 ?
                `<p class="top-address"><i class="bi bi-star-fill review-color"></i> ${item.avgRating && item.avgRating.toFixed(1)} (${item.Reviews.items.length} ${item.Reviews.items.length !== 1 ? "Reviews" : "Review"})</p>` :
                ""
              }
              <p>${item.category} <i class="bi bi-dot"></i> ${item.address.address}</p>
              <p class="store-open-status">Open</p>
            </section>
          `;

          

          locationContainer.appendChild(markerSub);
          locationContainer.appendChild(pointAtBottom);
          locationContainer.appendChild(infoBanner);


          new mapboxgl.Marker(locationContainer)
            .setLngLat([item.longitude, item.latitude])
            .addTo(map.current);
        });
      });
    }
  }

  async function fetchLocations(center: any, radius: any) {
    const lat = center.lat;
    const lng = center.lng;

    try {
      const range = await calculateRange(lat, lng, 10);
      const response = await getLocationByGEO(range.maxLat, range.minLat, range.maxLon, range.minLon);
      setLocationList(response.data.listLocations.items);
    } catch(e) {
      console.log(e);
    }
    
    
   // // Use the center coordinates to fetch locations
    // Replace this with your actual fetching logic
    //console.log('Fetching locations based on center:', center);
  }

  useEffect(() => {
    console.log(locationsList);
    drawLocation();
  }, [locationsList]);


  const flyToLocation = (lng:number, lat:number) => {
    map.current.flyTo({
      center: [lng, lat],
      zoom: 14,
      pitch: 60, // Set the pitch to make the map 3D
      bearing: -17.6, // Adjust the bearing for a better perspective
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    })
  }

  const resetLocation = () => {
    if(userData?.geo.longitude != undefined && userData?.geo.latitude != undefined) {
      flyToLocation(userData?.geo.longitude, userData?.geo.latitude);
    }

    if (map.current.getLayer('line-background')) {
      map.current.removeLayer('line-background');
    }
  
    if (map.current.getLayer('line-dashed')) {
      map.current.removeLayer('line-dashed');
    }

    if (map.current.getSource('route')) {
      map.current.removeSource('route');
    }
    
    setLocationInfo(null);
  }

  const setLocation = (location: Location) => {
    flyToLocation(location.longitude, location.latitude);
    getBannerImage(location);
    setLocationInfo(location);
  }

  const getBannerImage = async (location: Location) => {
    if(location == null || location.images == null) {
      return;
    }
    
    const banner =  location.images[0].key;
    try {
      const res = await fetchPublicObject(banner);
      const img:any = new Image();
      console.log(res);
      img.src = res;
      setLocationBanner(img.src);
    } catch(e) {
      console.log(e);
    }
  }

  const getDirection = async () => {
    if(userData?.geo.longitude == undefined && userData?.geo.latitude == undefined) {
      return
    }

    const startCoord:any = [userData?.geo.longitude, userData?.geo.latitude];
    const endCoord:any = [showLocationInfo?.longitude, showLocationInfo?.latitude];

    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${startCoord[0]},${startCoord[1]};${endCoord[0]},${endCoord[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const route = data.routes[0].geometry.coordinates;
        animateRoute(map.current, route);
      })
      .catch(error => {
        console.error('Error fetching directions:', error);
      });

      map.current.fitBounds([startCoord, endCoord], {
        padding: {top: 12, bottom:25, left: 50, right: 5},
        maxZoom: 12,
      });
  }

  const animateRoute = (map:any, route:any) => {
    const lineString:any = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [],
      },
    };

    map.addSource('route', {
      type: 'geojson',
      data: lineString,
    });

    map.addLayer({
      id: 'line-background',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': "#fff",
        'line-width': 3,
        'line-opacity': .9
      },
    });

    map.addLayer({
      id: 'line-dashed',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': "#fff",
        'line-width': 3,
        'line-dasharray': [0, 4, 3]
      },
    });


    const numPoints = route.length;
    route.forEach((coord:any, index:any) => {
      setTimeout(() => {
        lineString.geometry.coordinates.push(coord);
        map.getSource('route').setData(lineString);
      }, index * 100); // Adjust the delay as needed
    });
  };

  const goBackToLocation = () => {
    resetLocation();
  }

  return (
    <>
      <div className='live-gallery'>
        <div className='map-container-live-gallery' ref={mapContainer}></div>
        <div className='location-list'>
          <div className={showLocationInfo === null ? 'show-list' : 'hide-list'}>
            <div className='header-search-lv-g'>
              <h1>Live Gallery</h1>
              <div className='search-filed-vl'>
                <i className="bi bi-search"></i>
                <input placeholder='What are you looking for'></input>
              </div>
            </div>
            <div className='location-result-container'>
              <ul>
                {prop.locations?.map((item: Location, index: any) => (
                  <li key={index} onClick={() => setLocation(item)}>
                    <div>
                      <div>
                        
                      </div>
                      <div className='right-vl-single-location'>
                        <h2>{item.name}</h2>
                        <div className='review-type-singl-vl'>
                          <p>{item.avgRating != null ? <><i className="bi bi-star-fill review-color"></i> {item.avgRating.toFixed(1)} ({item.Reviews?.items.length} {item.Reviews?.items && item.Reviews?.items.length > 1 ? "Reviews" : "Review"})</> : "No Reviews"}</p>
                          <i className="bi bi-dot"></i>
                          <p>{item.category}</p>
                        </div>
                        <div className='review-type-singl-vl'>
                          <p>{item.address.city}, {item.address.state}</p>
                          <i className="bi bi-dot"></i>
                          <p>{item.phoneNumber}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <i className="bi bi-chevron-right"></i>
                    </div>
                    
                  </li>
                ))}
              </ul>
            </div>
            <div>

            </div>
          </div>

          <div className={showLocationInfo === null ? 'result-box hide-single-location' : 'result-box show-info'}>
            <div className='banner-location-img-ls'>
              <button className='prev-button-single-location-lg' onClick={goBackToLocation}><i className="bi bi-arrow-left"></i></button>
              <img srcSet={locationBanner} />
            </div>
            <div className='detail-section-location'>
              <div className='header-location-ls-single'>
                <h2>{showLocationInfo?.name}</h2>
                <div className='review-type-singl-vl'>
                  <p>{showLocationInfo?.avgRating != null ? <><i className="bi bi-star-fill review-color"></i> {showLocationInfo.avgRating.toFixed(1)} ({showLocationInfo.Reviews?.items.length} {showLocationInfo.Reviews?.items && showLocationInfo.Reviews?.items.length > 1 ? "Reviews" : "Review"})</> : "No Reviews"}</p>
                  <i className="bi bi-dot"></i>
                  <p>{showLocationInfo?.category}</p>
                </div>

                <div className='action-single-location-ls-gallery'>
                  <button onClick={getDirection}><i className="bi bi-map"></i> Directions</button>
                  <button><i className="bi bi-ticket-detailed"></i>Details</button>
                </div>
              </div>
              <div className=''>


              </div>
             
            </div>
          </div>
        </div>

        <button className='back-to-website'><i className="bi bi-arrow-left"></i> Go Back</button>
      </div>
    </>
  )
}


