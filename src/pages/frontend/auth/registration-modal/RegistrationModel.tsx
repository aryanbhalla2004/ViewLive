
import React, { useEffect, useState, useContext } from 'react';
import { PersonalInfo } from './components/PersonalInfo';
import { WelcomeMessage } from './components/WelcomeMessage';
import { PersonalSetting } from "./components/PersonalSetting"
import { DatabaseContext } from '../../../../setup/context-manager/dbContext';
import { BusinessInfo } from './components/BusinessInfo';
import { FileUpload } from './components/FileUpload';
import { Review } from './components/Review';
import { Auth, Storage } from 'aws-amplify';
import "./style.css";
import { useMultiStepForm } from './hooks/useMultiStepForm';
import { IProfileInterface } from './interface/IProfileInterface';
import { Button, GhostButton } from '../../../../common/Components/button/Button';
import { createBusiness } from '../../../../graphql/mutations';
import { CreateBusinessInput, Status } from '../../../../API';
import { createUser } from '../../../../graphql/mutations';
import { CreateUserInput } from '../../../../API';
import { Interest } from './components/Interest';
import { Finish } from './components/Finish';
import { AccountContext } from '../../../../setup/context-manager/AuthContext';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { isOlderEnough, isValidURL } from '../../../../common/Form_Validator/Form_validator';
import { DeviceTracking } from './components/DeviceTracking';
const INITIAL_DATA: IProfileInterface = {
  pNumber: "",
  gender: "",
  dob: "",
  interests: [],
  address: {
    __typename: "Address",
    address: "",
    unit: "",
    city: "",
    state: "",
    country: "",
    postalcode: "",
    geoLocation: {
      lat: 0,
      lng: 0,
      __typename: "Coordinates"
    },
  },
  business: {
    description: "",
    address: {
      __typename: "Address",
      address: "",
      unit: "",
      city: "",
      state: "",
      country: "",
      postalcode: "",
      geoLocation: {
        lat: 0, 
        lng: 0,
        __typename: "Coordinates"
      },
    },
    documentProof: {
      oneType: "Select Document Type",
      oneFile: null,
      twoType: "Select Document Type",
      twoFile: null
    },
    name: "",
    number: "",
    phone: "",
    size: "Select Company Size",
    type: "Select Business Type",
    websiteUrl:  "",
    createdDate: "",
  }
};

const INITIAL_ERROR: any = {
  for: "",
  note: "",
}
export const RegistrationModel = () => {
  const {pushDataUser, uploadFile} = useContext(DatabaseContext);
  const {getUser} = useContext(AccountContext);
  const [error, setError] = useState(INITIAL_ERROR);
  const [data, setData] = useState<IProfileInterface>(INITIAL_DATA);
  const [group, setGroup] = useState("");
  const [mainFormSubmitted, setMainFormSubmitted] = useState<boolean>(false);
  const [mainFormSubmitResponse, setMainFormSubmitResponse] = useState<any>(null);

  const {back, next, step, isFirstStep, isLastStep, currentStepIndex, goTo} = useMultiStepForm(
    [
      <WelcomeMessage/>,
      <BusinessInfo data={data} setData={setData} error={error}/>,
      <FileUpload data={data} setData={setData} error={error}/>,
      // <PersonalInfo data={data} setData={setData} error={error}/>,
      <Interest data={data} setData={setData} error={error}/>,
      <PersonalSetting data={data} setData={setData}/>,
      <DeviceTracking data={data} setData={setData}/>,
      <Review data={data} setData={setData}/>,
      <Finish mainFormSubmitted={mainFormSubmitted} mainFormSubmitResponse={mainFormSubmitResponse}/>
    ]
  );
  
  useEffect(() => {
    setGroup(getUser().signInUserSession.accessToken.payload['cognito:groups'][0]);

    setData((prev:any) => {
      return {...prev, business: {...prev.business, name: getUser().attributes["custom:business_name"]}}
    });
  }, []);


  const onSubmit = async () => {

    console.log(currentStepIndex);
    if(currentStepIndex === 0) {
      if(group === "Regular") {
        goTo(3);
      } else {
        next();
      }
    } else if(currentStepIndex === 1) {
      checkBusinessForm();
    } else if(currentStepIndex === 2) {
      if(group === "Regular") {
        next();
      } else {
        checkProofFile();
        //goTo(4);
      }
    } else if(currentStepIndex === 3) {
      //userProfileValidate();
      next();
    } else if(currentStepIndex === 4) {
      if(group === "Regular") {
        // userInterestCheck();
        goTo(6);
      } else {
        next();
      }
      
    } else if(currentStepIndex === 5) {
      next();
      // if(group === "Regular") {
      //   goTo(7);
      // } else {
       
      // }
    } else if (currentStepIndex === 6) {
      if(group === "Regular") {
        next();
        pushRegularData();
      } else {
        pushData();
      }
    }
  }

  const pushRegularData = async () => {
    try {
      setMainFormSubmitted(true);
      const currentUser = getUser();
      const userInfoOBJ : CreateUserInput = {
        id: currentUser.username,
        gender: data.gender,
        dob: data.dob === "" ? null : data.dob,
        familyName: "",
        givenName: "",
        interests: data.interests,
        cognitoUser: currentUser.username
      }
      
      const userInfo = await pushDataUser(createUser, userInfoOBJ);
      const attributeUpdate = await updateAttribute();
      if(attributeUpdate === undefined && userInfo === undefined) {
        setMainFormSubmitResponse("SUCCESS");
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  const generateUUID = () => {
    let now = new Date().getTime();
  
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (now + Math.random()*16)%16 | 0;
      now = Math.floor(now/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
  
    return uuid;
  }

  const updateAttribute = async () => {
    Auth.currentAuthenticatedUser().then(item => {
      Auth.updateUserAttributes(item, {
        'custom:sign_up_status': 'Complete'
      });
    })
   
  }

  const businessId = async (myId: string) => {
    Auth.currentAuthenticatedUser().then(item => {
      Auth.updateUserAttributes(item, {
        'custom:buisnessId': myId
      });
    })
   
  }


  const pushData = async () => {
    try {
      setMainFormSubmitted(true);
      const currentUser = getUser();
      const currentCredentials = await Auth.currentCredentials();
      const identityId = currentCredentials.identityId;
      const fileOneExtension = data.business?.documentProof.oneFile?.name.split('.').pop();
      const fileTwoExtension = data.business?.documentProof.twoFile?.name.split('.').pop();
      const url1 = await uploadFile(`${data.business?.documentProof.oneType}.${fileOneExtension}`, data.business?.documentProof.oneFile, "protected" );
      const url2 = await uploadFile(`${data.business?.documentProof.twoType}.${fileTwoExtension}`, data.business?.documentProof.twoFile, "protected" );
      const myId = generateUUID();

      console.log(currentUser);
      const businessOBJ: CreateBusinessInput = {
        id: myId.toString(),
        email: currentUser.attributes.email,
        searchField: "",
        description: data.business?.description || "",
        address:  {
          address: data.business?.address.address || "",
          unit: data.business?.address.unit || "",
          city: data.business?.address?.city || "",
          country: data.business?.address.country || "",
          state: data.business?.address.state || "",
          postalcode: data.business?.address.postalcode || "",
          geoLocation: {
            lat: 0,
            lng: 0,
          }
        },
        name: data.business?.name || "",
        number: parseInt(data.business?.number || "0"),
        phone: data.business?.phone || "", 
        size: data.business?.size || "",
        type: data.business?.type || "",
        websiteUrl: data.business?.websiteUrl || "https://example.com",
        createdDate: new Date().toISOString().toString(),
        status: Status.WAITING,
        cognitoUser: currentUser.username || "",
        identityId: identityId,
        documents: [{documentType: data.business?.documentProof.oneType || "", document: url1}, {documentType: data.business?.documentProof.twoType || "", document: url2}]
      }

      const businessResponse = await pushDataUser(createBusiness, businessOBJ);
      const attributeUpdate = await updateAttribute();
      const updateBusinesId = await businessId(myId.toString());
      if(attributeUpdate === undefined && businessResponse === undefined) {
        setMainFormSubmitResponse("SUCCESS");
      }
    } catch(err){
      throw err;
    }
  }

  const goBack = () => {
    switch (currentStepIndex) {
      case 3:
        if (group === "Regular") {
          goTo(0);
        } else {
          back();
        }
        break;
      case 4:
        if (group === "Regular") {
          goTo(0);
        } else {
          goTo(2);
        }
        break;
      case 7:
        if (group === "Regular") {
          goTo(5);
        } else {
          back();
        }
        break;
      default:
        back();
        break;
    }
  }

  const checkProofFile = () => {
    setError(INITIAL_ERROR);
    if(data.business?.documentProof.oneType != "" && data.business?.documentProof.twoType != "" && data.business?.documentProof.oneFile != null && data.business?.documentProof.twoFile != null) {
      goTo(4);
    } else {
      if(data.business?.documentProof.twoType == "" || data.business?.documentProof.twoFile == null) {
        setError({for: "twoType", note: "Please upload the file"});
      }
      if(data.business?.documentProof.oneType == "" || data.business?.documentProof.oneFile == null) {
        setError({for: "oneType", note: "Please upload the file"});
      }
    }
  }


  const checkBusinessForm = () => {
    setError(INITIAL_ERROR);
    if(data.business?.name != "") {
      if(data.business?.number != "" && data.business?.number.match(/^\d+$/) && data.business.number.length >= 7) {
        if(data.business?.address.address != "" && data.business?.address.city != "" && data.business?.address.country != "" && data.business?.address.state != "" && data.business?.address.state != "") {
          if(isValidPhoneNumber(data.business?.phone)) {
            if(data.business?.size != "Select Company Size" && data.business?.type != "Select Business Type") {
              if(data.business.websiteUrl == "" || isValidURL(data.business.websiteUrl)) {
                if(data.business?.description != "" && data.business?.description.length >= 500) {
                  next();
                } else {
                  if(data.business?.description == "") {
                    setError({for: "description", note: "Empty Description"});
                  } else {
                    setError({for: "description", note: "Atleast provide 500 words"});
                  }
                }
              } else {
                setError({for: "websiteUrl", note: "Provide a valid URL (Don't include https://)"});
              }
            } else {
              if(data.business.size == "Select Company Size") {
                setError({for: "size", note: "Please make a selection"});
              }
              
              if(data.business.type == "Select Business Type") {
                setError({for: "type", note: "Please make a selection"});
              }       
            }
          } else {
            setError({for: "phone", note: "Empty Field"});
          }
        } else { 
          setError({for: "address", note: "Invalid Business Name"});
        }
      } else {
        setError({for: "number", note: "Invalid Business Name"});
      }
    } else {
      setError({for: "name", note: "Invalid Business Name"});
    }
  }

  const userInterestCheck = () => {
    setError(INITIAL_ERROR);
    if(data.interests.length < 3) {
      const diff = 3 - data.interests.length;
      setError({for: "interest", note: `Attention! You need to select a ${diff} more ${diff > 1 ? "items" : "item"} to continue.`});
    } else {
      next();
    }
  }

  const userProfileValidate = () => {
    setError(INITIAL_ERROR);

        if(data.address?.address !== "" && data.address?.city !== "" && data.address?.state !== "" && data.address?.country !== "" && data.address?.postalcode !== "") {
          // if(data.dob === "" || isOlderEnough(data.dob || "")) {
            
          //     if(data.gender === "" || ) {
          //       next();
          //     } else {
          //       setError({for: "gender", note: "Please select what applies"});
          //     }
          //   // } else {
          //   //   setError({for: "dob", note: "Seems like your too young"});
          //   // }
          // } else {
          //   if(!isOlderEnough(data.dob)) {
          //     if(isOlderEnough(data.dob)) {
          //   }
          //   //setError({for: "dob", note: "Invalid Address"});
          // }
          next();
        } else {
          if(data.address.address === "") {
            setError({for: "address", note: "Invalid Address"});
          } else if (data.address.city === "") {
            setError({for: "city", note: "Invalid City"});
          } else if (data.address.state === "") {
            setError({for: "state", note: "Invalid State"});
          } else if (data.address.country === "") {
            setError({for: "country", note: "Invalid State"});
          } else {
            setError({for: "postalCode", note: "Invalid State"});
          }
        }
      
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  return (
    <form className='modal-container' onSubmit={handleSubmit}>
      {/* <div className='steps-container'>
        <div className='loader-container'>
          <div className='loader-itself' style={{width: currentProgress + '%'}}></div>
        </div>
      </div> */}
        {step}
        <div className='box-action-below-signup-modal'>
          <div className='action-modal-button'>
            {!isFirstStep && <GhostButton loading={false} text="Back" onClick={goBack} type="button"/>}
            <Button text={isLastStep ? "Finish" : "Next"} loading={false} type="button" onClick={onSubmit}/>
          </div>
          {/* {(currentStepIndex === 3) && <button type="button" onClick={next} className='skip-button-modal'>Skip <i className="bi bi-skip-forward"></i></button>} */}
        </div>
      
      
    </form>
  )
}

export default RegistrationModel;
