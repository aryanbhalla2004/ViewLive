import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { Location, Review } from '../../../../../API';
import "./style.css";
import Moment from 'react-moment';
import { Rating } from 'react-simple-star-rating';
import noData from "../../../../../assets/SVG/no-data.svg";
export const BReview = () => {
  const [location, sds]:[Location, any] = useOutletContext();

  useEffect(() => {
    console.log(location);
  }, []);

  return (
    <table className='table-of-items review-section-location'>
      <thead>
        <th>Reviews <i className="bi bi-arrow-down"></i></th>
      </thead>
      <tbody>  
        {location && location.Reviews && location.Reviews?.items.length > 0 ? 
        location.Reviews?.items.map((item: Review | null, index: any) => (
          <tr key={index} className='single-review-location-dashboard'>
            <td>
              <div className='single-review-header-db'>
                <h2>{item?.ownerName} <i className="bi bi-dot"></i>  <Rating allowFraction={true} size={18} initialValue={item?.rating} readonly={true} allowHover={false}/></h2>
                <p><Moment format='MMMM DD YYYY'>{item?.createdAt}</Moment></p>
              </div>
              <p>{item?.description}</p>
            </td>
         </tr>
        )) : 
        <div className='no-review-found-desgine-db'>
          <img src={noData} width={200}></img>
          <p>Your location doesn't have any reviews yet.</p>
        </div>}
       
      </tbody>
    </table>
  )
}

export default BReview;