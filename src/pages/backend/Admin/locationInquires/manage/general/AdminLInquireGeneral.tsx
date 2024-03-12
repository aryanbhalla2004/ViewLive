import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, Route, Routes, useOutletContext, useParams  } from 'react-router-dom';
import { TextInput } from '../../../../../../common/Components/textInput/TextInput';
import "./style.css";
import {getBusiness, listUsers} from "../../../../../../graphql/queries"
import {TextAreaInput} from "../../../../../../common/Components/textInput/TextInput";
import { DatabaseContext } from '../../../../../../setup/context-manager/dbContext';
import { Business, Location, LocationHours } from '../../../../../../API';
import Moment from 'react-moment';

export const AdminLInquireGeneral = () => {
  const [data, allFile]: [Location, any] = useOutletContext();

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
  
  const convertTimeToRegualar = (militaryTime: string) => {
    let timeArr = militaryTime.split(":");
    let hours = parseInt(timeArr[0]);
    let minutes = timeArr[1]; 
    let period = (hours >= 12) ? "PM" : "AM";
    hours = (hours > 12) ? hours - 12 : hours;
    hours = (hours == 0) ? 12 : hours;
    return hours + ":" + minutes + " " + period;
  }

  return (
    <div className='container-for-managment-bb-business'>
      <div className='single-col-management-bb-business'>
        <h3>About Your Location</h3>
        <div className='inputs-holder-below-title-bb-business'>        
          <div className='galary-photos'>
            <div className="live-video">
              <img src='https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'/>
            </div>
            <div className="simple-images-details-vendor main1">
              <img src='https://plus.unsplash.com/premium_photo-1682800179834-c05e7c7d0a09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'/>
            </div>
            <div className="simple-images-details-vendor top-round-edge main2">
              <img src='https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'/>
            </div>
            <div className="simple-images-details-vendor main3">
              <img src='https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80' />
            </div>
            <div className="simple-images-details-vendor bottom-round-edge main4">
              <img src='https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'/>
            </div> 
          </div>
          </div>
        <div className='inputs-holder-below-title-bb-business'>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Location Name</span>
              <p>{data?.name}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Created Date</span>
              <p><Moment format="YYYY-MM-DD">{data?.createdAt}</Moment></p>
            </div>
          </div>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Category</span>
              <p>{data?.category}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Email</span>
              <p>{data?.email}</p>
            </div>
          </div>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Website Url</span>
              <p>{data?.websiteURL ? data?.websiteURL : "N/A"}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Phone Number</span>
              <p>{data?.phoneNumber}</p>
            </div>
          </div>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Address</span>
              <p>{data?.address.address}, {data?.address.city} {data?.address.postalcode}, {data?.address.state} {data?.address.country}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              {/* <span>Address</span>
              <p>{data?.address.address}, {data?.address.city} {data?.address.postalcode}, {data?.address.state} {data?.address.country}</p> */}
            </div>
          </div>
          <div className='single-item-in-bgeneral-business'>
            <span>Description</span>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
      <div className='hours-key-amenties'>
        <div className='side-bar-single-item-location-data'>
          <h2>Today’s Business Hours</h2>
          <p className='all-week-message'>- Show All Week’s Timing</p>
          <ul className='current-hours-list'>
            {data?.hours?.map(item => (
              <li><span>{item?.name}</span> <span className="span-time-container">{item?.open ? <>{item?.startTime ? convertTimeToRegualar(item?.startTime) : ""} - {item?.endTime ? convertTimeToRegualar(item?.endTime) : ""}</> : <span className='danger'>CLOSED</span>}</span></li>
            ))}
          </ul>
        </div>
      </div>
      {/* <div className='single-col-management-bb-business'>
        <h3>Business Documents</h3>
        <div className='inputs-holder-below-title-bb-business'>
          <div className='col-2-container-bgeneral-business file-view-container-admin-dashboard'>
            {allFile.map((item:any) => (
              <div className='single-item-in-bgeneral-business'>
                <span>{item.type}</span>
                <iframe src={item.link}></iframe>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  )
}
