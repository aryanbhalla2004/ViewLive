import React, { useContext, useEffect, useState } from 'react'
import { Review } from '../../../API';
import { DatabaseContext } from '../../../setup/context-manager/dbContext';
import { getReview, listReviews } from '../../../graphql/queries';
import "./style.css";
import { Rating } from 'react-simple-star-rating';

export const MyReviews = () => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const {pullObj} = useContext(DatabaseContext);
  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const response = await pullObj(listReviews);
      console.log(response);
    } catch(e) {
      console.log(e);
    }
  }
  return (
    <div className='bbView-container'>
      <div className='dash-header-page'>
        <div className='name-path-dash-page'>
          <h2>My Reviews</h2>
          <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i> My Reviews</p>
        </div>
        <div className='action-button-container-dash'>
          {/* {isValid === "COMPLETE" && <Link to="/dashboard/locations/create" className='link-button btn-primary'><i className="bi bi-plus-lg"></i> Add New Location</Link> } */}
        </div>
      </div>
      <div className='my-review-list-container'>
        <ul className='list-of-reviews-dashboard'>
          <li>
            <div className='review-content'>
              <div className='header-review-dashboard'>
                <img src="" />
                <div>
                  <h2>Winnipeg Location Name</h2>
                  <p>Address 123123, sdas, asdas</p>
                </div>
              </div>
              <span><Rating allowFraction={true} size={18} readonly/> - 23-3-2023</span>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil illo nisi provident animi architecto asperiores deleniti aliquid magnam. Impedit aliquid sint voluptatibus, tempore pariatur dolorum corporis nesciunt placeat dignissimos distinctio.</p>
            </div>
            <div className='action-button-review'>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
