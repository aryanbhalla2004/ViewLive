import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import "./style.css";
import {iLocation} from "../../../../common/Interfaces/iLocation";
import {AddressInput, AmenitieInput, Business, CoordinatesInput, CreateLocationInput, LocationHoursInput, LocationImageInput, Social, SocialInput, Status} from "../../../../API"
import { DatabaseContext } from '../../../../setup/context-manager/dbContext';
import { createLocation } from '../../../../graphql/mutations';
import { AddressAutofill } from '@mapbox/search-js-react';
import { PhoneInputCustom, TextAreaInput, TextInput } from '../../../../common/Components/textInput/TextInput';
import { Button } from '../../../../common/Components/button/Button';
import { getLocation, listBusinesses } from '../../../../graphql/queries';
import Loading from '../../../../common/Components/pre-loader/Loading';
import mapboxgl from 'mapbox-gl';
import { AccountContext } from '../../../../setup/context-manager/AuthContext';
import GeocodingClient from '@mapbox/mapbox-sdk/services/geocoding';
import '@mapbox/mapbox-sdk/services/geocoding';
import ImageUploaderWithCrop from '../addUser/components/logo-upload/LogoUpload';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Select from 'react-select';
import { Amenities as amenities} from '../../../../common/util/amenties';
import { getIcon } from '../../../../common/util/iconHelper';

const geocodingClient = GeocodingClient({ accessToken: "pk.eyJ1IjoiYXJ5YW5iaGFsbGEiLCJhIjoiY2ttbWMxYjN0MG4zNzJ2b2RzenNtNHloeCJ9.D28HxdUCUpf7YpvsQZ26AQ" });

interface locationImage {
  logo: any,
  main: any,
  storeOne: any, 
  storeTwo: any,
  storeThree: any,
  storeFour: any,
}
interface imageHolder {
  [key: string]: { id: string,
    name: string,
    width: number,
    height: number,
    file: File | any,}
}
const INITIAL_ERROR = {
  for: "",
  message: ""
}




const LEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const sectionRef = {profile: useRef<any>(null), name: useRef<any>(null), description:useRef<any>(null), keyword: useRef<any>(null), email: useRef<any>(null), phone: useRef<any>(null), website: useRef<any>(null), social: useRef<any>(null), address: useRef<any>(null), live: useRef<any>(null), gallery: useRef<any>(null), time: useRef<any>(null), amenities: useRef<any>(null)};
  const [selectedItems, setSelectedItems] = useState<AmenitieInput[] | any>([]);
  const [currentLocation, setCurrentLocation] = useState<any | null>(null);
  const [images, setImages] = useState<imageHolder>({logo: {id: "logo", name: "Logo", width: 250, height: 250, file: ""},
  main: {id: "main", name: "Main Banner", width: 400, height: 400, file: ""},
  storeOne: {id: "storeOne", name: "Store One", width: 350, height: 350, file: ""}, 
  storeTwo: {id: "storeTwo", name: "Store Two", width: 350, height: 350, file: ""},
  storeThree: {id: "storeThree", name: "Store Three", width: 350, height: 350, file: ""},
  storeFour: {id: "storeFour", name: "Store Four", width: 350, height: 350, file: ""}}
   
  );
  const [business]:any = useOutletContext();
  const {pushDataUser, uploadFile, fetchData, pullObj, fetchPublicObject, updateDataAPI} = useContext(DatabaseContext);
  const {getUser} = useContext(AccountContext);
  const [formSub, setFormSub] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState<Boolean>(true);
  const [loadingStatement, setLoadingStatement] = useState("Loading");
  const [error, setError] = useState(INITIAL_ERROR);
  useEffect(() => {
    pullLocation();
  }, []);


  useEffect(() => {
    if(currentLocation != null){
      setData();
    }
  }, [currentLocation]);

  const setData = () => {
    
    let itm = currentLocation?.amenities.map((i:any) => {
      delete i.__typename;
      return i;
    });
  
    setSelectedItems(itm);
    // setTimes(currentLocation?.hours);
    let horus = {};

    for(let itm of currentLocation?.hours){
      setTimes((prev: any) => {
        if(itm.open){
        return {...prev, [itm.name]: {start: itm.startTime, end:itm.endTime, checked: itm.open} }
        } else {
          return {...prev, [itm.name]: null }
        }
      });
    }
    setKeywords(currentLocation?.keywords);
    
    listImages();
    
  }



  const listImages = async () => {
    let imi:imageHolder = { logo: {id: "logo", name: "Logo", width: 250, height: 250, file: ""},
    main: {id: "main", name: "Main Banner", width: 400, height: 400, file: ""},
    storeOne: {id: "storeOne", name: "Store One", width: 350, height: 350, file: ""}, 
    storeTwo: {id: "storeTwo", name: "Store Two", width: 350, height: 350, file: ""},
    storeThree: {id: "storeThree", name: "Store Three", width: 350, height: 350, file:""},
    storeFour: {id: "storeFour", name: "Store Four", width: 350, height: 350, file:""}} ;

  
    console.log(currentLocation);
    let imag = await currentLocation.images.map( async (itm: any)  => {
      return await fetchPublicObject(itm.key);
    });
    imag = await Promise.all(imag);
    
    for (const key in imi) {
      if (imi.hasOwnProperty(key)) {
        let file = imag.find((i: string) => i.includes(key));
        const base64 = await fetchAndConvertImages(file);
        if (typeof base64 == "string"){
          // imi[`${key}`].file =  base64ToFile(base64, `${imi[`${key}`].id}.jpg`);
          imi[`${key}`].file =  base64;
        }
       
      }
    }
    console.log(imi);
    setImages(imi);

  }

  const fetchAndConvertImages = async (imageUrl:any)=> {
  

      // Fetch the image
      const response = await fetch(imageUrl);
      const blob = await response.blob();
  
      // Convert the image to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      const base64Promise = new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
      const base64Data = await base64Promise;

      // Create a new image object with the base64 data
      return await base64Data;
  
    
  }

  const pullLocation = async () => {
    try {
      const data = await pullObj(getLocation, id);

      if(data.data.getLocation != null) {

        setCurrentLocation(data.data.getLocation);

      } else {
        navigate('/dashboard/locations');
      }
      
    } catch(e) {

    }
  }
  const keyRef = useRef<any>();
  const [times, setTimes] = useState<any>({
    Monday: {start: "", end: "", checked:false},
    Tuesday: {start: "", end: "", checked:false},
    Wednesday: {start: "", end: "", checked:false},
    Thursday: {start: "", end: "", checked:false},
    Friday: {start: "", end: "", checked:false},
    Saturday: {start: "", end: "", checked:false},
    Sunday: {start: "", end: "", checked:false},
  });




  const [keywords, setKeywords] = useState<any>([]);
  const [phone, setPhone] = useState<any>();

  const changeOpens = (e: any) => {

    if(times[e.target.name] == null) {
      setTimes((prev: any) => {
        return {...prev, [e.target.name]: {start: "", end: ""}}
      });
    } else {
      setTimes((prev: any) => {
        return {...prev, [e.target.name]: null}
      });
    }
  }

  const handleChange = (selectedOptions: any) => {
    setSelectedItems(selectedOptions);
  };

  // useEffect(() => {
  //   console.log(handleGeoCode("136 valley brook, winnipeg mb"));
  // }, []);

  const handleGeoCode = async (query: string) => {
    const response = await geocodingClient.forwardGeocode({
      query: query,
      limit: 1,
      types: ['address'],
    }).send();

    const feature = response.body.features[0];
    return feature.center;
  };

  const changeInterval = (e: any, day: string) => {

    setTimes((prev: any) => {
      return {...prev, [day]: {...prev[day], [e.target.name]: e.target.value} }
    });
  }

  const changeValuePhone = (field: any) => {
    if(field.locationPhone !== undefined) {
      setPhone((prev: any) => {
        return {...prev, ...field};
      });
    }
  }

  const addItem = (location: string) => {
    const keyword = keyRef.current.value;
    setError(INITIAL_ERROR);

    if(keywords.length < 15) {
      if(location === 'KEYWORD' && keyword != "") {
        const item = keywords?.find((item: any) => item === keyword);
        if(item === undefined) {
          keyRef.current.value = "";
          setKeywords((prev: any) => {
            return [...prev, keyword]
          })
        } else {
          setError({for: "keyword", message: "This keyword already exists"});
        }
      } else {
        setError({for: "keyword", message: "Invalid Keyword"});
      }
    } else {
      setError({for: "keyword", message: "Max Capacity Reached"});
    }
    
  }

  // const fileUpload = (e: any) => {
  //   const imgOBJ = {
  //     type: e.target.name,
  //     file: e.target.files[0]
  //   }

  //   const filteredItem = images.filter(item => item.type != e.target.name)
  //   setImages([...filteredItem, imgOBJ]);

  // }
    
  const deleteItem = (keyword: string, location: string) => {
    if(location === 'KEYWORD') {
      const filter = keywords?.filter((item: any) => item !== keyword);
      setKeywords(filter);
    }

    // if(location === 'AMENITIES') {
    //   const filter = amenities?.filter((item: any) => item !== keyword);
    //   setAmenities(filter);
    // }
  }


  const uploadImages = async (business:Business, locationName: string) => {
    
    const allData:LocationImageInput[] = [];
    const imgs = Object.entries(images);

    for(let i = 1; i < imgs.length; i++) {
      if(imgs[i][1].file.includes("viewlive2-storage-2d9b46fd102200-dev")) {
        let it = currentLocation.images.find((itme:any) => itme.type === imgs[i][0]);
        delete it.__typename;
        allData.push(it);
        continue
      };
      const currentImg = imgs[i];
      const file: File | null = base64ToFile(imgs[i][1].file, `${currentImg[0]}.jpg`);
      if(file != null) {
        const fileExtension = file.name.split('.').pop();
        const url1 = await uploadFile(`${business.name}/${locationName}/${currentImg[0]}.${fileExtension}`, file, "public");

        const singleImg:LocationImageInput = {
          type: currentImg[0],
          key: url1
        }

        allData.push(singleImg);
      } 
    }

   

    return allData;
  }

  const uploadProfile = async (business:Business, locationName: string) => {
    
    const currentImg = images.logo;
    
    if(!currentImg.file.includes("viewlive2-storage-2d9b46fd102200-dev")){
    const file: File | null = base64ToFile(currentImg.file, `logo.jpg`);
    if(file != null ) {
      const fileExtension = file.name.split('.').pop();
      const url = await uploadFile(`${business.name}/${locationName}/${currentImg.id}.${fileExtension}`, file, "public");
      return url;
    } 
  } else {
   return currentLocation.images.find((itme:any) => itme.type === currentImg.id).key;

  }
  }

  const base64ToFile = (base64String: string, fileName: string): File | null => {
    // Extract the base64 encoded data from the string
    const dataStart = base64String.indexOf(',') + 1;
    const base64Data = base64String.slice(dataStart);
  
    // Decode the base64 data to obtain binary data
    const binaryData = atob(base64Data);
  
    // Create a Uint8Array to represent the binary data
    const arrayBuffer = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      arrayBuffer[i] = binaryData.charCodeAt(i);
    }
  
    // Create a Blob from the Uint8Array
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
  
    // Create a File-like object (with minimal properties)
    try {
      const fileObj = new File([blob], fileName, { type: 'image/png' });
      return fileObj;
    } catch (error) {
      console.error("Error creating File-like object:", error);
      return null;
    }
  }

  const formatTime = () => {
    const allTimes:LocationHoursInput[] = [];
    Object.entries(times).map((item: any, index) => {
      if(item[1] != null) {
        const singleTimeSlot:LocationHoursInput = {
          open: true,
          startTime: item[1].start,
          endTime: item[1].end,
          name: item[0]
        }
        allTimes.push(singleTimeSlot);
      } else {
        const singleTimeSlot:LocationHoursInput = {
          open: false,
          startTime: '',
          endTime: '',
          name: item[0]
        }
        allTimes.push(singleTimeSlot);
      }
      
    });

    return allTimes;
  }

  const onSubmit = async (e: any) => {

    e.preventDefault();
    setError(INITIAL_ERROR);
    setFormSub(true);
    const data = new FormData(e.target);
    const formData:any = Object.fromEntries(data.entries());
    if(images.logo.file != "") {

      if(formData.locationName != "" && formData.locationName.length > 10) {

        if(formData.locationDescription != "" && formData.locationDescription.length > 1000) {

          if(keywords.length > 4) {

            if(formData.locationEmail != "") {

              if(isValidPhoneNumber(phone.locationPhone) && phone.locationPhone != "") {
              
                if(isValidSocial(formData.websiteLink)) {
               
                  if(isValidSocial(formData.facebookSocial) && isValidSocial(formData.instagramSocial) && isValidSocial(formData.twitterSocial) && isValidSocial(formData.tiktokSocial)) {
                    
                    if(formData.streetName != "" && formData.postalcode != "" && formData.city != "" && formData.state != "" && formData.country != "") {
                     
                      if(isValidSocial(formData.livelink)) {
                       
                        if(isGalleryValid()) {
                          if(isValidTime()) {
                           
                            if(selectedItems.length > 4) {
                             
                              // if(formData.terms === "on") {

                                uploadLocation(formData);
                              // } else {
                              //   setError({for: "terms", message: "Please accepts the terms."});
                              // }
                            } else {
                              scrollTo(sectionRef.amenities);
                              setError({for: "amenities", message: "Select atleast 5 Amenities"});
                            }
                          }
                        }
                      } else {
                        setError({for: "livelink", message: "Invalid ViewLive link"});
                        scrollTo(sectionRef.live);
                      }
                    } else {
                      scrollTo(sectionRef.address);

                      if(formData.streetName === "") {
                        setError({for: "streetName", message: "Invalid street address"});
                        //return;
                      }
                      if(formData.postalcode === "") {
                        setError({for: "postalcode", message: "Invalid Postal Code"});
                        //return;
                      }
                      if(formData.city === "") {
                        setError({for: "city", message: "Invalid City name"});
                        //return;
                      }
                      if(formData.state === "") {
                        setError({for: "state", message: "Invalid State name"});
                        //return;
                      }
                      if(formData.country === "") {
                        setError({for: "country", message: "Invalid Country name"});
                        //return;
                      }
                    }
                  } else {
                    if(!isValidSocial(formData.facebookSocial)) {
                      setError({for: "facebookSocial", message: "Invalid Facebook Link"});
                    }

                    scrollTo(sectionRef.social);
                  }
                } else {
                  setError({for: "websiteLink", message: "Invalid Website Link"});
                  scrollTo(sectionRef.website);
                }
              } else {
                setError({for: "locationPhone", message: "Invalid Phone Number"});
                scrollTo(sectionRef.phone);
              }
            } else {
              setError({for: "locationEmail", message: "Invalid Email Address"});
              scrollTo(sectionRef.email);
            }
          } else {
            setError({for: "keyword", message: "Please add atleast 5 keywords"});
            scrollTo(sectionRef.keyword);
          }
        } else {
          if(formData.locationDescription === "") {
            setError({for: "locationDescription", message: "Invalid Description"});
          } else {
            setError({for: "locationDescription", message: "Provide a more descriptive description (min 1000)"});
          }
          
          scrollTo(sectionRef.description);
        }
      } else {
        if(formData.locationName === "") {
          setError({for: "locationName", message: "Invalid Location Name"});
        } else {
          setError({for: "locationName", message: "Provide a more descriptive title"});
        }
        
        scrollTo(sectionRef.name);
      }
    } else {
      setError({for: "logoFile", message: "Please upload location profile image."});
      scrollTo(sectionRef.profile);
    }

    setFormSub(false);
  }

  const uploadLocation = async (formData: any) => {
    try {
      setShowLoading(true);
      setLoadingPost(true);
      setLoadingStatement("Loading");
      
      const business = await fetchData(listBusinesses);
      const businessData:Business = business.data.listBusinesses.items[0];
      
      //! Formation Location Timing
      const hours = formatTime();
      //! Status Update
      setLoadingStatement("Uploading Media");
      //! Upload Images
      const allImages = await uploadImages(businessData, formData.locationName);
      //! Profile Image
      const profile = await uploadProfile(businessData, formData.locationName);

      //! Location Cords
      let cord:any = await handleGeoCode(formData.streetName + "," + formData.city + " " + formData.state + ", " + formData.postalcode + " " + formData.country);

      const coordinates: CoordinatesInput = {
        lng: cord[0],
        lat: cord[1],
      }

      const socialMediaArray : SocialInput[] = [
        {type: "facebook", address: formData.facebookSocial ? formData.facebookSocial : ""},
        {type: "instagram", address: formData.instagramSocial ? formData.instagramSocial : ""},
        {type: "twitter", address: formData.twitterSocial ? formData.twitterSocial : ""},
        {type: "tiktok", address: formData.tiktokSocial ? formData.tiktokSocial : ""},
      ]

      const locationAddress: AddressInput = {
        address: formData.streetName.toString(),
        unit: "",
        city: formData.city.toString(),
        country: formData.country.toString(),
        state: formData.state.toString(),
        postalcode: formData.postalcode.toString(),
        geoLocation: coordinates,
      }


      const locations = {
        id: currentLocation.id,
        keywords: keywords,
        address: locationAddress,
        amenities: selectedItems,
        searchField: (formData.locationName.toLowerCase() + keywords.toString().toLowerCase().split(",").join("")).split(" ").join(""),
        name: formData.locationName,
        category: businessData.type,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        businessID: businessData.id,
        images: allImages,
        isPublished: true,
        locationImage: profile, 
        hours: hours,
        social: socialMediaArray,
        description: formData.locationDescription,
        email: formData.locationEmail,
        phoneNumber: phone.locationPhone,
        liveView: formData.livelink,
        websiteURL: formData.websiteLink,
        status: Status.WAITING,
      }

      locations.images = allImages;
      locations.images.push({type:"logo", key: profile});
      console.log(locations.searchField);
      const usr = await getUser();
     
      setLoadingStatement("Uploading Data");
  

      const locationResponse = await updateDataAPI(usr.username, usr.signInUserSession.idToken.jwtToken,"Location", locations);
      
     
      setLoadingStatement("Finish Up");
      setLoadingPost(false);
    } catch(e) {
      
    }
  }

  const closePostBox = () => {
    setShowLoading(false);
    navigate("/dashboard/locations");
  }

  function isValidUrl(url: string): boolean {
    const urlRegex: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
  }

  const isValidSocial = (url: string):boolean => {
    if(url === "") 
      return true;

    if(url != "" && isValidUrl(url)) {
      return true;
    } 

    return false;
  }

  const isGalleryValid = ():boolean => {

    if(images.main.file != "" && images.storeFour.file != "" && images.storeOne.file != "" && images.storeThree.file != "" && images.storeTwo.file != "") {
      return true;
    } else {
      scrollTo(sectionRef.gallery);

      if(images.main.file === "") {
        setError({for: images.main.id, message: "Missing Main Banner Image"});
        return false;
      }

      if(images.storeOne.file === "") {
        setError({for: images.storeOne.id, message: "Missing Store One Image"});
        return false;
      }

      if(images.storeTwo.file === "") {
        setError({for: images.storeTwo.id, message: "Missing Store Two Image"});
        return false;
      }

      if(images.storeThree.file === "") {
        setError({for: images.storeThree.id, message: "Missing Store Three Image"});
        return false;
      }

      if(images.storeFour.file === "") {
        setError({for: images.storeFour.id, message: "Missing Store Four Image"});
        return false;
      }

      return false;
    }    
  }

  const isValidTime = ():boolean => {
    const items = Object.entries(times);
    for(let i = 0; i < items.length; i++) {
      const singleDay:any = items[i][1];
      if(singleDay != null) {
        if(singleDay.start === "" && singleDay.end === "") { 
          setError({for: items[i][0], message: "Invalid Time Range"});
          scrollTo(sectionRef.time);
          return false;
        }
      }
    }

    return true;
  }

  const scrollTo = (location: any) => {
    const element = location.current;
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const scrollTopPosition = elementRect.top + window.pageYOffset - 120;
      window.scrollTo({ top: scrollTopPosition, behavior: 'smooth' });
    }
    
  }


  const formatOptionLabel = ({label, icon }:any) => {
    const iconsMap:any = {};

    amenities.forEach((ite: any) => {
      iconsMap[ite.icon] = getIcon(ite.icon);
    }
    );

    

    const IconComponent = iconsMap[icon];
    return (
      <div>
        {IconComponent && <IconComponent />} {label}
      </div>
    );
  };

  return (
    <>
    <div className='bbView-container'>
      <div className='dash-header-page'>
        <div className='name-path-dash-page'>
          <h2>Edit Location</h2>
          <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i> Location <i className="bi bi-chevron-right"></i> Create</p>
        </div>
        <div className='action-button-container-dash'>
          <Link to="/dashboard/locations" className='link-button btn-primary'><i className="bi bi-arrow-left"></i> Cancel</Link>
        </div>
      </div>
     {currentLocation && <form className='location-form' onSubmit={onSubmit}>
        <div className='single-col-field' ref={sectionRef.profile}>
          <div className='label-field-holder'>
            <label>Location Profile Image</label>
            <p>Information provided will be shown as location name.</p>
          </div>
          <div className='user-input-bCreate'>
            <div className={error.for === "logoFile" ? 'invalid-input location-logo-upload' : 'location-logo-upload' }>
              <div className='logo-image-location-create-container'>
                <div>{images.logo.file === "" ? <i className="bi bi-camera"></i> : <img src={images.logo.file} />}</div>
              </div>
              <div className='upload-logo-photo'>
                <ImageUploaderWithCrop modifyAllowed={true} file={images.logo.file} name={"logo"} isCircle={true} CanvasWidth={images.logo.width} CanvasHeight={images.logo.height} setImages={setImages}/>
                {/* <input accept="images/*" name="viewLive" id="upload" type="file"  hidden/>
                <label htmlFor="upload">Upload</label> */}
              </div>
            </div>
            {error.for === "logoFile" && <p className="note-small-text error-text mt-3"><i className="bi bi-exclamation-triangle-fill"></i> Please upload a picture</p>}
          </div>
        </div>
        <div className='single-col-field' ref={sectionRef.name}>
          <div className='label-field-holder'>
            <label>Location Name</label>
            <p>Information provided will be shown as location name.</p>
          </div>
          <div className='user-input-bCreate'>
             <TextInput defaultValue={currentLocation?.name} wordCount={true} wordsAllowed={60} name="locationName" type="text" placeholder='My Restaurent @ Pembina' label='' error={error.for} note={error.message}/>
            {/* <input placeholder='My Restaurent @ Pembina' name="locationName" className='form-control'></input> */}
          </div>
        </div>
        <div className='single-col-field' ref={sectionRef.description}>
          <div className='label-field-holder'>
            <label>Store Description</label>
            <p>Information provided will help you find clients</p>
          </div>
          <div className='user-input-bCreate'>
             <TextAreaInput defaultValue={currentLocation?.description}  wordCount={true} wordsAllowed={1500} name="locationDescription" type="text" placeholder='Tell us about ur business?' label='' error={error.for} note={error.message}/>
          </div> 
        </div>
        <div className='single-col-field' ref={sectionRef.keyword}>
          <div className='label-field-holder'>
            <label>Keywords (Limit 15 Allowed)</label>
            <p>Keywords will help use find you clients</p>
          </div>
          <div className='user-input-bCreate'>
            <div className='type-add-input-container'>
              <input placeholder='Food, Pizza, etc' className={error.for === "keyword" ? 'invalid-input form-control' : 'form-control' } ref={keyRef}></input>
              <button className='link-button btn-primary' onClick={(e) => addItem("KEYWORD")} type="button"><i className="bi bi-plus-lg"></i>Add</button>
            </div>
            {error.for === "keyword" && <p className="note-small-text error-text"><i className="bi bi-exclamation-triangle-fill"></i> {error.message}</p>}
            {keywords.length > 0 && <ul className='keywords-list-ul-BCreate'>
              {keywords.map((item: any) => (
                <li onClick={() => deleteItem(item, "KEYWORD")}>{item} <i className="bi bi-x"></i></li>                
              ))}
            </ul>}
          </div>
        </div>
        <div className='single-col-field' ref={sectionRef.email}>
          <div className='label-field-holder'>
            <label>Email Address</label>
          </div>
          <div className='user-input-bCreate'>
             <TextInput name="locationEmail" defaultValue={currentLocation?.email} type="email" placeholder='mail@example.com' label='' error={error.for} note={error.message}/>
          </div>
        </div>
        <div className='single-col-field' ref={sectionRef.phone}>
          <div className='label-field-holder'>
            <label>Phone Number</label>
          </div>
          <div className='user-input-bCreate'>
            <PhoneInputCustom error={error.for} defaultValue={currentLocation?.phoneNumber} note={error.message} value={phone != undefined && phone?.locationPhone} changeValue={changeValuePhone} type="text" label="" placeholder='+1 (XXX)-XXX-XXXX' name="locationPhone" required={false}/>
          </div>
        </div>
        <div className='single-col-field' ref={sectionRef.website}>
          <div className='label-field-holder'>
            <label>Website Link (Optional)</label>
          </div>
          <div className='user-input-bCreate'>
            <TextInput name="websiteLink" defaultValue={currentLocation.websiteURL} type="text" placeholder='https://www.exmaple.com/' label='' error={error.for} note={error.message}/>
          </div>
        </div>
        <div className='single-col-field' ref={sectionRef.social}>
          <div className='label-field-holder'>
            <label>Social Media Link (Optional)</label>
            <p>The social media link will be displayed</p>
          </div>
          <div className='user-input-bCreate'>
            <div className='social-box-location-create'>
              <i className="bi bi-facebook"></i>
              <TextInput name="facebookSocial" defaultValue={currentLocation.social.find((itm:any) => itm.type == "facebook").address} type="text" placeholder='mail@example.com' label='' error={error.for} note={error.message}/>
            </div>
            <div className='social-box-location-create'>
              <i className="bi bi-instagram"></i>
              <TextInput name="instagramSocial" defaultValue={currentLocation.social.find((itm:any) => itm.type == "instagram").address} type="text" placeholder='mail@example.com' label='' error={error.for} note={error.message}/>
            </div>
            <div className='social-box-location-create'>
              <i className="bi bi-twitter"></i>
              <TextInput name="twitterSocial" defaultValue={currentLocation.social.find((itm:any) => itm.type == "twitter").address} type="text" placeholder='mail@example.com' label='' error={error.for} note={error.message}/>
            </div>
            <div className='social-box-location-create'>
              <i className="bi bi-tiktok"></i>
              <TextInput name="tiktokSocial" defaultValue={currentLocation.social.find((itm:any) => itm.type == "tiktok").address} type="text" placeholder='mail@example.com' label='' error={error.for} note={error.message}/>
            </div>
          </div>
        </div>
        <div className='single-col-field' ref={sectionRef.address}>
          <div className='label-field-holder'>
            <label>Street Address</label>
            <p>The address provided will be displayed to the user</p>
          </div>
          <div className='user-input-bCreate'>
            <div className='col-2-for-input'>
              <AddressAutofill accessToken="pk.eyJ1IjoiYXJ5YW5iaGFsbGEiLCJhIjoiY2ttbWMxYjN0MG4zNzJ2b2RzenNtNHloeCJ9.D28HxdUCUpf7YpvsQZ26AQ">
                <TextInput defaultValue={currentLocation.address.address} autoComplete="address-line1" name="streetName" type="text" placeholder='100 Smith Street' label='' error={error.for} note={error.message}/>
              </AddressAutofill>
              <TextInput defaultValue={currentLocation.address.postalcode} autoComplete="postal-code" name="postalcode" type="text" placeholder='Zip Code' label='' error={error.for} note={error.message}/>
            </div>
            
            <div className='col-3-for-input'>
              <TextInput defaultValue={currentLocation.address.city} autoComplete="address-level2" name="city" type="text" placeholder='City' label='' error={error.for} note={error.message}/>
              <TextInput defaultValue={currentLocation.address.state} autoComplete="address-level1" name="state" type="text" placeholder='State/Province' label='' error={error.for} note={error.message}/>
              <TextInput defaultValue={currentLocation.address.country} autoComplete="country" name="country" type="text" placeholder='Country' label='' error={error.for} note={error.message}/>
            </div>
          </div>
        </div>
        <div className='single-col-field' ref={sectionRef.live}>
          <div className='label-field-holder'>
            <label>Live Footage Feed (Optional)</label>
            <p>Make sure the link/key provided is correct.</p>
          </div>
          <div className='user-input-bCreate'>
            <TextInput defaultValue={currentLocation.liveView} name="livelink" type="text" placeholder='https://www.exmaple.com/' label='' error={error.for} note={error.message}/>
          </div>
        </div>
        <div className='single-col-field' ref={sectionRef.gallery}>
          <div className='label-field-holder'>
            <label>Store Gallery</label>
            <p>All the images will be publicly visible</p>
          </div>
          <div className='user-input-bCreate'>
            <ul className='upload-photos'>
            {Object.entries(images).map((item: any, index) => (
              index > 0 && <li key={index} className={error.for === item[1].id ? "invalid-input" : ""}>
                {item[1].file !== "" ?
                <div>
                  <i className="bi bi-file-earmark-arrow-up-fill"></i>
                  <h2>Image Uploaded</h2>
                  <p>Change by clicking the button</p>
                </div> : 
                <>
                  <i className="bi bi-file-earmark-image"></i>
                  <h2>{item[1].name}</h2>
                  <p>Upload by clicking the button</p>
                </>}
                <ImageUploaderWithCrop modifyAllowed={false} file={item[1].file} name={item[1].id} isCircle={false} CanvasWidth={item[1].width} CanvasHeight={item[1].height} setImages={setImages}/>

              </li>
            ))}
            
            </ul>
            {(error.for === "main" || error.for === "storeOne" || error.for === "storeTwo" || error.for === "storeThree" || error.for === "storeFour") && <p className="note-small-text error-text mt-3"><i className="bi bi-exclamation-triangle-fill"></i> {error.message}</p>}
          </div>
        </div>
        <div className='single-col-field' ref={sectionRef.time}>
          <div className='label-field-holder'>
            <label>Standard Working Hours</label>
            <p>The time you selected will be used to show your store hours</p>
          </div>
          <div className='user-input-bCreate'>
            <ul className='time-picker-container'>
            {Object.entries(times).map((item: any, index) => (
              
              <li key={index} className={error.for === item[0] ? "invalid-input-time" : ""}>
                <h4>{item[0]}</h4>
                <div className="checkboxes__item">
                  <label className="checkbox style-e">

                    <input type="checkbox" checked={item[1]!= null? item[1].checked : false}  name={item[0]} onChange={changeOpens}/>
                    <div className="checkbox__checkmark"></div>
                    <div className="checkbox__body">{times[item[0]] != null ? "Open" : "Close"}</div>
                  </label>
                </div>
                <div className='day-time-container'>
                {times[item[0]] != null ? <>
                    <input type="time" className='form-control' name="start" defaultValue={item[1].start} onChange={e => changeInterval(e, item[0])}></input>
                    <span>TO</span>
                    <input type="time" className='form-control' name="end"  defaultValue={item[1].end} onChange={e => changeInterval(e, item[0])}></input>
                  </> : <span>Store Closed</span>}
                </div>
              </li>))}
            </ul>
            {(error.for === "Monday" || error.for === "Tuesday" || error.for === "Wednesday" || error.for === "Thursday" || error.for === "Friday" || error.for === "Saturday" || error.for === "Sunday") && <p className="note-small-text error-text mt-3"><i className="bi bi-exclamation-triangle-fill"></i> {error.message}</p>}
          </div>
        </div>
        <div className='single-col-field' ref={sectionRef.amenities}>
          <div className='label-field-holder'>
            <label>Amenities</label>
            <p>This can help you find more clients</p>
          </div>
          <div className='user-input-bCreate'>
            <div className='amen-list'>
              <h4>Recommended Amenities</h4>
              <Select
                options={amenities}
                isMulti
                value={selectedItems}
                className={error.for === "amenities" ? "invalid-input" : ""}
                onChange={handleChange}
                getOptionLabel={(option) => option.label} // Return only the label string
                getOptionValue={(option) => option.value}
                formatOptionLabel={formatOptionLabel} // Use the custom label formatting
              />
              {(error.for === "amenities") && <p className="note-small-text error-text mt-3"><i className="bi bi-exclamation-triangle-fill"></i> {error.message}</p>}
              {/* <ul className='keywords-list-ul-BCreate'>
                <li onClick={e => addAmenti("Free Wi-Fi")}>Free Wi-Fi <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("High speed internet access ")}>High speed internet access <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("Pet Friendly ")}>Pet Friendly <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("Covered Parking")}>Covered Parking <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("Swimming pool")}>Swimming pool <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("Gym")}>Gym <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("Sauna")}>Sauna <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("Hot tub")}>Hot tub <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("Tennis court")}>Tennis court <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("On-site parkin")}>On-site parking <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("Room service")}>Room service <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("24-hour front desk")}>24-hour front desk <i className="bi bi-plus"></i></li>
                <li onClick={e => addAmenti("Laundry service")}>Laundry service <i className="bi bi-plus"></i></li>
              </ul> */}
            </div>
            {/* <div className='type-add-input-container'>
              <input placeholder='Wifi, Charing Station, etc' className='form-control' ref={amenitiesRef}></input>
              <button className='link-button btn-primary' type='button' onClick={() => addItem("AMENITIES")}><i className="bi bi-plus-lg"></i>Add</button>
            </div> */}
            {/* {amenities.length > 0 && <ul className='keywords-list-ul-BCreate'>
              {amenities.map((item: any) => (
                <li onClick={() => deleteItem(item, "AMENITIES")}>{item} <i className="bi bi-x"></i></li>                
              ))}
              </ul>} */}
          </div>
        </div>
        <div className='single-col-field'>
          <div className='user-input-bCreate'>
            <Button text='Update Location' loading={formSub}/>
          </div>
        </div>
      </form>}
    </div>

    {showLoading && <div className='create-location-message-pop-up'>
      <div className='pop-up-container-loader'>
      <div className={loadingPost ? "content-container-loader-single-page hidevisiility" : "content-container-loader-single-page"}>
          <i className="bi bi-check2"></i>
          <p className='reference-l'>location ref: {currentLocation?.id}</p>
          <h2>You successfully updated your location</h2>
          <p className='des-location-pop'>Congratulations on updating your location! You can now easily manage and close it by clicking the button. Well done!</p>
          <Button text="Close" loading={false} onClick={closePostBox}></Button>
        </div>
        {loadingPost && <div className='loading-box-pop-up'>
          <span className="loader-spin"></span>
          <h1>{loadingStatement}</h1>
        </div>}
      </div>
      
    </div>}
    </>
  )
}
export default LEdit;



