import React, {Suspense, useContext, useEffect, useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import { AccountContext } from './setup/context-manager/AuthContext';
import Dashboard from "./pages/backend/Dashboard";
import BView from "./pages/backend/location/view/LView";
import BManage from "./pages/backend/location/manage/BManage";
import AdminBManage from "./pages/backend/Admin/businessInquires/manage/AdminBManage"
import BReview from "./pages/backend/location/manage/review/BReview";
import Loading from "./common/Components/pre-loader/Loading";
import AdminBGeneral from "./pages/backend/Admin/businessInquires/manage/general/AdminBGeneral"
import { BInquires } from "./pages/backend/Admin/businessInquires/BInquires";
import { LandingPage } from "./pages/frontend/landingPage/LandingPage";
import {SearchPage} from "./pages/frontend/landingPage/SearchPage/SearchPage"
import { DatabaseContext } from "./setup/context-manager/dbContext";
import {listUsers} from "./graphql/queries";
import { WelcomeUser } from "./common/Components/welcome-user-form/WelcomeUser";
import { BusinessDetailPage } from "./pages/frontend/business-detail/Business-Detail-Page";
import { MyBusiness } from "./pages/backend/business/MyBusiness";
import LGeneral from "./pages/backend/location/manage/general/LGeneral";
import { BGeneral } from "./pages/backend/business/general/BGeneral";
import { IStorageLocation } from "./common/Interfaces/IStorageLocation";
import { LiveGallery } from "./pages/frontend/live-gallery/LiveGallery";
import { Location } from "./API";
import { Admin } from "./pages/backend/Admin/Admin";
import { AllBusiness } from "./pages/backend/Admin/business/AllBusiness";
import { LInquires } from "./pages/backend/Admin/locationInquires/LInquires";
import LCreate from "./pages/backend/location/create/LCreate";
import LInquireManage from "./pages/backend/Admin/locationInquires/manage/LInquireManage";
import { Error404 } from "./pages/frontend/error404/Error404";
import { AdminLInquireGeneral } from "./pages/backend/Admin/locationInquires/manage/general/AdminLInquireGeneral";
import { ResubmitBusiness } from "./pages/backend/business/resubmit-business/ResubmitBusiness";
import { MyFavourites } from "./pages/backend/my-favourites/MyFavourites";
import { MyReviews } from "./pages/backend/my-reviews/MyReviews";
import  LEdit from "./pages/backend/location/edit/LEdit";
import { UserManagement } from "./pages/backend/Admin/user-management/UserManagement";
import { SingleUserManagement } from "./pages/backend/Admin/user-management/manage/SingleUserManagement";
import { LSetting } from "./pages/backend/location/manage/settings/LSetting";
import { BSetting } from "./pages/backend/business/setting/BSetting";
import { listLocation } from "./common/util/api_queries";
const Auth = React.lazy(() => import('./pages/frontend/auth'));
const SignIn = React.lazy(() => import('./pages/frontend/auth/sign-in/Signin'));
const ForgotPassword = React.lazy(() => import('./pages/frontend/auth/password-recovery/ForgotPassword'));
const SignUp = React.lazy(() => import('./pages/frontend/auth/sign-up/SignUp'));
const Logout = React.lazy(() => import('./pages/frontend/auth/logout/Logout'));
const Main = React.lazy(() => import('./pages/frontend/main/Main'));
const RegistrationModel = React.lazy(() => import('./pages/frontend/auth/registration-modal/RegistrationModel'));
const ActivateAccount = React.lazy(() => import('./pages/frontend/auth/components/activate-account/ActivateAccount'));

// interface context {
//   user: CognitoUser,
//   logout: () => void,
//   fetchDevices: () => void
// }

const App = () => {
  const {fetchData, pullDataFilter} = useContext(DatabaseContext);
  const [popupModal, setPopModal] = useState<boolean>(false);
  const [popupFirstUserModal, setPopupFirstUserModal] = useState<boolean>(false);
  const {getUser, isAuthenticated, isLoading, logout, setUserProfile} = useContext(AccountContext);
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>();
  const [userLocalStorage, setUserLocalStorage] = useState<IStorageLocation | null>(null);
  const [contentLoader, setContentLoader] = useState(true);

  useEffect(() => {
    window.addEventListener('load', () => {
      setContentLoader(false);
    });
  }, []);

  // useEffect(() => {
  //   checkBusinessAvailability("sdsdsds");
  // }, []);
  

  const getUserProfile = async() => {
    try {
      const res = await fetchData(listUsers);
      setUserProfile(res.data.listUsers.items[0]);
    } catch(e: any) {
      console.log(e);
    }
  }

  
  useEffect(() => {
    if(!isLoading && isAuthenticated) {
      //logout(false);
      const data = getUser();
      if(data !== null) {
        const signUpStatus = data?.attributes["custom:sign_up_status"];
        const group = data?.signInUserSession.accessToken.payload['cognito:groups'][0];
        if(signUpStatus === "pending" && group !== "Admin") {
          setPopModal(true);
          navigate("/finialize-details");
        }

        if(signUpStatus === "Complete") {
          getUserProfile();
          // subscribeToUpdateUser();
        }
      } else {
        logout(true);
      }
    
      
      //getData();
      //handleClick();
    }
  }, [isAuthenticated, isLoading, navigate]);

  // const subscription = DataStore.observe(onUpdateUser, c => c).subscribe(async () => {
  //   // Handle the update here. Fetch the latest data from the User table.
  //   const users = await DataStore.query(onUpdateUser, Predicates.ALL);
  //   console.log('Updated User table data:', users);
  // });

  

  // const subscribeToUpdateUser = () => {
  //   console.log("isWatching");
  //   const sub = API.graphql<GraphQLSubscription<OnUpdateUserSubscription>>(
  //     graphqlOperation(onUpdateUser)
  //   ).subscribe({
  //     next: ({ provider, value }) => {
  //       setUserProfile(value.data?.onUpdateUser)
  //     },
  //     error: (error) => console.warn(error)
  //   });
  //   // To stop listening for updates, you can unsubscribe
  //   // subscription.unsubscribe();
  // };

  

  const calculateRange = async (latitude:any, longitude:any, radius:any) => {
    // Radius of the Earth in kilometers
    const earthRadius = 6371;

    // Convert latitude and longitude to radians
    const latRad = (latitude * Math.PI) / 180;
    const lonRad = (longitude * Math.PI) / 180;
  
    // Calculate the range of latitude coordinates
    const latRange = (radius / earthRadius) * (180 / Math.PI);
  
    // Calculate the range of longitude coordinates
    const lonRange = (radius / earthRadius) * (180 / Math.PI) / Math.cos(latRad);
  
    // Calculate the minimum and maximum latitude coordinates
    const minLat = latitude - latRange;
    const maxLat = latitude + latRange;
  
    // Calculate the minimum and maximum longitude coordinates
    const minLon = longitude - lonRange;
    const maxLon = longitude + lonRange;

    if(maxLat > 0 ) {
      getData(maxLat, minLat, maxLon, minLon);
      
    }
  }

  const getData = async (maxLat:number, minLat:number, maxLon:number, minLon:number) => {
    const variables = {
      filter: {
        latitude: {
          between: [minLat, maxLat],
        },
        longitude: {
          between: [minLon, maxLon],
        },
      }
    };

    try {
      let response = await pullDataFilter(listLocation, variables, "API");
      console.log(response);
      setLocations(response.data.listLocations.items)
    } catch(response){
      console.log(response);
    }
  }
  

  useEffect(() => {
    const userStorageData =  localStorage.getItem("userLocationStorageViewLive");
    if(userStorageData === null) {
      setPopupFirstUserModal(true);
    } else {
      const data = JSON.parse(localStorage.getItem("userLocationStorageViewLive") || "");
      const startEvent = new Date(data.createdDate);
      const nowEvent = new Date();
      const msBetweenDates =  nowEvent.getTime() - startEvent.getTime();
      if(convertMsToTime(msBetweenDates) >= 720) {
        localStorage.removeItem("userLocationStorageViewLive");
        setPopupFirstUserModal(true);
      } else {
        setUserLocalStorage(data);
      }
    }
    
  }, []);


  useEffect(() => {
    calculateRange(userLocalStorage?.geo.latitude, userLocalStorage?.geo.longitude, userLocalStorage?.coverage_area);
  }, [userLocalStorage]);

  function convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    return hours;
  }

  //const getData = async () => {
  //   const prefix = 'admin/'; // replace with your custom prefix
  //   try {
  //   //const { key: prefixKey }: any = await Storage.vault.get(prefix);
  //   //console.log(prefixKey);
  //   //const s3ObjectList = await Storage.list('', { prefix: prefixKey,  });
  //   //setS3Objects(s3ObjectList);
  // } catch (error) {
  //   console.log('Error fetching S3 objects', error);
  // }
    //const userSession = await auth.currentCredentials();
     //console.log(userSession);
   // await Storage.list("", {level: "protected", identityId: "091f5f6c-9546-470c-adfa-ddbea475bd04"}).then((res) => {console.log(res)});
   //await Storage.list("", {level: "protected"}).then((res) => {console.log(res)});
  //}

  // const handleClick = async () => {
  //   try {
  //     const user = await auth.currentAuthenticatedUser();
  //     const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
  //     if (groups && groups.includes('Admin')) {
  //       const response = await axios.get('https://qgt6y6j5fa7gr4qlswad72rxja0gxnsy.lambda-url.ca-central-1.on.aws/', {
  //         headers: {
  //           Authorization: user.signInUserSession.idToken.jwtToken
  //         }
  //       });
  //       console.log(response.data);
  //     } else {
  //       console.log('You do not have access to this resource.');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     console.log('An error occurred.');
  //   }
  // };
  

  // useEffect(() => {
  //   if(user !== null) {
  //     getAttributes();
  //   }
  // }, [user]);


  // const getAttributes = async () => {
  //   try {
  //     const userAttributes = await auth.currentUserInfo();
  //     setUserAttributes(userAttributes.attributes);
  //   } catch(e: any) {
  //     console.log(e);
  //   }
  // }
  
  // useEffect(()=> {
  //   if(userAttributes != undefined && userAttributes?.["custom:sign_up_status"] === "pending"){
  //     console.log(userAttributes);
  //     setPopModal(true);
  //     navigate("/finialize-details")
  //   }
  // },[userAttributes]);
  
  //const assing = async () => {
    
   
    // fetch('https://lqdmdlwokj.execute-api.ca-central-1.amazonaws.com/default/codeVerification' , {
    //   headers: {
    //     'cognito_id': '328cdebf-57be-4a76-b780-01f3f6b96a9c',
    //     'group_name': 'Business',
    //   },
    // }).then((response) => {
    //   console.log(response);
    // })
    //console.log(lambda);
    // const params = {
    //   FunctionName: 'codeVerification',
    //   Payload: JSON.stringify({ key: 'value' })
    // };

    // lambda.invoke(params, function(err, data) {
    //   if (err) console.log(err, err.stack);
    //   else console.log(data);
    // });
    
    // const cognitoClient = new AWS.CognitoIdentityServiceProvider({ accessKeyId: "AKIAZOQ6A5YC3F6NKPZT",
    // secretAccessKey: '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', region: awsExports.aws_cognito_region});
    // console.log(cognitoClient);
    // const params = {
    //   UserPoolId: 'ca-central-1_JUXBwSQxY',
    //   Username: '328cdebf-57be-4a76-b780-01f3f6b96a9c',
    //   GroupName: "ADSDASdasd"
    // };
    // const response = await cognitoClient.adminAddUserToGroup(params).promise();
    // console.log(response);
    // try {
    //   const response = await cognitoClient.adminAddUserToGroup(params).promise();
    //   console.log(response);
    // } catch (e) {
    //   console.log(e);
    // }

  //}

  return (
    contentLoader || isLoading ? <Loading/> :
    <>
    {popupFirstUserModal && <WelcomeUser setPopupFirstUserModal={setPopupFirstUserModal}/>}
    <Routes>
      <Route path="*" element={<Error404/>}></Route>
      <Route path="live-gallery" element={<LiveGallery locations={locations}/>}/>
      {/*  Dashboard */}
      <Route path="dashboard" element={<Suspense fallback={<Loading/>}><Dashboard /></Suspense>}>
        
        <Route path="my-favourites" element={<MyFavourites />} />
        <Route path="my-reviews" element={<MyReviews />} />
        <Route path="business" element={<MyBusiness />}>
          <Route index element={<BGeneral/>}/>
          <Route path="settings" element={<BSetting />}/>
        </Route>
        <Route path="business/resubmit" element={<ResubmitBusiness />}/>

        <Route path="locations" element={<BView/>}/>
        <Route path="locations/create" element={<LCreate/>}/>
        <Route path="locations/edit/:id" element={<LEdit/>}/>
        <Route path="locations/:id" element={<BManage/>}>
          <Route index element={<LGeneral/>}/>
          <Route path="advertise" element={<h1>hello</h1>}/>
          <Route path="reviews" element={<BReview/>}/>
          <Route path="analytics" element={<h1>hello</h1>}/>
          <Route path="settings" element={<LSetting />}/>
        </Route>
        

        <Route path="admin" element={<Admin/>}>
          <Route path="business" element={<AllBusiness/>}></Route> 
          <Route path="business/:id" element={<></>}>
            <Route index element={<AdminBGeneral/>}/>
            <Route path="locations" element={<h1>hello</h1>}/>
            <Route path="settings" element={<h1>hello</h1>}/>
          </Route>

          <Route path="business-inquires" element={<BInquires/>}></Route>
          <Route path="business-inquires/:id" element={<AdminBManage/>}>
            <Route index element={<AdminBGeneral/>}/>
          </Route>

          <Route path="location-inquires" element={<LInquires/>}></Route>
          <Route path="location-inquires/:id" element={<LInquireManage/>}>
            <Route index element={<AdminLInquireGeneral/>}/>
          </Route>
          
          <Route path="user-management" element={<UserManagement />}/>
          <Route path="user-management/:id" element={<SingleUserManagement/>}></Route>
        </Route>

        
      </Route>

      {/* /! Main */}
      <Route path="/" element={<Suspense fallback={<Loading/>}><Main /></Suspense>}>
        <Route index element={<LandingPage locations={locations}/>}/>
        <Route path="search" element={<SearchPage/>}/>s
        <Route path="vendor/:id" element={<BusinessDetailPage />}/>
        <Route path="finialize-details" element={(isAuthenticated && popupModal) ? <RegistrationModel /> : <Navigate to="/" replace />}/>
      </Route>

      {/*  Auth */}
      <Route path="auth" element={<Suspense fallback={<Loading/>}><Auth/></Suspense>}>
        <Route index element={getUser() != null ? <Navigate to="/" replace /> : <Suspense fallback={<Loading/>}><SignIn/></Suspense>} />
        <Route path="forgot-password" element={<Suspense fallback={<Loading/>}><ForgotPassword/></Suspense>}/>
        <Route path="sign-up">
          <Route index element={<Suspense fallback={<Loading/>}><SignUp/></Suspense>}/>
          <Route path="activate" element={<Suspense fallback={<Loading/>}><ActivateAccount/></Suspense>}/>
        </Route>
      </Route>

      {/* Logout */}
      <Route path="logout/:global" element={<Suspense fallback={<Loading/>}><Logout/></Suspense>}/>


    </Routes> 
    </>
  )
}

export default App;
