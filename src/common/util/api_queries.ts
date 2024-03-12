import gql from "graphql-tag";

// export const listLocation = gql`query ListLocations(
//   $filter: ModelLocationFilterInput
//   $limit: Int
//   $nextToken: String
// ) {
//   listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
//     items {
//       id
//       amenities {
//         value
//         label
//         icon
//         __typename
//       }
//       address {
//         address
//         unit
//         city
//         country
//         state
//         postalcode
//         geoLocation {
//           lat
//           lng
//           __typename
//         }
//         __typename
//       }
//       name
//       category
//       businessID
//       description
//       email
//       hours {
//         open
//         startTime
//         endTime
//         name
//         __typename
//       }
//       images {
//         type
//         key
//         __typename
//       }
//       phoneNumber
//       liveView
//       status
//       Reviews {
//         items {
//           id
//           description
//           flag
//           locationID
//           rating
//           ownerName
//           ReviewReplies {
//             nextToken
//             __typename
//           }
//           createdAt
//           updatedAt
//           owner
//           __typename
//         }
//         nextToken
//         __typename
//       }
//       LiveSnap {
//         id
//         video
//         expirationUnixTime
//         createdAt
//         updatedAt
//         owner
//         __typename
//       }
//       latitude
//       longitude
//       keywords
//       locationImage
//       isPublished
//       social {
//         type
//         address
//         __typename
//       }
//       searchField
//       avgRating
//       websiteURL
//       createdAt
//       updatedAt
//       locationLiveSnapId
//       owner
//       __typename
//     }
//     nextToken
//     __typename
//   }
// }
// `;

// export const getLocation = gql`
//   query GetLocation($id: ID!, $limit: Int!, $nextToken: String) {
//     getLocation(id: $id) {
//       id
//       amenities {
//         value
//         label
//         icon
//         __typename
//       }
//       address {
//         address
//         unit
//         city
//         country
//         state
//         postalcode
//         geoLocation {
//           lat
//           lng
//           __typename
//         }
//         __typename
//       }
//       name
//       category
//       businessID
//       description
//       email
//       hours {
//         open
//         startTime
//         endTime
//         name
//         __typename
//       }
//       images {
//         type
//         key
//         __typename
//       }
//       phoneNumber
//       liveView
//       status
//       Reviews(limit: $limit, nextToken: $nextToken) {
//         items {
//           id
//           description
//           flag
//           locationID
//           rating
//           ownerName
//           ReviewReplies {
//             items {
//               id
//               description
//               ownerName
//               reviewID
//               createdAt
//               updatedAt
//               owner
//               __typename
//             }
//             nextToken
//             __typename
//           }
//           createdAt
//           updatedAt
//           owner
//           __typename
//         }
//         nextToken
//         __typename
//       }
//       LiveSnap {
//         id
//         video
//         expirationUnixTime
//         createdAt
//         updatedAt
//         owner
//         __typename
//       }
//       latitude
//       longitude
//       keywords
//       locationImage
//       isPublished
//       social {
//         type
//         address
//         __typename
//       }
//       searchField
//       avgRating
//       websiteURL
//       createdAt
//       updatedAt
//       locationLiveSnapId
//       owner
//       __typename
//     }
//   }
// `;



export const getLocation = `query GetLocation($id: ID!) {
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
    websiteURL
    createdAt
    updatedAt
    locationLiveSnapId
    owner
    __typename
  }
}
`;
export const listLocation = `query ListLocations(
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
`;

export const getReviewInteractions = ` query GetReviewInteractions($reviewID: ID!) {
  getReviewInteractions(reviewID: $reviewID) {
    id
    reviewID
    reaction
    createdAt
    updatedAt
    owner
    __typename
  }
}
`;