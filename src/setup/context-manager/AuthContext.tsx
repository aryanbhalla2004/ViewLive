import React, {createContext, useEffect, useState} from 'react';
import { Auth } from "aws-amplify";
import {CognitoUser} from "@aws-amplify/auth";
import { IUserAttributes } from '../../common/Interfaces/IUserAttributes';
import { User } from '../../API';
const AccountContext = createContext<any>(null);

//? Used for creating new password
interface userIdentity {
  username: string,
  code: string,
  password: string
}

//? Used when the user register
interface userSignUp {
  email: string,
  password: string,
  fName: string,
  lName: string,
  accountType: string,
}

interface businessSignup extends userSignUp {
  businessName: string,
}

const AccountProvider = ({children}: any) => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
      const expirationTime = currentSession.getIdToken().payload.exp;
      if (expirationTime * 1000 < Date.now()) {
        await Auth.signOut();
        setUser(null);
        setIsAuthenticated(false);
      } else {
        const userAttributes = await Auth.currentUserInfo();
        setUser({...currentUser, attributes: userAttributes.attributes});
        setIsAuthenticated(true);
      }
    } catch (error) {
      await Auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }

  const getUser = () => {
    return user;
  };

  const login = async (email: string, password: string) => {
    try {
      const user = await Auth.signIn(email, password);
      return user;
    } catch (err) {
      throw err;
    }
  }

  const logout = async (isGlobal: boolean) => {
    await Auth.signOut({global: isGlobal});
    setUser(null);
  }

  const forgotPassword = async (email: string) => {
    try {
      const response = await Auth.forgotPassword(email);
      return response;
    } catch(err) {
      throw(err);
    }
  }

  const createNewPassword = async (userIdentification: userIdentity) => {
    const {username, code, password} = userIdentification;
    try {
      const response = await Auth.forgotPasswordSubmit(username, code, password);
      return response;
    } catch (err) {
      throw err;
    }
  }


  const confirmMFACode = async (user:CognitoUser, code: string) => {
    try {
      const response = await Auth.confirmSignIn(user, code, "SMS_MFA");
      return response;
    } catch (err) {
      throw err;
    }
  }

  const completeUserPassword = async (tempUser: CognitoUser, password: string, attributes: any) => {
    console.log(attributes)
    try {
      const response = await Auth.completeNewPassword(tempUser, password, {
        given_name: "N/A",
        family_name: 'N/A',
      });
      return response;
    } catch(err) {
      throw err;
    }
  }

  const verifyMFACode = async (email: string, code: string) => {
    try {
      const response = await Auth.confirmSignUp(email, code);
      return response;
    } catch (err) {
      throw (err);
    }
  }

  const sendMFACode = async (email: string) => {
    try {
      const response = await Auth.resendSignUp(email);
      return response;
    } catch (err) {
      throw err;
    }
  }

  const register = async (registration: userSignUp) => {
    const {email, password, fName, lName, accountType} = registration;
    let attributes:any = {
      given_name: fName,
      family_name: lName,
      phone_number: "+10000000000",
      'custom:account_type': accountType,
      'custom:sign_up_status': 'pending',
    }

    try {
      const response = await Auth.signUp({
        username: email,
        password: password,
        attributes
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  const businessRegister = async (registration:businessSignup) => {
    const {email, password, fName, lName, accountType, businessName} = registration;

    let attributes:any = {
      given_name: fName,
      family_name: lName,
      phone_number: "+10000000000",
      'custom:account_type': accountType,
      'custom:sign_up_status': 'pending',
      'custom:business_name': businessName
    }

    try {
      const response = await Auth.signUp({
        username: email,
        password: password,
        attributes
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  const fetchDevices = async () => {
    try {
      const result = await Auth.fetchDevices();
      return result
    } catch (err) {
      console.log('Error fetching devices', err);
    }
  }

  const getUserProfile = (uuid: string) => {

    var colorsArray = [
      "#FFA07A", // Light Salmon
      "#00CED1", // Dark Turquoise
      "#E0FFFF", // Light Cyan
      "#FFD700", // Gold
      "#DA70D6", // Orchid
      "#FF6347", // Tomato
      "#00FF7F", // Spring Green
      "#BA55D3", // Medium Orchid
      "#87CEFA", // Light Sky Blue
      "#7B68EE", // Medium Slate Blue
      "#F0E68C", // Khaki
      "#FFC0CB", // Pink
      "#8A2BE2", // Blue Violet
      "#FFE4C4", // Bisque
      "#20B2AA", // Light Sea Green
      "#DDA0DD", // Plum
      "#556B2F", // Dark Olive Green
      "#9370DB", // Medium Purple
      "#BDB76B", // Dark Khaki
      "#FFDAB9"  // Peach
    ];

    uuid = uuid.replace(/-/g, '');
  
    // Convert hexadecimal UUID to decimal
    var decimalValue = BigInt('0x' + uuid);

    // Calculate modulo 15
    var result = decimalValue % BigInt(20);

    const colorIndex = parseInt(result.toString());

    return colorsArray[colorIndex];
      
  
  }

  const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("userLocationStorageViewLive") || "");
    const radius = 500;
    if(data !== null || data !== ""){

      const earthRadius = 6371;
  
      // Convert latitude and longitude to radians
      const latRad = (data?.geo?.latitude * Math.PI) / 180;
      const lonRad = (data?.geo?.longitude * Math.PI) / 180;
    
      // Calculate the range of latitude coordinates
      const latRange = (radius / earthRadius) * (180 / Math.PI);
    
      // Calculate the range of longitude coordinates
      const lonRange = (radius / earthRadius) * (180 / Math.PI) / Math.cos(latRad);
    
      // Calculate the minimum and maximum latitude coordinates
      const minLat = data?.geo?.latitude - latRange;
      const maxLat = data?.geo?.latitude + latRange;
    
      // Calculate the minimum and maximum longitude coordinates
      const minLon = data?.geo?.longitude - lonRange;
      const maxLon = data?.geo?.longitude + lonRange;
  
      if(maxLat > 0 ) {
        return {maxLat: maxLat, minLat: minLat, maxLon:maxLon, minLon:minLon};
      }
    } else{
      return null;
    }
  }

  return (
    <AccountContext.Provider value={{getUserProfile, confirmMFACode, setUserProfile, userProfile, getLocalStorage, isLoading, isAuthenticated , login, forgotPassword, createNewPassword, verifyMFACode, register, completeUserPassword, sendMFACode, logout, getSession, fetchDevices, getUser, businessRegister}}>
      {children}
    </AccountContext.Provider>
  )
}

export { AccountProvider, AccountContext}