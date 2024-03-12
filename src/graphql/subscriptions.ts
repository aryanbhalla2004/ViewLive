/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateReviewInteractions = /* GraphQL */ `subscription OnCreateReviewInteractions(
  $filter: ModelSubscriptionReviewInteractionsFilterInput
  $owner: String
) {
  onCreateReviewInteractions(filter: $filter, owner: $owner) {
    id
    reviewID
    reaction
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateReviewInteractionsSubscriptionVariables,
  APITypes.OnCreateReviewInteractionsSubscription
>;
export const onUpdateReviewInteractions = /* GraphQL */ `subscription OnUpdateReviewInteractions(
  $filter: ModelSubscriptionReviewInteractionsFilterInput
  $owner: String
) {
  onUpdateReviewInteractions(filter: $filter, owner: $owner) {
    id
    reviewID
    reaction
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateReviewInteractionsSubscriptionVariables,
  APITypes.OnUpdateReviewInteractionsSubscription
>;
export const onDeleteReviewInteractions = /* GraphQL */ `subscription OnDeleteReviewInteractions(
  $filter: ModelSubscriptionReviewInteractionsFilterInput
  $owner: String
) {
  onDeleteReviewInteractions(filter: $filter, owner: $owner) {
    id
    reviewID
    reaction
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteReviewInteractionsSubscriptionVariables,
  APITypes.OnDeleteReviewInteractionsSubscription
>;
export const onCreateReviewReply = /* GraphQL */ `subscription OnCreateReviewReply(
  $filter: ModelSubscriptionReviewReplyFilterInput
  $owner: String
) {
  onCreateReviewReply(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateReviewReplySubscriptionVariables,
  APITypes.OnCreateReviewReplySubscription
>;
export const onUpdateReviewReply = /* GraphQL */ `subscription OnUpdateReviewReply(
  $filter: ModelSubscriptionReviewReplyFilterInput
  $owner: String
) {
  onUpdateReviewReply(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateReviewReplySubscriptionVariables,
  APITypes.OnUpdateReviewReplySubscription
>;
export const onDeleteReviewReply = /* GraphQL */ `subscription OnDeleteReviewReply(
  $filter: ModelSubscriptionReviewReplyFilterInput
  $owner: String
) {
  onDeleteReviewReply(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteReviewReplySubscriptionVariables,
  APITypes.OnDeleteReviewReplySubscription
>;
export const onCreateReportReview = /* GraphQL */ `subscription OnCreateReportReview(
  $filter: ModelSubscriptionReportReviewFilterInput
  $owner: String
) {
  onCreateReportReview(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateReportReviewSubscriptionVariables,
  APITypes.OnCreateReportReviewSubscription
>;
export const onUpdateReportReview = /* GraphQL */ `subscription OnUpdateReportReview(
  $filter: ModelSubscriptionReportReviewFilterInput
  $owner: String
) {
  onUpdateReportReview(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateReportReviewSubscriptionVariables,
  APITypes.OnUpdateReportReviewSubscription
>;
export const onDeleteReportReview = /* GraphQL */ `subscription OnDeleteReportReview(
  $filter: ModelSubscriptionReportReviewFilterInput
  $owner: String
) {
  onDeleteReportReview(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteReportReviewSubscriptionVariables,
  APITypes.OnDeleteReportReviewSubscription
>;
export const onCreateLocationManager = /* GraphQL */ `subscription OnCreateLocationManager(
  $filter: ModelSubscriptionLocationManagerFilterInput
  $owner: String
) {
  onCreateLocationManager(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateLocationManagerSubscriptionVariables,
  APITypes.OnCreateLocationManagerSubscription
>;
export const onUpdateLocationManager = /* GraphQL */ `subscription OnUpdateLocationManager(
  $filter: ModelSubscriptionLocationManagerFilterInput
  $owner: String
) {
  onUpdateLocationManager(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateLocationManagerSubscriptionVariables,
  APITypes.OnUpdateLocationManagerSubscription
>;
export const onDeleteLocationManager = /* GraphQL */ `subscription OnDeleteLocationManager(
  $filter: ModelSubscriptionLocationManagerFilterInput
  $owner: String
) {
  onDeleteLocationManager(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteLocationManagerSubscriptionVariables,
  APITypes.OnDeleteLocationManagerSubscription
>;
export const onCreateChatGroup = /* GraphQL */ `subscription OnCreateChatGroup($filter: ModelSubscriptionChatGroupFilterInput) {
  onCreateChatGroup(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChatGroupSubscriptionVariables,
  APITypes.OnCreateChatGroupSubscription
>;
export const onUpdateChatGroup = /* GraphQL */ `subscription OnUpdateChatGroup($filter: ModelSubscriptionChatGroupFilterInput) {
  onUpdateChatGroup(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChatGroupSubscriptionVariables,
  APITypes.OnUpdateChatGroupSubscription
>;
export const onDeleteChatGroup = /* GraphQL */ `subscription OnDeleteChatGroup($filter: ModelSubscriptionChatGroupFilterInput) {
  onDeleteChatGroup(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChatGroupSubscriptionVariables,
  APITypes.OnDeleteChatGroupSubscription
>;
export const onCreateChatMessage = /* GraphQL */ `subscription OnCreateChatMessage(
  $filter: ModelSubscriptionChatMessageFilterInput
) {
  onCreateChatMessage(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChatMessageSubscriptionVariables,
  APITypes.OnCreateChatMessageSubscription
>;
export const onUpdateChatMessage = /* GraphQL */ `subscription OnUpdateChatMessage(
  $filter: ModelSubscriptionChatMessageFilterInput
) {
  onUpdateChatMessage(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChatMessageSubscriptionVariables,
  APITypes.OnUpdateChatMessageSubscription
>;
export const onDeleteChatMessage = /* GraphQL */ `subscription OnDeleteChatMessage(
  $filter: ModelSubscriptionChatMessageFilterInput
) {
  onDeleteChatMessage(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChatMessageSubscriptionVariables,
  APITypes.OnDeleteChatMessageSubscription
>;
export const onCreateKeywords = /* GraphQL */ `subscription OnCreateKeywords($filter: ModelSubscriptionKeywordsFilterInput) {
  onCreateKeywords(filter: $filter) {
    id
    keyword
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateKeywordsSubscriptionVariables,
  APITypes.OnCreateKeywordsSubscription
>;
export const onUpdateKeywords = /* GraphQL */ `subscription OnUpdateKeywords($filter: ModelSubscriptionKeywordsFilterInput) {
  onUpdateKeywords(filter: $filter) {
    id
    keyword
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateKeywordsSubscriptionVariables,
  APITypes.OnUpdateKeywordsSubscription
>;
export const onDeleteKeywords = /* GraphQL */ `subscription OnDeleteKeywords($filter: ModelSubscriptionKeywordsFilterInput) {
  onDeleteKeywords(filter: $filter) {
    id
    keyword
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteKeywordsSubscriptionVariables,
  APITypes.OnDeleteKeywordsSubscription
>;
export const onCreateLiveSnap = /* GraphQL */ `subscription OnCreateLiveSnap(
  $filter: ModelSubscriptionLiveSnapFilterInput
  $owner: String
) {
  onCreateLiveSnap(filter: $filter, owner: $owner) {
    id
    video
    expirationUnixTime
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLiveSnapSubscriptionVariables,
  APITypes.OnCreateLiveSnapSubscription
>;
export const onUpdateLiveSnap = /* GraphQL */ `subscription OnUpdateLiveSnap(
  $filter: ModelSubscriptionLiveSnapFilterInput
  $owner: String
) {
  onUpdateLiveSnap(filter: $filter, owner: $owner) {
    id
    video
    expirationUnixTime
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLiveSnapSubscriptionVariables,
  APITypes.OnUpdateLiveSnapSubscription
>;
export const onDeleteLiveSnap = /* GraphQL */ `subscription OnDeleteLiveSnap(
  $filter: ModelSubscriptionLiveSnapFilterInput
  $owner: String
) {
  onDeleteLiveSnap(filter: $filter, owner: $owner) {
    id
    video
    expirationUnixTime
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLiveSnapSubscriptionVariables,
  APITypes.OnDeleteLiveSnapSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateReview = /* GraphQL */ `subscription OnCreateReview(
  $filter: ModelSubscriptionReviewFilterInput
  $owner: String
) {
  onCreateReview(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateReviewSubscriptionVariables,
  APITypes.OnCreateReviewSubscription
>;
export const onUpdateReview = /* GraphQL */ `subscription OnUpdateReview(
  $filter: ModelSubscriptionReviewFilterInput
  $owner: String
) {
  onUpdateReview(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateReviewSubscriptionVariables,
  APITypes.OnUpdateReviewSubscription
>;
export const onDeleteReview = /* GraphQL */ `subscription OnDeleteReview(
  $filter: ModelSubscriptionReviewFilterInput
  $owner: String
) {
  onDeleteReview(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteReviewSubscriptionVariables,
  APITypes.OnDeleteReviewSubscription
>;
export const onCreateLocation = /* GraphQL */ `subscription OnCreateLocation(
  $filter: ModelSubscriptionLocationFilterInput
  $owner: String
) {
  onCreateLocation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateLocationSubscriptionVariables,
  APITypes.OnCreateLocationSubscription
>;
export const onUpdateLocation = /* GraphQL */ `subscription OnUpdateLocation(
  $filter: ModelSubscriptionLocationFilterInput
  $owner: String
) {
  onUpdateLocation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateLocationSubscriptionVariables,
  APITypes.OnUpdateLocationSubscription
>;
export const onDeleteLocation = /* GraphQL */ `subscription OnDeleteLocation(
  $filter: ModelSubscriptionLocationFilterInput
  $owner: String
) {
  onDeleteLocation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteLocationSubscriptionVariables,
  APITypes.OnDeleteLocationSubscription
>;
export const onCreateBusiness = /* GraphQL */ `subscription OnCreateBusiness(
  $filter: ModelSubscriptionBusinessFilterInput
  $cognitoUser: String
) {
  onCreateBusiness(filter: $filter, cognitoUser: $cognitoUser) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBusinessSubscriptionVariables,
  APITypes.OnCreateBusinessSubscription
>;
export const onUpdateBusiness = /* GraphQL */ `subscription OnUpdateBusiness(
  $filter: ModelSubscriptionBusinessFilterInput
  $cognitoUser: String
) {
  onUpdateBusiness(filter: $filter, cognitoUser: $cognitoUser) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBusinessSubscriptionVariables,
  APITypes.OnUpdateBusinessSubscription
>;
export const onDeleteBusiness = /* GraphQL */ `subscription OnDeleteBusiness(
  $filter: ModelSubscriptionBusinessFilterInput
  $cognitoUser: String
) {
  onDeleteBusiness(filter: $filter, cognitoUser: $cognitoUser) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBusinessSubscriptionVariables,
  APITypes.OnDeleteBusinessSubscription
>;
