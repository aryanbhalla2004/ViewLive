/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createReviewInteractions = /* GraphQL */ `mutation CreateReviewInteractions(
  $input: CreateReviewInteractionsInput!
  $condition: ModelReviewInteractionsConditionInput
) {
  createReviewInteractions(input: $input, condition: $condition) {
    id
    reviewID
    reaction
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReviewInteractionsMutationVariables,
  APITypes.CreateReviewInteractionsMutation
>;
export const updateReviewInteractions = /* GraphQL */ `mutation UpdateReviewInteractions(
  $input: UpdateReviewInteractionsInput!
  $condition: ModelReviewInteractionsConditionInput
) {
  updateReviewInteractions(input: $input, condition: $condition) {
    id
    reviewID
    reaction
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReviewInteractionsMutationVariables,
  APITypes.UpdateReviewInteractionsMutation
>;
export const deleteReviewInteractions = /* GraphQL */ `mutation DeleteReviewInteractions(
  $input: DeleteReviewInteractionsInput!
  $condition: ModelReviewInteractionsConditionInput
) {
  deleteReviewInteractions(input: $input, condition: $condition) {
    id
    reviewID
    reaction
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReviewInteractionsMutationVariables,
  APITypes.DeleteReviewInteractionsMutation
>;
export const createReviewReply = /* GraphQL */ `mutation CreateReviewReply(
  $input: CreateReviewReplyInput!
  $condition: ModelReviewReplyConditionInput
) {
  createReviewReply(input: $input, condition: $condition) {
    id
    description
    ownerName
    reviewID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReviewReplyMutationVariables,
  APITypes.CreateReviewReplyMutation
>;
export const updateReviewReply = /* GraphQL */ `mutation UpdateReviewReply(
  $input: UpdateReviewReplyInput!
  $condition: ModelReviewReplyConditionInput
) {
  updateReviewReply(input: $input, condition: $condition) {
    id
    description
    ownerName
    reviewID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReviewReplyMutationVariables,
  APITypes.UpdateReviewReplyMutation
>;
export const deleteReviewReply = /* GraphQL */ `mutation DeleteReviewReply(
  $input: DeleteReviewReplyInput!
  $condition: ModelReviewReplyConditionInput
) {
  deleteReviewReply(input: $input, condition: $condition) {
    id
    description
    ownerName
    reviewID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReviewReplyMutationVariables,
  APITypes.DeleteReviewReplyMutation
>;
export const createReportReview = /* GraphQL */ `mutation CreateReportReview(
  $input: CreateReportReviewInput!
  $condition: ModelReportReviewConditionInput
) {
  createReportReview(input: $input, condition: $condition) {
    id
    reason
    additionalComments
    reviewID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReportReviewMutationVariables,
  APITypes.CreateReportReviewMutation
>;
export const updateReportReview = /* GraphQL */ `mutation UpdateReportReview(
  $input: UpdateReportReviewInput!
  $condition: ModelReportReviewConditionInput
) {
  updateReportReview(input: $input, condition: $condition) {
    id
    reason
    additionalComments
    reviewID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReportReviewMutationVariables,
  APITypes.UpdateReportReviewMutation
>;
export const deleteReportReview = /* GraphQL */ `mutation DeleteReportReview(
  $input: DeleteReportReviewInput!
  $condition: ModelReportReviewConditionInput
) {
  deleteReportReview(input: $input, condition: $condition) {
    id
    reason
    additionalComments
    reviewID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReportReviewMutationVariables,
  APITypes.DeleteReportReviewMutation
>;
export const createLocationManager = /* GraphQL */ `mutation CreateLocationManager(
  $input: CreateLocationManagerInput!
  $condition: ModelLocationManagerConditionInput
) {
  createLocationManager(input: $input, condition: $condition) {
    id
    storyAccess
    userId
    familyName
    givenName
    fullAccess
    locationID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLocationManagerMutationVariables,
  APITypes.CreateLocationManagerMutation
>;
export const updateLocationManager = /* GraphQL */ `mutation UpdateLocationManager(
  $input: UpdateLocationManagerInput!
  $condition: ModelLocationManagerConditionInput
) {
  updateLocationManager(input: $input, condition: $condition) {
    id
    storyAccess
    userId
    familyName
    givenName
    fullAccess
    locationID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLocationManagerMutationVariables,
  APITypes.UpdateLocationManagerMutation
>;
export const deleteLocationManager = /* GraphQL */ `mutation DeleteLocationManager(
  $input: DeleteLocationManagerInput!
  $condition: ModelLocationManagerConditionInput
) {
  deleteLocationManager(input: $input, condition: $condition) {
    id
    storyAccess
    userId
    familyName
    givenName
    fullAccess
    locationID
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLocationManagerMutationVariables,
  APITypes.DeleteLocationManagerMutation
>;
export const createChatGroup = /* GraphQL */ `mutation CreateChatGroup(
  $input: CreateChatGroupInput!
  $condition: ModelChatGroupConditionInput
) {
  createChatGroup(input: $input, condition: $condition) {
    id
    userID
    locationID
    ChatMessages {
      items {
        id
        senderID
        receiverID
        data
        timeStamp
        isFile
        chatgroupID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatGroupMutationVariables,
  APITypes.CreateChatGroupMutation
>;
export const updateChatGroup = /* GraphQL */ `mutation UpdateChatGroup(
  $input: UpdateChatGroupInput!
  $condition: ModelChatGroupConditionInput
) {
  updateChatGroup(input: $input, condition: $condition) {
    id
    userID
    locationID
    ChatMessages {
      items {
        id
        senderID
        receiverID
        data
        timeStamp
        isFile
        chatgroupID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatGroupMutationVariables,
  APITypes.UpdateChatGroupMutation
>;
export const deleteChatGroup = /* GraphQL */ `mutation DeleteChatGroup(
  $input: DeleteChatGroupInput!
  $condition: ModelChatGroupConditionInput
) {
  deleteChatGroup(input: $input, condition: $condition) {
    id
    userID
    locationID
    ChatMessages {
      items {
        id
        senderID
        receiverID
        data
        timeStamp
        isFile
        chatgroupID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatGroupMutationVariables,
  APITypes.DeleteChatGroupMutation
>;
export const createChatMessage = /* GraphQL */ `mutation CreateChatMessage(
  $input: CreateChatMessageInput!
  $condition: ModelChatMessageConditionInput
) {
  createChatMessage(input: $input, condition: $condition) {
    id
    senderID
    receiverID
    data
    timeStamp
    isFile
    chatgroupID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatMessageMutationVariables,
  APITypes.CreateChatMessageMutation
>;
export const updateChatMessage = /* GraphQL */ `mutation UpdateChatMessage(
  $input: UpdateChatMessageInput!
  $condition: ModelChatMessageConditionInput
) {
  updateChatMessage(input: $input, condition: $condition) {
    id
    senderID
    receiverID
    data
    timeStamp
    isFile
    chatgroupID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatMessageMutationVariables,
  APITypes.UpdateChatMessageMutation
>;
export const deleteChatMessage = /* GraphQL */ `mutation DeleteChatMessage(
  $input: DeleteChatMessageInput!
  $condition: ModelChatMessageConditionInput
) {
  deleteChatMessage(input: $input, condition: $condition) {
    id
    senderID
    receiverID
    data
    timeStamp
    isFile
    chatgroupID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatMessageMutationVariables,
  APITypes.DeleteChatMessageMutation
>;
export const createKeywords = /* GraphQL */ `mutation CreateKeywords(
  $input: CreateKeywordsInput!
  $condition: ModelKeywordsConditionInput
) {
  createKeywords(input: $input, condition: $condition) {
    id
    keyword
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateKeywordsMutationVariables,
  APITypes.CreateKeywordsMutation
>;
export const updateKeywords = /* GraphQL */ `mutation UpdateKeywords(
  $input: UpdateKeywordsInput!
  $condition: ModelKeywordsConditionInput
) {
  updateKeywords(input: $input, condition: $condition) {
    id
    keyword
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateKeywordsMutationVariables,
  APITypes.UpdateKeywordsMutation
>;
export const deleteKeywords = /* GraphQL */ `mutation DeleteKeywords(
  $input: DeleteKeywordsInput!
  $condition: ModelKeywordsConditionInput
) {
  deleteKeywords(input: $input, condition: $condition) {
    id
    keyword
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteKeywordsMutationVariables,
  APITypes.DeleteKeywordsMutation
>;
export const createLiveSnap = /* GraphQL */ `mutation CreateLiveSnap(
  $input: CreateLiveSnapInput!
  $condition: ModelLiveSnapConditionInput
) {
  createLiveSnap(input: $input, condition: $condition) {
    id
    video
    expirationUnixTime
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLiveSnapMutationVariables,
  APITypes.CreateLiveSnapMutation
>;
export const updateLiveSnap = /* GraphQL */ `mutation UpdateLiveSnap(
  $input: UpdateLiveSnapInput!
  $condition: ModelLiveSnapConditionInput
) {
  updateLiveSnap(input: $input, condition: $condition) {
    id
    video
    expirationUnixTime
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLiveSnapMutationVariables,
  APITypes.UpdateLiveSnapMutation
>;
export const deleteLiveSnap = /* GraphQL */ `mutation DeleteLiveSnap(
  $input: DeleteLiveSnapInput!
  $condition: ModelLiveSnapConditionInput
) {
  deleteLiveSnap(input: $input, condition: $condition) {
    id
    video
    expirationUnixTime
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLiveSnapMutationVariables,
  APITypes.DeleteLiveSnapMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    gender
    dob
    interests
    cognitoUser
    givenName
    familyName
    myFavourites
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    gender
    dob
    interests
    cognitoUser
    givenName
    familyName
    myFavourites
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    gender
    dob
    interests
    cognitoUser
    givenName
    familyName
    myFavourites
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createReview = /* GraphQL */ `mutation CreateReview(
  $input: CreateReviewInput!
  $condition: ModelReviewConditionInput
) {
  createReview(input: $input, condition: $condition) {
    id
    description
    flag
    locationID
    rating
    ownerName
    ReportReviews {
      items {
        id
        reason
        additionalComments
        reviewID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    ReviewReplies {
      items {
        id
        description
        ownerName
        reviewID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    ReviewInteraction {
      items {
        id
        reviewID
        reaction
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReviewMutationVariables,
  APITypes.CreateReviewMutation
>;
export const updateReview = /* GraphQL */ `mutation UpdateReview(
  $input: UpdateReviewInput!
  $condition: ModelReviewConditionInput
) {
  updateReview(input: $input, condition: $condition) {
    id
    description
    flag
    locationID
    rating
    ownerName
    ReportReviews {
      items {
        id
        reason
        additionalComments
        reviewID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    ReviewReplies {
      items {
        id
        description
        ownerName
        reviewID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    ReviewInteraction {
      items {
        id
        reviewID
        reaction
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReviewMutationVariables,
  APITypes.UpdateReviewMutation
>;
export const deleteReview = /* GraphQL */ `mutation DeleteReview(
  $input: DeleteReviewInput!
  $condition: ModelReviewConditionInput
) {
  deleteReview(input: $input, condition: $condition) {
    id
    description
    flag
    locationID
    rating
    ownerName
    ReportReviews {
      items {
        id
        reason
        additionalComments
        reviewID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    ReviewReplies {
      items {
        id
        description
        ownerName
        reviewID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    ReviewInteraction {
      items {
        id
        reviewID
        reaction
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReviewMutationVariables,
  APITypes.DeleteReviewMutation
>;
export const createLocation = /* GraphQL */ `mutation CreateLocation(
  $input: CreateLocationInput!
  $condition: ModelLocationConditionInput
) {
  createLocation(input: $input, condition: $condition) {
    id
    amenities {
      value
      label
      icon
      __typename
    }
    address {
      address
      unit
      city
      country
      state
      postalcode
      geoLocation {
        lat
        lng
        __typename
      }
      __typename
    }
    name
    category
    businessID
    description
    email
    hours {
      open
      startTime
      endTime
      name
      __typename
    }
    images {
      type
      key
      __typename
    }
    phoneNumber
    liveView
    status
    Reviews {
      items {
        id
        description
        flag
        locationID
        rating
        ownerName
        ReportReviews {
          items {
            id
            reason
            additionalComments
            reviewID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        ReviewReplies {
          items {
            id
            description
            ownerName
            reviewID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        ReviewInteraction {
          items {
            id
            reviewID
            reaction
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    LiveSnap {
      id
      video
      expirationUnixTime
      createdAt
      updatedAt
      owner
      __typename
    }
    latitude
    longitude
    keywords
    locationImage
    isPublished
    social {
      type
      address
      __typename
    }
    searchField
    avgRating
    LocationManagers {
      items {
        id
        storyAccess
        userId
        familyName
        givenName
        fullAccess
        locationID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    websiteURL
    createdAt
    updatedAt
    locationLiveSnapId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLocationMutationVariables,
  APITypes.CreateLocationMutation
>;
export const updateLocation = /* GraphQL */ `mutation UpdateLocation(
  $input: UpdateLocationInput!
  $condition: ModelLocationConditionInput
) {
  updateLocation(input: $input, condition: $condition) {
    id
    amenities {
      value
      label
      icon
      __typename
    }
    address {
      address
      unit
      city
      country
      state
      postalcode
      geoLocation {
        lat
        lng
        __typename
      }
      __typename
    }
    name
    category
    businessID
    description
    email
    hours {
      open
      startTime
      endTime
      name
      __typename
    }
    images {
      type
      key
      __typename
    }
    phoneNumber
    liveView
    status
    Reviews {
      items {
        id
        description
        flag
        locationID
        rating
        ownerName
        ReportReviews {
          items {
            id
            reason
            additionalComments
            reviewID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        ReviewReplies {
          items {
            id
            description
            ownerName
            reviewID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        ReviewInteraction {
          items {
            id
            reviewID
            reaction
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    LiveSnap {
      id
      video
      expirationUnixTime
      createdAt
      updatedAt
      owner
      __typename
    }
    latitude
    longitude
    keywords
    locationImage
    isPublished
    social {
      type
      address
      __typename
    }
    searchField
    avgRating
    LocationManagers {
      items {
        id
        storyAccess
        userId
        familyName
        givenName
        fullAccess
        locationID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    websiteURL
    createdAt
    updatedAt
    locationLiveSnapId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLocationMutationVariables,
  APITypes.UpdateLocationMutation
>;
export const deleteLocation = /* GraphQL */ `mutation DeleteLocation(
  $input: DeleteLocationInput!
  $condition: ModelLocationConditionInput
) {
  deleteLocation(input: $input, condition: $condition) {
    id
    amenities {
      value
      label
      icon
      __typename
    }
    address {
      address
      unit
      city
      country
      state
      postalcode
      geoLocation {
        lat
        lng
        __typename
      }
      __typename
    }
    name
    category
    businessID
    description
    email
    hours {
      open
      startTime
      endTime
      name
      __typename
    }
    images {
      type
      key
      __typename
    }
    phoneNumber
    liveView
    status
    Reviews {
      items {
        id
        description
        flag
        locationID
        rating
        ownerName
        ReportReviews {
          items {
            id
            reason
            additionalComments
            reviewID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        ReviewReplies {
          items {
            id
            description
            ownerName
            reviewID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        ReviewInteraction {
          items {
            id
            reviewID
            reaction
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    LiveSnap {
      id
      video
      expirationUnixTime
      createdAt
      updatedAt
      owner
      __typename
    }
    latitude
    longitude
    keywords
    locationImage
    isPublished
    social {
      type
      address
      __typename
    }
    searchField
    avgRating
    LocationManagers {
      items {
        id
        storyAccess
        userId
        familyName
        givenName
        fullAccess
        locationID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    websiteURL
    createdAt
    updatedAt
    locationLiveSnapId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLocationMutationVariables,
  APITypes.DeleteLocationMutation
>;
export const createBusiness = /* GraphQL */ `mutation CreateBusiness(
  $input: CreateBusinessInput!
  $condition: ModelBusinessConditionInput
) {
  createBusiness(input: $input, condition: $condition) {
    id
    description
    address {
      address
      unit
      city
      country
      state
      postalcode
      geoLocation {
        lat
        lng
        __typename
      }
      __typename
    }
    name
    number
    phone
    size
    type
    websiteUrl
    createdDate
    status
    cognitoUser
    Locations {
      items {
        id
        amenities {
          value
          label
          icon
          __typename
        }
        address {
          address
          unit
          city
          country
          state
          postalcode
          geoLocation {
            lat
            lng
            __typename
          }
          __typename
        }
        name
        category
        businessID
        description
        email
        hours {
          open
          startTime
          endTime
          name
          __typename
        }
        images {
          type
          key
          __typename
        }
        phoneNumber
        liveView
        status
        Reviews {
          items {
            id
            description
            flag
            locationID
            rating
            ownerName
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        LiveSnap {
          id
          video
          expirationUnixTime
          createdAt
          updatedAt
          owner
          __typename
        }
        latitude
        longitude
        keywords
        locationImage
        isPublished
        social {
          type
          address
          __typename
        }
        searchField
        avgRating
        LocationManagers {
          items {
            id
            storyAccess
            userId
            familyName
            givenName
            fullAccess
            locationID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        websiteURL
        createdAt
        updatedAt
        locationLiveSnapId
        owner
        __typename
      }
      nextToken
      __typename
    }
    documents {
      document
      documentType
      __typename
    }
    identityId
    email
    searchField
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBusinessMutationVariables,
  APITypes.CreateBusinessMutation
>;
export const updateBusiness = /* GraphQL */ `mutation UpdateBusiness(
  $input: UpdateBusinessInput!
  $condition: ModelBusinessConditionInput
) {
  updateBusiness(input: $input, condition: $condition) {
    id
    description
    address {
      address
      unit
      city
      country
      state
      postalcode
      geoLocation {
        lat
        lng
        __typename
      }
      __typename
    }
    name
    number
    phone
    size
    type
    websiteUrl
    createdDate
    status
    cognitoUser
    Locations {
      items {
        id
        amenities {
          value
          label
          icon
          __typename
        }
        address {
          address
          unit
          city
          country
          state
          postalcode
          geoLocation {
            lat
            lng
            __typename
          }
          __typename
        }
        name
        category
        businessID
        description
        email
        hours {
          open
          startTime
          endTime
          name
          __typename
        }
        images {
          type
          key
          __typename
        }
        phoneNumber
        liveView
        status
        Reviews {
          items {
            id
            description
            flag
            locationID
            rating
            ownerName
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        LiveSnap {
          id
          video
          expirationUnixTime
          createdAt
          updatedAt
          owner
          __typename
        }
        latitude
        longitude
        keywords
        locationImage
        isPublished
        social {
          type
          address
          __typename
        }
        searchField
        avgRating
        LocationManagers {
          items {
            id
            storyAccess
            userId
            familyName
            givenName
            fullAccess
            locationID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        websiteURL
        createdAt
        updatedAt
        locationLiveSnapId
        owner
        __typename
      }
      nextToken
      __typename
    }
    documents {
      document
      documentType
      __typename
    }
    identityId
    email
    searchField
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBusinessMutationVariables,
  APITypes.UpdateBusinessMutation
>;
export const deleteBusiness = /* GraphQL */ `mutation DeleteBusiness(
  $input: DeleteBusinessInput!
  $condition: ModelBusinessConditionInput
) {
  deleteBusiness(input: $input, condition: $condition) {
    id
    description
    address {
      address
      unit
      city
      country
      state
      postalcode
      geoLocation {
        lat
        lng
        __typename
      }
      __typename
    }
    name
    number
    phone
    size
    type
    websiteUrl
    createdDate
    status
    cognitoUser
    Locations {
      items {
        id
        amenities {
          value
          label
          icon
          __typename
        }
        address {
          address
          unit
          city
          country
          state
          postalcode
          geoLocation {
            lat
            lng
            __typename
          }
          __typename
        }
        name
        category
        businessID
        description
        email
        hours {
          open
          startTime
          endTime
          name
          __typename
        }
        images {
          type
          key
          __typename
        }
        phoneNumber
        liveView
        status
        Reviews {
          items {
            id
            description
            flag
            locationID
            rating
            ownerName
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        LiveSnap {
          id
          video
          expirationUnixTime
          createdAt
          updatedAt
          owner
          __typename
        }
        latitude
        longitude
        keywords
        locationImage
        isPublished
        social {
          type
          address
          __typename
        }
        searchField
        avgRating
        LocationManagers {
          items {
            id
            storyAccess
            userId
            familyName
            givenName
            fullAccess
            locationID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        websiteURL
        createdAt
        updatedAt
        locationLiveSnapId
        owner
        __typename
      }
      nextToken
      __typename
    }
    documents {
      document
      documentType
      __typename
    }
    identityId
    email
    searchField
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBusinessMutationVariables,
  APITypes.DeleteBusinessMutation
>;
