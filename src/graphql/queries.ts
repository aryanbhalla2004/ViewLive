/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getReviewInteractions = /* GraphQL */ `query GetReviewInteractions($id: ID!) {
  getReviewInteractions(id: $id) {
    id
    reviewID
    reaction
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetReviewInteractionsQueryVariables,
  APITypes.GetReviewInteractionsQuery
>;
export const listReviewInteractions = /* GraphQL */ `query ListReviewInteractions(
  $filter: ModelReviewInteractionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listReviewInteractions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ListReviewInteractionsQueryVariables,
  APITypes.ListReviewInteractionsQuery
>;
export const reviewInteractionsByReviewID = /* GraphQL */ `query ReviewInteractionsByReviewID(
  $reviewID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelReviewInteractionsFilterInput
  $limit: Int
  $nextToken: String
) {
  reviewInteractionsByReviewID(
    reviewID: $reviewID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ReviewInteractionsByReviewIDQueryVariables,
  APITypes.ReviewInteractionsByReviewIDQuery
>;
export const getReviewReply = /* GraphQL */ `query GetReviewReply($id: ID!) {
  getReviewReply(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetReviewReplyQueryVariables,
  APITypes.GetReviewReplyQuery
>;
export const listReviewReplies = /* GraphQL */ `query ListReviewReplies(
  $filter: ModelReviewReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  listReviewReplies(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
}
` as GeneratedQuery<
  APITypes.ListReviewRepliesQueryVariables,
  APITypes.ListReviewRepliesQuery
>;
export const reviewRepliesByReviewID = /* GraphQL */ `query ReviewRepliesByReviewID(
  $reviewID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelReviewReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  reviewRepliesByReviewID(
    reviewID: $reviewID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ReviewRepliesByReviewIDQueryVariables,
  APITypes.ReviewRepliesByReviewIDQuery
>;
export const getReportReview = /* GraphQL */ `query GetReportReview($id: ID!) {
  getReportReview(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetReportReviewQueryVariables,
  APITypes.GetReportReviewQuery
>;
export const listReportReviews = /* GraphQL */ `query ListReportReviews(
  $filter: ModelReportReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  listReportReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
}
` as GeneratedQuery<
  APITypes.ListReportReviewsQueryVariables,
  APITypes.ListReportReviewsQuery
>;
export const reportReviewsByReviewID = /* GraphQL */ `query ReportReviewsByReviewID(
  $reviewID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelReportReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  reportReviewsByReviewID(
    reviewID: $reviewID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ReportReviewsByReviewIDQueryVariables,
  APITypes.ReportReviewsByReviewIDQuery
>;
export const getLocationManager = /* GraphQL */ `query GetLocationManager($id: ID!) {
  getLocationManager(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetLocationManagerQueryVariables,
  APITypes.GetLocationManagerQuery
>;
export const listLocationManagers = /* GraphQL */ `query ListLocationManagers(
  $filter: ModelLocationManagerFilterInput
  $limit: Int
  $nextToken: String
) {
  listLocationManagers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
}
` as GeneratedQuery<
  APITypes.ListLocationManagersQueryVariables,
  APITypes.ListLocationManagersQuery
>;
export const locationManagersByLocationID = /* GraphQL */ `query LocationManagersByLocationID(
  $locationID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelLocationManagerFilterInput
  $limit: Int
  $nextToken: String
) {
  locationManagersByLocationID(
    locationID: $locationID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.LocationManagersByLocationIDQueryVariables,
  APITypes.LocationManagersByLocationIDQuery
>;
export const getChatGroup = /* GraphQL */ `query GetChatGroup($id: ID!) {
  getChatGroup(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetChatGroupQueryVariables,
  APITypes.GetChatGroupQuery
>;
export const listChatGroups = /* GraphQL */ `query ListChatGroups(
  $filter: ModelChatGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatGroupsQueryVariables,
  APITypes.ListChatGroupsQuery
>;
export const getChatMessage = /* GraphQL */ `query GetChatMessage($id: ID!) {
  getChatMessage(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetChatMessageQueryVariables,
  APITypes.GetChatMessageQuery
>;
export const listChatMessages = /* GraphQL */ `query ListChatMessages(
  $filter: ModelChatMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
}
` as GeneratedQuery<
  APITypes.ListChatMessagesQueryVariables,
  APITypes.ListChatMessagesQuery
>;
export const chatMessagesByChatgroupID = /* GraphQL */ `query ChatMessagesByChatgroupID(
  $chatgroupID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelChatMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  chatMessagesByChatgroupID(
    chatgroupID: $chatgroupID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ChatMessagesByChatgroupIDQueryVariables,
  APITypes.ChatMessagesByChatgroupIDQuery
>;
export const getKeywords = /* GraphQL */ `query GetKeywords($id: ID!) {
  getKeywords(id: $id) {
    id
    keyword
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetKeywordsQueryVariables,
  APITypes.GetKeywordsQuery
>;
export const listKeywords = /* GraphQL */ `query ListKeywords(
  $filter: ModelKeywordsFilterInput
  $limit: Int
  $nextToken: String
) {
  listKeywords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      keyword
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListKeywordsQueryVariables,
  APITypes.ListKeywordsQuery
>;
export const getLiveSnap = /* GraphQL */ `query GetLiveSnap($id: ID!) {
  getLiveSnap(id: $id) {
    id
    video
    expirationUnixTime
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetLiveSnapQueryVariables,
  APITypes.GetLiveSnapQuery
>;
export const listLiveSnaps = /* GraphQL */ `query ListLiveSnaps(
  $filter: ModelLiveSnapFilterInput
  $limit: Int
  $nextToken: String
) {
  listLiveSnaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      video
      expirationUnixTime
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLiveSnapsQueryVariables,
  APITypes.ListLiveSnapsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getReview = /* GraphQL */ `query GetReview($id: ID!) {
  getReview(id: $id) {
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
` as GeneratedQuery<APITypes.GetReviewQueryVariables, APITypes.GetReviewQuery>;
export const listReviews = /* GraphQL */ `query ListReviews(
  $filter: ModelReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
}
` as GeneratedQuery<
  APITypes.ListReviewsQueryVariables,
  APITypes.ListReviewsQuery
>;
export const reviewsByLocationID = /* GraphQL */ `query ReviewsByLocationID(
  $locationID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  reviewsByLocationID(
    locationID: $locationID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ReviewsByLocationIDQueryVariables,
  APITypes.ReviewsByLocationIDQuery
>;
export const getLocation = /* GraphQL */ `query GetLocation($id: ID!) {
  getLocation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetLocationQueryVariables,
  APITypes.GetLocationQuery
>;
export const listLocations = /* GraphQL */ `query ListLocations(
  $filter: ModelLocationFilterInput
  $limit: Int
  $nextToken: String
) {
  listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          ReportReviews {
            nextToken
            __typename
          }
          ReviewReplies {
            nextToken
            __typename
          }
          ReviewInteraction {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLocationsQueryVariables,
  APITypes.ListLocationsQuery
>;
export const locationsByBusinessID = /* GraphQL */ `query LocationsByBusinessID(
  $businessID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelLocationFilterInput
  $limit: Int
  $nextToken: String
) {
  locationsByBusinessID(
    businessID: $businessID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
          ReportReviews {
            nextToken
            __typename
          }
          ReviewReplies {
            nextToken
            __typename
          }
          ReviewInteraction {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.LocationsByBusinessIDQueryVariables,
  APITypes.LocationsByBusinessIDQuery
>;
export const getBusiness = /* GraphQL */ `query GetBusiness($id: ID!) {
  getBusiness(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetBusinessQueryVariables,
  APITypes.GetBusinessQuery
>;
export const listBusinesses = /* GraphQL */ `query ListBusinesses(
  $filter: ModelBusinessFilterInput
  $limit: Int
  $nextToken: String
) {
  listBusinesses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBusinessesQueryVariables,
  APITypes.ListBusinessesQuery
>;
