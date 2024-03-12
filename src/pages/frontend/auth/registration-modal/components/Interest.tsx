import { useState } from "react"
import { IProfileInterface } from "../interface/IProfileInterface";
interface prop {
  setData: (data: any) => void,
  data: IProfileInterface,
  error: any
}
export const Interest = (props: prop) => {
  const [interests, setInterets] = useState(["Resturants", "Today's Events", "Transportation", "Hotels", "Sports", "Entertainment", "Arts & Culture", "Fitness", "Beauty", "Health", "Banking/Finance", "Clothing", "Specialty Stores", "Shoes", "Gaming", "Electronics", "Home Renovation", "Landscaping", "Plumbing", "Electrical", "Heating & Cooling", "Construction", "Big Box Stores", "Auto Repair & Dealerships", "Books & Literature", "Grocery Stores", "Farmers Market", "Cable & Satellite", "Cell Phone", "Tourism", "Recreation"]);
  const [userSearch, setUserSearch] = useState<String | any>("");
  const isIncluded = (name: string) => {
    const find = props.data.interests.find(item => item === name);
    if(find != undefined) {
      return true;
    }

    return false;
  }

  const addInterest = (name: string) => {
    const find = props.data.interests.find(item => item === name);
    if(find === undefined) {
      if(props.data.interests.length < 5) {
        props.setData((prev: any) => {
          return {...prev, interests: [...prev.interests, name]}
        })
      }
    } else {
      const filter = props.data.interests.filter(item => item != name);
      props.setData((prev: any) => {
        return {...prev, interests: filter}
      })
    }

    setUserSearch("");
  }
  return (
    <div className='file_upload_modal animated-entry-form-signup'>
      <div className='modal-form-header mb-3'>
        <h2>What Are Your Interests?</h2>
        <p>By selecting your interests, we can potentially find interested places for you that suits your hobbies and engage in enjoyable activities. </p>
      </div>
      {props.error.for === "interest" && <div className="error-message-selection-interest"><i className="bi bi-exclamation-triangle-fill"></i>{props.error.note}</div>}
      
      <div className="select-interests-container">
        <span className="label-big-field">Your Interests</span>
        <div className="select-field"><div className="list-of-intersts">{props.data.interests.length > 0 && props.data.interests.map(item => (
          <span className="single-item-selected" onClick={e => addInterest(item)}>{item} <i className="bi bi-x"></i></span>
        ))}</div> {props.data.interests.length < 5 && <input placeholder="Type here..." value={userSearch} onChange={e => setUserSearch(e.target.value)}></input>}</div>
        {userSearch.length > 0 && <ul className="interest-list-sign-up">
          {userSearch.length != null && userSearch.length > 0 && interests.filter(item => item.toLowerCase().includes(userSearch.toLowerCase())).map((item, i) => (
            <li key={i} className={isIncluded(item) ? "active-selection-sign" : ""} onClick={e => addInterest(item)}>{item} <i className="bi bi-plus-lg"></i></li>
          ))}
        </ul>}
      </div>
      
    </div>
  )
}