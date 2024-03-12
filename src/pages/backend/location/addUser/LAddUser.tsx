import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import "./style.css";
import { DatabaseContext } from '../../../../setup/context-manager/dbContext';
import { Button } from '../../../../common/Components/button/Button';
import { getLocation } from '../../../../graphql/queries';
import { AccountContext } from '../../../../setup/context-manager/AuthContext';
import '@mapbox/mapbox-sdk/services/geocoding';
import { TextInput } from '../../../../common/Components/textInput/TextInput';

const INITIAL_ERROR = {
  for: "",
  message: ""
}

interface props {
  setShowCreateLocationUser: (data: boolean) => void,
  locationId: any
}


const LAddUser = (prop: props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const sectionRef = {name: useRef<any>(null),email: useRef<any>(null), storyAccess : useRef<any>(null)};
  const {addLocationManagerUser, pullObj} = useContext(DatabaseContext);
  const [showLoading, setShowLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any | null>(null);
  const [name, setName] = useState<any | null>(null);
  const [loadingPost, setLoadingPost] = useState<Boolean>(true);
  const [loadingStatement, setLoadingStatement] = useState("Loading");
  const {getUser} = useContext(AccountContext);
  const [formSub, setFormSub] = useState<boolean>(false);
  const closePostBox = () => {
    setShowLoading(false);
    navigate("/dashboard/locations");
  }
  useEffect(() => {
    pullLocation();
  }, []);

  const pullLocation = async () => {
    try {
      const data = await pullObj(getLocation, prop.locationId);

      if(data.data.getLocation != null) {

        setCurrentLocation(data.data.getLocation);

      } else {
        navigate('/dashboard/locations');
      }
      
    } catch(e) {

    }
  }

  const [error, setError] = useState(INITIAL_ERROR);

  const onSubmit = async (e: any) => {

    e.preventDefault();
    setError(INITIAL_ERROR);
    setFormSub(true);
    const data = new FormData(e.target);
    const formData:any = Object.fromEntries(data.entries());

      if(formData.locationName != "") {
        if(formData.locationEmail != "") {
          //console.log(currentLocation);
          addManager(formData);
        } else {
        setError({for: "locationEmail", message: "Invalid Email Address"});
        scrollTo(sectionRef.email);
        }
      } else {
        if(formData.locationName === "") {
          setError({for: "locationName", message: "Invalid Name"});
        } else {
          setError({for: "locationName", message: "Pleae Provide A Name"});
        }
        
        scrollTo(sectionRef.name);
      }
      setFormSub(false);
    }

    const addManager = async (formData: any)  => {
      
        try {
          setShowLoading(true);
          setLoadingPost(true);
          setLoadingStatement("Loading");
          const usr = await getUser();
          setLoadingStatement("Adding User");
          const locationResponse = await addLocationManagerUser(formData.managerName, formData.managerEmail,usr.signInUserSession.idToken.jwtToken, currentLocation, usr.username, formData.storyAccess === "on");
          setLoadingStatement("Finish Up");
          setName(formData.managerName);
          setLoadingPost(false);
        } catch(e) {
      
        }
      
    }
  const scrollTo = (location: any) => {
    const element = location.current;
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const scrollTopPosition = elementRect.top + window.pageYOffset - 120;
      window.scrollTo({ top: scrollTopPosition, behavior: 'smooth' });
    }
  }
  return (
    <>
      <div className='manage-user-pop-location-management'>
        <div className='header-section-access-user'>
          <div>
            <h2>Invite Employees to Manage</h2>
            <p>Manage people who have access to colabrator</p>
          </div>
          <button onClick={() => prop.setShowCreateLocationUser(false)}><i className="bi bi-x-lg"></i></button>
        </div>
        <form className='managaer-form' onSubmit={onSubmit}>

          <div className='single-col-field' ref={sectionRef.name}>
            <div className='label-field-holder'>
              <label>Manager Name</label>
              <p>The name of the manager you wish to add</p>
            </div>
            <div className='user-input-bCreate'>
              <TextInput wordCount={true} wordsAllowed={60} name="managerName" type="text" placeholder='John Doe' label='' error={error.for} note={error.message}/>
            </div>
          </div>

          <div className='single-col-field' ref={sectionRef.email}>
            <div className='label-field-holder'>
              <label>Manager Email Address</label>
              <p>The email of the manager you wish to add</p>
            </div>
            <div className='user-input-bCreate'>
              <TextInput name="managerEmail"  type="email" placeholder='mail@example.com' label='' error={error.for} note={error.message}/>
            </div>
          </div>

          <div className='single-col-field'>
            <div className='label-field-holder'> 
              <div className="checkboxes__item">
                <label className="checkbox style-e">
                  <input type="checkbox" name="storyAccess" ref={sectionRef.storyAccess}/>
                  <div className="checkbox__checkmark"></div>
                  <div className='storyAccess'>Allow Story Access</div>
                </label>
              </div>
            </div>
            <div className='user-input-bCreate'>
              <Button text='Add Manager' loading={formSub}/>
            </div>
          </div>
          
        </form>
      </div>
    {/* <div className='bbView-container'>
      <div className='dash-header-page'>
        <div className='name-path-dash-page'>
          <h2>Add Location Manager</h2>
          <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i> Location <i className="bi bi-chevron-right"></i> Add Manager</p>
        </div>
        <div className='action-button-container-dash'>
          <Link to="/dashboard/locations" className='link-button btn-primary'><i className="bi bi-arrow-left"></i> Cancel</Link>
        </div>
      </div>
     {}
    </div> */}

    {showLoading && <div className='create-location-message-pop-up'>
      <div className='pop-up-container-loader'>
      <div className={loadingPost ? "content-container-loader-single-page hidevisiility" : "content-container-loader-single-page"}>
          <i className="bi bi-check2"></i>
          <p className='reference-l'>location ref: {id}</p>
          <h2>You successfully invited {name} to be your manager</h2>
          <p className='des-location-pop'>Congratulations on adding a manager. They will shortly get a email with instructions</p>
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
export default LAddUser;



