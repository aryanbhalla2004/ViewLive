import React, { useContext, useEffect } from 'react'
import Moment from 'react-moment'
import { Rating } from 'react-simple-star-rating'
import "./style.css";
import { TextAreaInput } from '../../../../../common/Components/textInput/TextInput';
import { CreateReviewReplyInput, Review, ReviewReply as reviewReplyOBJ} from '../../../../../API';
import { AccountContext } from '../../../../../setup/context-manager/AuthContext';
import { DatabaseContext } from '../../../../../setup/context-manager/dbContext';
import { createReviewReply } from '../../../../../graphql/mutations';

interface props {
  review: Review | null,
  setReview: (data: Review | null) => void, 
}

export const ReviewReply = (prop: props) => {
  const {getUserProfile} = useContext(AccountContext);
  const {pushDataUser} = useContext(DatabaseContext);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if(prop.review === null) {
      return;
    }
    try {
      const reply : CreateReviewReplyInput = {
        description: "test reply to a comment tashdkas dkaklsd akshldasd asdasd",
        ownerName: "Aryan Bhalla",
        reviewID: prop.review?.id,
      }
      const postReviewReply = await pushDataUser(createReviewReply, reply);
      console.log(postReviewReply);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='reply-box-container'> 
      <button onClick={() => prop.setReview(null)} className='close-button-model'><i className="bi bi-x-lg"></i></button>
      <ul className='list-of-review'>
        <li>
          <div>
            <div className="profile-box-user-review" style={{ backgroundColor: prop.review && getUserProfile(prop.review.owner) }}>
              {prop.review && prop.review.ownerName.toUpperCase()[0]}
            </div>
            <div className='review-text-single-main'>
              <div className='review-text-single'>
                <h3>{prop.review && prop.review.ownerName}</h3>
                <span>
                <Rating allowFraction={false} size={16} initialValue={prop.review?.rating} readonly={true} allowHover={false} />
                <i className="bi bi-dot"></i>
                <Moment format='MMM D, YYYY'>{prop.review?.createdAt}</Moment>
                </span>
              </div>
            </div>
          </div>
          <p>{prop.review?.description}</p>
       </li>
       <div className='review-reply-section-wrapper'>
        
        {prop.review?.ReviewReplies && prop.review?.ReviewReplies?.items && prop.review?.ReviewReplies?.items.length > 0 ? prop.review?.ReviewReplies?.items?.map((reply: reviewReplyOBJ | null, index: number) => {
            if (reply) {
              return (
                <>
                  <div className='vertical-line-reply-section'></div>
                  <div key={index} className='reply-main-box'>
                    <div className='reply-header-each-reply-section'>
                      <div className="profile-box-user-review" style={{ backgroundColor: prop.review && getUserProfile(reply.owner) }}>
                        {reply.ownerName && reply.ownerName.toUpperCase()[0]}
                      </div>  
                      <div className='review-text-single-main'>
                        <div className='review-text-single'>
                          <h3>{reply && reply.ownerName}</h3>
                          <span>
                            <Moment format='MMM D, YYYY'>{reply.createdAt}</Moment>
                          </span>
                        </div>
                      </div>
                    </div>
                    <p>{reply.description}</p>
                  </div>
                </>
              );
            }
            return null; // Or handle the null case accordingly
          })
        : 
          <>
            <div className='vertical-line-reply-section'></div>
            <p className='no-reply-message'>No replies to this review. Be the first to reply!</p>
          </>
        }
       </div>
      </ul>

      <form className='reply-form-box-action' onSubmit={onSubmit}>
        <TextAreaInput placeholder='reply to @Aryan Bhalla' name="reply" type="test" label="" error="" />
        <button>Reply</button>
      </form>
    </div>
  )
}
