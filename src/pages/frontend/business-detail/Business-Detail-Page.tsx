import React, { useContext, useEffect, useRef, useState } from 'react'
import "./style.css";
import {CognitoUser} from "@aws-amplify/auth";
import { v4 as uuidv4 } from 'uuid';
import { AmenitieInput, CreateReviewInteractionsInput, Location, LocationHours, Review, ReviewInteractions } from '../../../API';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { DatabaseContext } from '../../../setup/context-manager/dbContext';
import { Rating } from 'react-simple-star-rating'
import Moment from 'react-moment';
import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import logo from "../../../assets/Brand/logo.jpeg";
 
import noData from "../../../assets/SVG/no-data.svg";
import img from "../../../assets/Images/family.jpg";
import { AccountContext } from '../../../setup/context-manager/AuthContext';
import { ModualPop } from '../../../common/Components/module-pop/ModualPop';
import { ViewStory } from './Components/view-story/ViewStory';
import { PostReview } from './Components/review-box/PostReview';
import { LikedButton } from '../../../common/Components/like-button/LikedButton';
import { categories } from '../../../common/util/categories';
import { getIcon } from '../../../common/util/iconHelper';
import { getLocation, getReviewInteractions } from '../../../common/util/api_queries';
import { ReportReview } from './Components/report-review/ReportReview';
import { getReview, listReviewInteractions, reviewInteractionsByReviewID } from '../../../graphql/queries';
import { createReviewInteractions, deleteReviewInteractions, updateReviewInteractions } from '../../../graphql/mutations';
import { ReviewReply } from './Components/review-reply/ReviewReply';

mapboxgl.accessToken = `pk.eyJ1IjoiYXJ5YW5zMTIzIiwiYSI6ImNsbG11ZXZvZjAydjYzcG8wNW5pam5hMmoifQ.vZFQSu0n3C5gW5dqjFPUxg`;//'pk.eyJ1IjoiYXJ5YW5iaGFsbGEiLCJhIjoiY2ttbWMxYjN0MG4zNzJ2b2RzenNtNHloeCJ9.D28HxdUCUpf7YpvsQZ26AQ';



export const BusinessDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {getUser, getUserProfile} = useContext(AccountContext);
  const {pullDataAPI, fetchPublicObject, pullObj, pullDataFilter, pullDataPaginationAPI, pushDataUser, deleteById} = useContext(DatabaseContext);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  
  const [distance, setDistance] = useState<any>();
  const [showReviewBox, setShowReviewBox] = useState<boolean>(false);
  const [viewStory, setViewStory] = useState<boolean>(false); 
  const [reportReview, setReportReview] = useState<boolean>(false);
  const [reviewReply, setReviewReply] = useState<Review | null>(null);
  const [reportReviewId, setReportReviewId] = useState<any>("");
  const mapContainer = useRef<any>(null);
  const reviewSection = useRef<any>(null);
  const map = useRef<any>(null);
  const [images, setImages] = useState({
    profile: "",
    main: "",
    storeOne: "",
    storeTwo: "",
    storeThree: "",
    storeFour: "",
  });

  const [reviewSort, setReviewSort] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    total: 0,
  });

  const setReviewCount = (rev: (Review | null)[] | undefined) => {
    setReviewSort({
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      total: 0,
    });

    if(rev != undefined) {
      if(rev != null) {
        setReviewSort(prev => {
          return {...prev, total: rev.length}
        });

        for(let i = 0; i < rev.length; i++) {
          const num = rev[i]?.rating;
          if(num != undefined) {
            const rat = Math.floor(num);

            if(rat === 5) {
              setReviewSort(prev => {
                return {...prev, five: prev.five + 1}
              })
            } else if (rat === 4) {
              setReviewSort(prev => {
                return {...prev, four: prev.four + 1}
              })
            } else if (rat === 3) {
              setReviewSort(prev => {
                return {...prev, three: prev.three + 1}
              })
            } else if (rat === 2) {
              setReviewSort(prev => {
                return {...prev, two: prev.two + 1}
              })
            } else if (rat === 1){
              setReviewSort(prev => {
                return {...prev, one: prev.one + 1}
              })
            }
          }
        }
      }
    }
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
    pullLocation();
    window.scroll(0, 0);
  }, []);

  const createMap = (lat:any, lng:any) => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [lng, lat],
      zoom: 13,
      maxZoom: 13,
      minZoom: 13 
    });


    const marker1 = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);
  };


  useEffect(() => {
    if(currentLocation?.address.geoLocation != undefined) {
   
      if (webgl_support()){
        createMap(currentLocation?.address.geoLocation?.lat, currentLocation?.address.geoLocation?.lng);
      }
      calculateDistance(currentLocation?.address.geoLocation?.lat, currentLocation?.address.geoLocation?.lng)
    }

    getImages();
    setReviewCount(currentLocation?.Reviews?.items);
    
  }, [currentLocation]);

  const getImages = async () => {
    const gallery = currentLocation?.images;
    if(gallery) {
      for(let i = 0; i <  gallery?.length; i++) {
        const currentItem = gallery[i];

        setImages(prev => (
          {...prev, [currentItem.type]: currentItem.key}
        ));
        // try {
        //   const res = await fetchPublicObject(currentItem.key);
        //   console.log(res);
          
        // } catch(e) {
        //   setImages(prev => (
        //     {...prev, [currentItem.type]: ""}
        //   ));
        // }
      }

      // const profile = currentLocation.locationImage;
      // setImages(prev => (
      //   {...prev, [currentItem.type]: currentItem.key}
      // ));
      // try {
      //   const res = await fetchPublicObject(profile);
      //   setImages(prev => (
      //     {...prev, profile: res}
      //   ));
      // } catch(e) {
      //   setImages(prev => (
      //     {...prev, profile: ""}
      //   ));
      // }
    }
    
  }

  // const testImage = async () => {
  //   try {
  //     const res = await fetchPublicObject("Aryan Bhalla/The Keg Steak House/main.jpg");
  //     console.log(res);
  //     // setImages(prev => (
  //     //   {...prev, profile: res}
  //     // ));
  //   } catch(e) {
  //     console.log(e);
  //     // setImages(prev => (
  //     //   {...prev, profile: ""}
  //     // ));
  //   }
  // }

  const pullLocation = async () => {
    try {
      const data = await pullDataPaginationAPI(getLocation, id, 10,"ASC", null);
      const userProfile = getUser();
      setUserProfile(userProfile);
      console.log(data);
      if(data.data.getLocation != null) {
        if(data.data.getLocation.isPublished) {
          setCurrentLocation(data.data.getLocation);
        } else {
          navigate('/404');
        }
      } else {
        navigate('/404');
      }
      
    } catch(e) {
      console.log(e);
    }
  }

  const calculateDistance = (lat:any, lng:any) => {
    const coord1 = [lng, lat]; // longitude, latitude of San Francisco

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const coord2 = [longitude, latitude];
        const from = turf.point(coord1);
        const to = turf.point(coord2);
        const options:any = { units: 'kilometers' }; // or 'kilometers', 'meters', 'feet', etc.
        const distance = turf.distance(from, to, options);
        setDistance(distance.toFixed(2))
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }


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

  const scrollTo = () => { 
    window.scrollTo({ top: reviewSection.current.offsetTop, behavior: 'smooth'});
  };

  const isAbleToVide = () => {
    if(currentLocation?.LiveSnap != null) {
      setViewStory(true);
    }
  }


  const iconsLoader = (label:any, icon:string) => {
    console.log(icon);
    let Icon =  getIcon(icon);
    return (
      <div>
        <li>{Icon && <Icon />}</li>
      </div>
      
    );

    return (<></>)
  };

  const openReportReview = (id: any) => {
    setReportReviewId(id);
    setReportReview(true);
  }


  const onReactReview = async (isLiked: boolean, reviewId: any) => {
    if(userProfile === null) {
      navigate('/auth');
    }

    try {
      const findCurrentReaction = await pullDataFilter(reviewInteractionsByReviewID, {reviewID: reviewId}, "USER");
      const reviewInteraction: ReviewInteractions[] = findCurrentReaction.data.reviewInteractionsByReviewID.items;
      const userId = userProfile.username;
      //! Check if the user already has a interaction
      const userInteraction = reviewInteraction.find(item => item.owner === userId);

      if(userInteraction === undefined) {
        const reactionId = uuidv4();
        const newReviewInteraction:  CreateReviewInteractionsInput = {
          id: reactionId,
          reviewID: reviewId,
          reaction: isLiked ? 0 : 1
        }

        const sampleDataForInteraction : ReviewInteractions = {
          __typename: "ReviewInteractions",
          id: reactionId,
          reviewID: reviewId,
          reaction: isLiked ? 0 : 1,
          createdAt: "",
          updatedAt: "",
          owner: userProfile.username,
        }

        const modifiedReviews = (currentLocation?.Reviews?.items || []).map((item: Review | null) => {
          if(item?.id === reviewId) {
            item?.ReviewInteraction?.items.push(sampleDataForInteraction);
          }

          return item;
        });

        setCurrentLocation((prev: Location | any) => {
          return {...prev, Reviews: {...prev.Reviews, items: modifiedReviews}}
        });
       
        const postReaction = await pushDataUser(createReviewInteractions, newReviewInteraction);
        console.log(postReaction);
        //const responseData = postReaction.data.createReviewInteractions;
       
      } else {
        if(userInteraction.reaction === 0 && isLiked || userInteraction.reaction === 1 && !isLiked) {
          
          const leftOverInteractions = (currentLocation?.Reviews?.items || []).map((item: Review | null) => {
            if(item?.id === reviewId && item?.ReviewInteraction) {
              item.ReviewInteraction.items = item?.ReviewInteraction?.items.filter((interactionItem) => {
                return interactionItem?.id != userInteraction.id;
              });
            }

            return item;
          });

          setCurrentLocation((prev: Location | any) => {
            return {...prev, Reviews: {...prev.Reviews, items: leftOverInteractions}}
          });

          const deleteInteraction = await deleteById(deleteReviewInteractions, userInteraction.id);
          console.log(deleteInteraction);
        } else {
          const updateReactionValue = userInteraction.reaction === 0 ? 1 : 0;
          const updateInteraction = (currentLocation?.Reviews?.items || []).map((item: Review | null) => {
            if(item?.id === reviewId && item?.ReviewInteraction) {
              item.ReviewInteraction.items = item?.ReviewInteraction?.items.map((interactionItem) => {
                if(interactionItem?.id === userInteraction.id) {
                  interactionItem.reaction = updateReactionValue;
                }

                return interactionItem;
              });
            }

            return item;
          });

          setCurrentLocation((prev: Location | any) => {
            return {...prev, Reviews: {...prev.Reviews, items: updateInteraction}}
          });

          const updateReaction = await pushDataUser(updateReviewInteractions, {id: userInteraction.id, reaction: updateReactionValue});
          console.log(updateReaction);
        }
      }
    } catch(e) {
      console.log(e);
    }
  }

   
  return (
    <>
    <div className='single-business-page'>
      <div className='content-sizing business-page-container-detail'>
        <div className='single-page-business-header'>
          <div className='left-side-container-header'>
            <h1 className='single-location-header'>{currentLocation?.name} 
              {currentLocation?.category && (
                <span>
                  <i className={currentLocation.category ? categories[`${currentLocation.category}`] : ""}></i>
                  {currentLocation.category}
                </span>
              )}
            </h1>
            <div className='sub-info-header'>
              {currentLocation?.Reviews?.items.length != undefined && currentLocation?.Reviews?.items.length > 0 ? <>
              <p className='start-location'><i className="bi bi-star-fill"></i> {currentLocation.avgRating?.toFixed(1)}</p>
              <i className="bi bi-dot"></i> 
              <Link to="" onClick={scrollTo}>{currentLocation?.Reviews?.items.length} {currentLocation?.Reviews?.items.length <= 1 ? "Review" : "Reviews"}</Link></> : "No Review" }
              <i className="bi bi-dot"></i> 
              <p>{currentLocation?.address.city} {currentLocation?.address.postalcode}, {currentLocation?.address.state},  <span className='all-uppercase'>{currentLocation?.address.country}</span></p>
            </div>
          </div>
          <div className='right-side-action-button'>
            <button><i className="bi bi-share"></i> Share</button>
            <button><LikedButton liked={false}/> Save</button>
           
          </div>
        </div>

        <div className='galary-photos'>
          <div className="live-video">
            <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${images.main}`}/>
          </div>
          <div className="simple-images-details-vendor main1">
            <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${images.storeOne}`}/>
          </div>
          <div className="simple-images-details-vendor top-round-edge main2">
            <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${images.storeTwo}`}/>
          </div>
          <div className="simple-images-details-vendor main3">
            <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${images.storeThree}`}/>
          </div>
          <div className="simple-images-details-vendor bottom-round-edge main4">
            <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${images.storeFour}`}/>
          </div> 
          <button className='view-live-button'>View Live</button>
        </div>

        <div className='content-below-location-container'>
          <div className='left-side-content-location-data'>
            <div className='top-header-section-location'>
              <div className='header-main-section-location'>
                <div className='single-section-location-data'>
                  <h2>Amenities and More</h2>
                  <ul className='amentites-list-location-data'>
                    {currentLocation?.keywords.map((item: string, index:any) => (
                      index < 4 &&  <li><Link to="">{item}</Link></li>
                    ))}
                  </ul>
                </div>
                <div onClick={isAbleToVide} className={currentLocation?.LiveSnap !== null ? "story-view-button story-view-item-image " : "story-view-item-image "}>
                  <img src={`https://viewlive2-storage-2d9b46fd102200-dev.s3.ca-central-1.amazonaws.com/public/${currentLocation?.locationImage}`}></img>
                </div>
              </div>
              <ul className="amentites-list">

                
                {currentLocation?.amenities.map((item: AmenitieInput) => (
                  <li>{} {item.label}</li>
                ))}
              </ul>

              <button>See all {currentLocation?.amenities.length} Amenities</button>
              <div className='main-div-holding-company-stats'>
                <div className='company-info-single-location'>
                  <i className="bi bi-buildings"></i>
                  <div>
                    <h3>Parent Company</h3>
                    <p>This location is owned and operated by Winnipeg Planet Computer & Technology</p>
                  </div>
                </div>

                <div className='company-info-single-location'>
                  <i className="bi bi-bar-chart-line-fill"></i>
                  <div>
                    <h3>Location Information</h3>
                    <p>The company has 2 location all over Canada</p>
                  </div>
                </div>
              </div>  
            </div>

            <div className='single-section-location-data'>
              <h2>About Us</h2>
              <p className='location-description'>{currentLocation?.description}</p>
            </div>

            <div className='single-section-location-data'>
              <h2>Where you’ll find us</h2>
              <p className='text-above-locatio-section-data'>Our location is approx <b>{distance} km</b> away from your current location.</p>
              <div onClick={e => {window.open("https://www.google.com", "_blank");}}>
                <div ref={mapContainer} className="map-container" />
              </div>
            </div>
          </div>

          <div className='ride-side-bar-location-data'>
            <div className='side-bar-single-item-location-data'>
              <h2>Today’s Business Hours</h2>
              <div className='current-hours'>
                <p>Now: {currentLocation?.hours && getTodayTiming(currentLocation?.hours)}</p>
              </div>
              <p className='all-week-message'>- Show All Week’s Timing</p>
              <ul className='current-hours-list'>
                {currentLocation?.hours?.map(item => (
                  <li><span>{item?.name}</span> <span className="span-time-container">{item?.open ? <>{item?.startTime ? convertTimeToRegualar(item?.startTime) : ""} - {item?.endTime ? convertTimeToRegualar(item?.endTime) : ""}</> : <span className='danger'>CLOSED</span>}</span></li>
                ))}
              </ul>
            </div>
            <div className='side-bar-single-item-location-data'>
              <h2>Contact Information</h2>
              <ul className='contact-info-location-single'>
               <li><i className="bi bi-envelope"></i>{currentLocation?.email}</li>
               <li><i className="bi bi-telephone-inbound"></i>{currentLocation?.phoneNumber}</li>
               <li><i className="bi bi-geo-alt"></i><span>{currentLocation?.address.address}, {currentLocation?.address.city} {currentLocation?.address.postalcode}, {currentLocation?.address.state},  <span className='all-uppercase'>{currentLocation?.address.country}</span></span></li> 
              </ul>
              <ul className='social-icon-location'>
                <li><i className="bi bi-facebook"></i></li>
                <li><i className="bi bi-twitter"></i></li>
                <li><i className="bi bi-instagram"></i></li>
                <li><i className="bi bi-tiktok"></i></li>
              </ul>
            </div>
          </div>  
        </div>

        <div className='review-section-location-data' ref={reviewSection}>
          <div className='header-review-section'>
            <div className='header-info-review-section'>
              <div className='top-header-summary'>
                <div className='left-review-summary'>
                  <i className="bi bi-star-fill"></i>
                </div>
                <div className='right-review-summary'>
                  <h3>{currentLocation?.avgRating?.toFixed(1)} rating</h3>
                  {currentLocation?.Reviews?.items != undefined && currentLocation?.Reviews?.items.length > 0 ?  <p>Based on {currentLocation?.Reviews?.items.length} {currentLocation?.Reviews?.items.length <= 1 ? "review" : "reviews"}</p> : "No review found"}
                </div>
              </div>
              <div className='progress-review-count'>
                <div className='single-bar-count-review'>
                  <p>5</p>
                  <div className="progress-bar">
                    <span className="progress-bar-fill" style={{width: ((reviewSort.five / reviewSort.total) * 100) + "%"}}></span>
                  </div>
                  <p className='count-type-review'>{reviewSort.five}</p>
                </div>
                <div className='single-bar-count-review'>
                  <p>4</p>
                  <div className="progress-bar">
                    <span className="progress-bar-fill" style={{width: ((reviewSort.four / reviewSort.total) * 100) + "%"}}></span>
                  </div>
                  <p className='count-type-review'>{reviewSort.four}</p>
                </div>
                <div className='single-bar-count-review'>
                  <p>3</p>
                  <div className="progress-bar">
                    <span className="progress-bar-fill" style={{width: ((reviewSort.three / reviewSort.total) * 100) + "%"}}></span>
                  </div>
                  <p className='count-type-review'>{reviewSort.three}</p>
                </div>
                <div className='single-bar-count-review'>
                  <p>2</p>
                  <div className="progress-bar">
                    <span className="progress-bar-fill" style={{width: ((reviewSort.two / reviewSort.total) * 100) + "%"}}></span>
                  </div>
                  <p className='count-type-review'>{reviewSort.two}</p>
                </div>
                <div className='single-bar-count-review'>
                  <p>1</p>
                  <div className="progress-bar">
                    <span className="progress-bar-fill" style={{width: ((reviewSort.one / reviewSort.total) * 100) + "%"}}></span>
                  </div>
                  <p className='count-type-review'>{reviewSort.one}</p>
                </div>
              </div>
              <div className='create-review-button-action'>
                <h3>Rate and review</h3>
                <p>When it comes time to purchase a new computer, we don't consider other.</p>
                <button onClick={e => setShowReviewBox(true)} className='create-review-button'><i className="bi bi-pencil-square"></i> Post Review</button>
              </div>
              {/* {currentLocation?.Reviews?.items.length != undefined && currentLocation?.Reviews?.items.length > 0 ? <>
              <p className='start-location'><i className="bi bi-star-fill"></i> {currentLocation.avgRating?.toFixed(1)}</p>
              <i className="bi bi-dot"></i> 
              <span>{currentLocation?.Reviews?.items.length} {currentLocation?.Reviews?.items.length <= 1 ? "Review" : "Reviews"}</span></> :  "No Reviews"} */}
              {/* <span>{currentLocation?.Reviews?.items.length == 0 ? "(4.7 Based on 260 Reviews)" : "No Reviews"}</span> */}
            </div>
           
          </div>
          <ul className='list-of-review'>
          {currentLocation?.Reviews?.items.length != 0 && 

            currentLocation?.Reviews?.items.map((review:Review | null, index:number) => {
              // const userProfileMatchesOwner = userProfile && review && review.owner === user;
              const isCurrentUserOwner = userProfile && review && review.owner === userProfile.username;
              const reviewRepliesCount = review && review.ReviewReplies?.items.length || 0;
              const helpfulYesCount = review && review.ReviewInteraction?.items.filter((item:any) => item.reaction === 0).length || 0;
              const helpfulNoCount = review && review.ReviewInteraction?.items.filter((item:any) => item.reaction === 1).length || 0;
              const isAlreadyInteractedWith = userProfile != null && review && review.ReviewInteraction?.items.find((item:any) => item.owner === userProfile.username)?.reaction;
              return (
                <li key={index}>
                <div>
                  <div className="profile-box-user-review" style={{ backgroundColor: getUserProfile(review?.owner) }}>
                    {review && review.ownerName.toUpperCase()[0]}
                  </div>
                  <div className='review-text-single-main'>
                    <div className='review-text-single'>
                      <h3>{review && review.ownerName}</h3>
                      <span>
                        <Rating allowFraction={false} size={16} initialValue={review?.rating} readonly={true} allowHover={false} />
                        <i className="bi bi-dot"></i>
                        <Moment format='MMM D, YYYY'>{review?.createdAt}</Moment>
                      </span>
                    </div>
                    {/* {userProfileMatchesOwner && (
                      <button className='property-review-button' onClick={() => openReportReview(review.id)}>
                        <i className="bi bi-flag"></i> Report
                      </button>
                    )}
                    {isCurrentUserOwner && (
                      <button className='property-review-button'>
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                    )} */}
                  </div>
                </div>
                <p>{review && review.description}</p>
                <div className='reply-report-section'>
                  <button className='review-reply-button' onClick={() => setReviewReply(review)}>
                    Reply to this review {reviewRepliesCount > 0 && <span className='count-highlight'>{reviewRepliesCount}</span>}
                  </button>
                  {isCurrentUserOwner ? (
                    <div className='report-section-count'>
                      <p>Edit your review?</p>
                      <div>
                        <button className='review-reply-button'>
                          <i className="bi bi-pencil"></i> Modify
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='report-section-count'>
                      <p>Did this review help you?</p>
                      <div>
                        <button className={isAlreadyInteractedWith === 0 ? 'review-reply-button activeButtonInteraction' : "review-reply-button"} onClick={() => onReactReview(true, review?.id)}>
                          <i className="bi bi-hand-thumbs-up-fill"></i> Yes {helpfulYesCount != 0 && <span className='count-highlight'>{helpfulYesCount}</span>}
                        </button>
                        <button className={isAlreadyInteractedWith === 1 ? 'review-reply-button activeButtonInteraction' : "review-reply-button"} onClick={() => onReactReview(false, review?.id)}>
                          <i className="bi bi-hand-thumbs-down-fill"></i> No {helpfulNoCount != 0 && <span className='count-highlight'>{helpfulNoCount}</span>}
                        </button>
                      </div>
                    </div>
                  )}
                  
                </div>
              </li>
              )
            })}
            
          </ul>

          {currentLocation?.Reviews?.items.length == 0 && <div className='leave-first-review-message'>
            <img src={noData} width={300}></img>
            <p>We'd love to hear your feedback! Join the conversation by leaving the first review.</p>
          </div>}
        </div>
      </div>
    </div> 

    <ModualPop show={showReviewBox} child={<PostReview pullLocation={pullLocation} setShowReviewBox={setShowReviewBox} id={id}/>}/>
    <ModualPop show={reviewReply == null ? false : true} child={<ReviewReply review={reviewReply} setReview={setReviewReply}/>}/>
    <ModualPop show={viewStory} child={<ViewStory setViewStory={setViewStory} currentLocation={currentLocation}/>}/>
    <ModualPop show={reportReview} child={<ReportReview reportReview={reportReview} reportReviewId={reportReviewId} setReportReview={setReportReview}/>}/>
    </>
  )
}
