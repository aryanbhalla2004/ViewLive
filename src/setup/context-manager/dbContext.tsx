import { UpdateBusinessMutation, UpdateLocationMutation, UpdateUserMutation } from '../../API';
import { GraphQLQuery } from '@aws-amplify/api';
import React, {createContext, useEffect, useState} from 'react';
import { Auth, Hub, Storage } from "aws-amplify";
import {CognitoUser} from "@aws-amplify/auth";
import { Session } from 'inspector';
import { API } from 'aws-amplify';
import { listLocations } from '../../graphql/queries';
const DatabaseContext = createContext<any>(null);



const DbProvider = ({children}: any) => {
  const [user, setUser] = useState<CognitoUser>();
  const pushDataUser = async (where:any, what:any) => {
    const response = await API.graphql({query: where, variables: {input: what}, authMode: "AMAZON_COGNITO_USER_POOLS" });
    return response;
  }
  const pullObj = async (where:any, id:string) => {
    return await API.graphql({query: where, variables: { id: id },  authMode: "AMAZON_COGNITO_USER_POOLS"});
  }

  const fullDataAPI = async (where: any) => {
    return await API.graphql({query: where, authMode: "API_KEY"});
  }

  const pullDataAPI = async (where: any, id:string) => {
    return await API.graphql({query: where, variables: { id: id }, authMode: "API_KEY"});
  }

  const pullDataPaginationAPI = async (where: any, id:string, limit:number, sortDirection:string, nextToken = null) => {
    return await API.graphql({query: where, variables: { id: id,  limit, nextToken}, authMode: "API_KEY"});
  }


  const pullDataFilter = async (where: any, object:any, authMode:String) => {
    if(authMode === "API") {
      return await API.graphql({query: where, variables: object, authMode: "API_KEY"});
    } else if (authMode === "USER") {
      return await API.graphql({query: where, variables: object, authMode: "AMAZON_COGNITO_USER_POOLS"});
    }
  }

  const updateDataAPI = async (userId:any, userJwt:any, type:any, data:any) => {
    // //console.log(user.signInUserSession.accessToken.jwtToken);
    const itm = await fetch("https://jzvu0yuond.execute-api.ca-central-1.amazonaws.com/test",
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': userJwt,
        },
        body: JSON.stringify({

          type: type,
          data: data,
          userId: userId,
        }),
        
    });
    return itm;
    }


    const addLocationManagerUser = async (name:any, email:any, userJwt:any, data:any, userId:any, storyAccess:boolean) => {
      console.log("ran");
      const itm = await fetch("https://7vqpo68guj.execute-api.ca-central-1.amazonaws.com/test",
        {
          mode: "cors",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': userJwt,
          },
          body: JSON.stringify({
            name: name,
            email: email,
            userId: userId,
            data:data,
            storyAccess:storyAccess
          }),
      });
      return itm;
      }

  const fetchData = async (where:string) => {
    return await API.graphql({query: where, authMode: "AMAZON_COGNITO_USER_POOLS"});
  };

  const fetchProtectedObject = async (where:any, id:any ) => {
    const response = Storage.get(where, {level: "protected", identityId: id});
    return response;
  }

  const fetchPublicObject = async (where:any) => {
    const response = Storage.get(where, {level: "public"});
    return response;
  }

  const fetchPublicList = async (where:any) => {
    const response = Storage.list(where, {level: "public"});
    return response;
  }
  
  const uploadFile = async (key:string, file:File, levelPr:any) => { 
    try {
      const itm = await Storage.put(key, file, {
        level: levelPr,
        contentType: file.type,
      });
       //const url = `https://www.${awsExp.aws_user_files_s3_bucket}.s3.${awsExp.aws_user_files_s3_bucket_region}.amazonaws.com/${levelPr}/${key}`;
      return key;
    } catch (err) {
      throw err;
    }
  };

  const updateBusinessFunction = async (query: any, variables: any) => {
    const response = await API.graphql<GraphQLQuery<UpdateBusinessMutation>>({
      query: query,
      variables: {input: variables}
    });

    return response;
  }
  
  const updateLocationFunction = async (query: any, variables: any) => {
    const response = await API.graphql<GraphQLQuery<UpdateLocationMutation>>({
      query: query,
      variables: {input: variables}
    });

    return response;
  }

  const updateUserFunction = async (query: any, variables: any) => {
    const response = await API.graphql<GraphQLQuery<UpdateUserMutation>>({
      query: query,
      variables: {input: variables}
    });

    return response;
  }


  const checkBusinessAvailability = async () => {
      const itm = await fetch("https://62xj7fcel2.execute-api.ca-central-1.amazonaws.com/dev/api-gateway/lambda",
        {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businessName: "sdasda",//from
          }),
          
      });

       const res = await itm.json();
       console.log(res);

  }

  const calculateRange = async (latitude:any, longitude:any, radius:any) => {

    console.log(latitude, longitude, radius);
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

   
    return {
      maxLat: maxLat,
      minLat: minLat,
      maxLon: maxLon,
      minLon: minLon
    }
  }

  const getLocationByGEO = async (maxLat:number, minLat:number, maxLon:number, minLon:number) => {
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
      let response = await pullDataFilter(listLocations, variables, "API");
      return response;
    } catch(response){
      throw response;
    }
  }

  const deleteById = async (what: any, id: any) => {
    try {
      const response = await API.graphql({
        query: what,
        variables: {input: {
          id: id
        }}
      });
      return response;
    } catch (err) {
      throw err;
    }
    
  }

  return (
    <DatabaseContext.Provider value={{deleteById, pullDataPaginationAPI, addLocationManagerUser, getLocationByGEO, calculateRange, fetchPublicList, updateDataAPI, updateUserFunction, checkBusinessAvailability, fetchPublicObject, updateLocationFunction, updateBusinessFunction, pullDataFilter, pullDataAPI, fullDataAPI, pushDataUser, uploadFile, fetchData, pullObj, fetchProtectedObject}}>
      {children}
    </DatabaseContext.Provider>
  )
}

export {DbProvider, DatabaseContext}