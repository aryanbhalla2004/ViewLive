import React, { useContext, useState } from 'react'
import { Rating } from 'react-simple-star-rating';
import { TextAreaInput } from '../../../../../common/Components/textInput/TextInput';
import { AccountContext } from '../../../../../setup/context-manager/AuthContext';
import { DatabaseContext } from '../../../../../setup/context-manager/dbContext';
import { createReview } from '../../../../../graphql/mutations';
import { CreateReviewInput } from '../../../../../API';
import Loading from '../../../../../common/Components/pre-loader/Loading';

const fillColorArray = [
  "#f17a45",
  "#f17a45",
  "#f19745",
  "#f19745",
  "#f1a545",
  "#f1a545",
  "#f1b345",
  "#f1b345",
  "#f1d045",
  "#f1d045"
];

interface prop {
  id: any,
  setShowReviewBox: (data: any) => void,
  pullLocation: () => void
}

export const PostReview = (props: prop) => {
  const {getUser} = useContext(AccountContext);
  const {pushDataUser} = useContext(DatabaseContext);
  const [rating, setRating] = useState(0)
  const [reviewDescription, setReviewDescription] = useState<any>();
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const postReview = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setError("");
    try {
      if(reviewDescription && rating > 0) {
        setSubmitted(true);
        const userData = getUser();
        const review:CreateReviewInput = {
          description: reviewDescription,
          locationID: props.id.toString() || "",
          rating: rating,
          ownerName: userData.attributes.given_name + " " + userData.attributes.family_name
        }
        const postReview = await pushDataUser(createReview, review);
        if(postReview === undefined) {
          props.setShowReviewBox(false);
          props.pullLocation();
          setSubmitted(false);

        }
      } else {
        setError("feedback");
      }
    

      
    } catch(e) {
      console.log(e);
    }
  }

  const changeValue = (field: any) => {
    setReviewDescription(field.feedback);
  }

  const handleRating1 = (rate: number) => setRating(rate);

  return (
    <>
      <div className='form-review-wrapper'>
        <form onSubmit={postReview}>
          <h2>Let Us Know How We're Doing!</h2>
          <div className='star-container'>
            <span>Your Rating: </span>
            <Rating
              onClick={handleRating1}
              size={25}
              transition
              showTooltip
              fillColorArray={fillColorArray}
            />
          </div>
          <TextAreaInput name="feedback" label='' changeValue={changeValue} error={error} note="Please entre a valid feedback." placeholder='Write your review...' type='text'/>
          <div className='button-container-action'>
            <button className='btn-ghost' type="button" onClick={e => props.setShowReviewBox(false)}>Cancel</button>
            <button className='btn-primary' type='submit'>Submit Review</button>
          </div>
        </form>
      </div>
      {submitted && 
      <div className='loading-box-overlay'>
        <Loading />
      </div>}
      </>
  )
}
