import React, { useContext, useEffect, useState } from 'react';
import { PhoneInputCustom, TextInput } from '../../../../../common/Components/textInput/TextInput';
import { IProfileInterface } from '../interface/IProfileInterface';
import { AddressAutofill } from '@mapbox/search-js-react'
import { AccountContext } from '../../../../../setup/context-manager/AuthContext';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import './Mapbox.css';

mapboxgl.accessToken = 'sk.eyJ1IjoiYXJ5YW5iaGFsbGEiLCJhIjoiY2xlamo1NmpyMDEwaTNwbXJ4Y3dkeWs2MiJ9.1SwXmnNINs6UgULTy4Vfcg';
const geocodingClient = MapboxGeocoding({ accessToken: mapboxgl.accessToken });


interface prop {
  setData: (data: any) => void,
  data: IProfileInterface,
  error: any
}

export const PersonalInfo = (props: prop) => {
  const {getUser, isAuthenticated} = useContext(AccountContext);
  const [gettingLocation, setGettingLocation] = useState(false);
  const createInfo = async (e:React.BaseSyntheticEvent) => {
    // const form = new FormData(e.target);
    // e.preventDefault();
    // console.log("worked");

    //   const data = {
    //     'custom:address': Object.fromEntries(form.entries()).address.toString(),
    //     'custom:birthdate': "string",
    //     'custom:city': Object.fromEntries(form.entries()).city.toString(),
    //     'custom:country': Object.fromEntries(form.entries()).country.toString(),
    //     'custom:phone_number':Object.fromEntries(form.entries()).pNumber.toString(),
    //     email: "string",
    //     family_name: Object.fromEntries(form.entries()).fName.toString(),
    //     given_name: Object.fromEntries(form.entries()).lName.toString(),
    //   };
      
    //   props.setInfo(data);
    //   props.nextStep()
  }

  // const changeValuePhone = (field: any) => {
  //   if(field.pNumber !== undefined) {
  //     props.setData((prev: any) => {
  //       return {...prev,  ...field};
  //     });
  //   }
  // }

  // const changeValue = (field: any) => {
  //   props.setData((prev: any) => {
  //     return {...prev, ...field};
  //   });
  // }

  const changeAddress = (field: any) => {
    props.setData((prev: any) => {
      return {...prev, address: {...prev.address, ...field}};
    });
  }

  //const [latitude, setLatitude] = useState<number | null>(null);
  //const [longitude, setLongitude] = useState<number | null>(null);
  //const [address, setAddress] = useState<string | null>(null);

  // useEffect(() => {
  //   // Convert the geolocation coordinates to an address
  //   if (latitude && longitude) {
  //     geocodingClient.reverseGeocode({
  //       query: [longitude, latitude],
  //       limit: 1
  //     })
  //       .send()
  //       .then(response => {
  //         const address = response.body.features[0].place_name.split(",");
  //         console.log(address);
  //         console.log(response.body.features[0]);
  //         //setAddress(address);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }
  // }, [latitude, longitude]);

  const getCurrentLocation = async () => {
    setGettingLocation(true);
      await navigator.geolocation.getCurrentPosition((position) => {
        // geo[0] = (position.coords.latitude);
        // geo[1] = (position.coords.longitude);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        geocodingClient.reverseGeocode({
          query: [longitude, latitude],
          limit: 1
        })
          .send()
          .then(async (response:any) => {
            const address = await parseAddress(response.body.features[0]);
            await props.setData((prev : IProfileInterface) => {
              return {...prev, address: {          
                address: address.streetNumber + " " + address.streetName,
                unit: "",
                city: address.city,
                state: address.province,
                country: address.country,
                postalcode: address.postalcode,
                geoLocation: {
                  lat: latitude,
                  lng: longitude,
                },
              }}
            });

            setGettingLocation(false);
          })
          .catch((error:any) => {
            console.error(error);
          });
  
        //console.log(geo);
      },
      (error) => {
        return error;
      });
    
  }

  const parseAddress = (addressObj: any) => {
    const streetNumber = addressObj.address.split(" ")[0];
    const streetName = addressObj.place_name.split(",")[0].replace(streetNumber, "").trim();
    const city = addressObj.context.find((c: any) => c.id.includes("place")).text;
    const province = addressObj.context.find((c: any) => c.id.includes("region")).text;
    const postalcode = addressObj.context.find((c: any) => c.id.includes("postcode")).text;
    const country = addressObj.context.find((c: any) => c.id.includes("country")).text;
  
    return {
      streetNumber,
      streetName,
      city,
      province,
      postalcode,
      country,
    };
  }

  return (
    <div className='personal_info_modal animated-entry-form-signup'>
      <div className='modal-form-header'>
        <h2>Let's begin by getting your address.</h2>
        <p>By obtaining your address, we can help pinpoint locations near you and provide you with more relevant suggestions for things you may be interested in.</p>
      </div>
      <div className='form-input-container'>
        {/* <div className="d-flex mb-3">
          <div className="full-width">
            <PhoneInputCustom value={props.data.pNumber != undefined && props.data.pNumber} changeValue={changeValuePhone} error={props.error.for} note={props.error.note} type="text" label="Phone Number" placeholder='XXX-XXX-XXXX' name="pNumber" required={false}/>
          </div> 
        </div> */}
        <div className='getCurrentAddress'>
          <button type='button' onClick={getCurrentLocation}><i className="bi bi-geo-fill"></i>Use Current Location</button>
        </div>
        <div className='container-for-the-box'>
          <div className="d-flex full-small-width mb-3">
            <div className="full-width">
              <AddressAutofill accessToken="pk.eyJ1IjoiYXJ5YW5iaGFsbGEiLCJhIjoiY2ttbWMxYjN0MG4zNzJ2b2RzenNtNHloeCJ9.D28HxdUCUpf7YpvsQZ26AQ">
                <TextInput autoComplete="address-line1" error={props.error.for} note={props.error.note} name="address" changeValue={changeAddress} value={props.data.address?.address} type="text" placeholder="123 Main St" required={false} label="Address "/>
              </AddressAutofill>
            </div>
            <div className="full-width">
              <TextInput name="unit" autoComplete="address-line2" error={props.error.for} note={props.error.note} changeValue={changeAddress} value={props.data.address?.unit} type="text" placeholder="Apt, Suite, etc." required={false} label="Unit"/>
            </div>
          </div>
          <div className="d-flex col-2 mb-3"> 
            <div className="full-width">
              <TextInput name="city"  autoComplete="address-level2" error={props.error.for} note={props.error.note} changeValue={changeAddress} value={props.data.address?.city} type="text" placeholder="Los Angeles" required={false} label="City "/>
            </div>
            <div className="full-width">
              <TextInput name="state" autoComplete="address-level1" error={props.error.for} note={props.error.note} changeValue={changeAddress} value={props.data.address?.state} type="text" placeholder="California" required={false} label="Province/State "/>
            </div>
            <div className="full-width">
              <TextInput name="country" autoComplete="country" error={props.error.for} note={props.error.note} changeValue={changeAddress} value={props.data.address?.country} type="text" placeholder="USA" required={false} label="Country "/>
            </div>
            <div className="full-width">
              <TextInput name="postalcode" autoComplete="postal-code" error={props.error.for} note={props.error.note} changeValue={changeAddress} value={props.data.address?.postalcode} type="text" placeholder="90001" required={false} label="Postal/Zip Code "/>
            </div>
          </div>

         {gettingLocation && <div className='overlay-loading-location'>
            <div className="loading-inside center-item-container">
              <span className="loader"></span>
              <p>Getting your address...</p>
            </div>
          </div>}
        </div>
        {/* <div className="d-flex col-2 mb-3">
          <div className="full-width">
            <TextInput name="dob" changeValue={changeValue} value={props.data.dob} type="date" pattern="*" error={props.error.for} note={props.error.note} placeholder="" required={false} label="Day of Birth (Optional)"/>
          </div>
          <div className="full-width select-input-sign-up">
            <label className='form-label'>Gender (Optional)</label>
            <select name="gender" onChange={e => changeValue({[e.target.name]: e.target.value})} value={props.data.gender}>
              <option value="" defaultValue={"Select your Gender"} disabled>Select your Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Rather not say">Rather not say</option>
            </select>
          </div>
        </div> */}
      </div>
    </div> 
  )
}
