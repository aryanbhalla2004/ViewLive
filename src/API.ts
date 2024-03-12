/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateReviewInteractionsInput = {
  id?: string | null,
  reviewID: string,
  reaction?: number | null,
};

export type ModelReviewInteractionsConditionInput = {
  reviewID?: ModelIDInput | null,
  reaction?: ModelIntInput | null,
  and?: Array< ModelReviewInteractionsConditionInput | null > | null,
  or?: Array< ModelReviewInteractionsConditionInput | null > | null,
  not?: ModelReviewInteractionsConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ReviewInteractions = {
  __typename: "ReviewInteractions",
  id: string,
  reviewID: string,
  reaction?: number | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateReviewInteractionsInput = {
  id: string,
  reviewID?: string | null,
  reaction?: number | null,
};

export type DeleteReviewInteractionsInput = {
  id: string,
};

export type CreateReviewReplyInput = {
  id?: string | null,
  description?: string | null,
  ownerName?: string | null,
  reviewID: string,
};

export type ModelReviewReplyConditionInput = {
  description?: ModelStringInput | null,
  ownerName?: ModelStringInput | null,
  reviewID?: ModelIDInput | null,
  and?: Array< ModelReviewReplyConditionInput | null > | null,
  or?: Array< ModelReviewReplyConditionInput | null > | null,
  not?: ModelReviewReplyConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ReviewReply = {
  __typename: "ReviewReply",
  id: string,
  description?: string | null,
  ownerName?: string | null,
  reviewID: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateReviewReplyInput = {
  id: string,
  description?: string | null,
  ownerName?: string | null,
  reviewID?: string | null,
};

export type DeleteReviewReplyInput = {
  id: string,
};

export type CreateReportReviewInput = {
  id?: string | null,
  reason?: string | null,
  additionalComments?: string | null,
  reviewID: string,
};

export type ModelReportReviewConditionInput = {
  reason?: ModelStringInput | null,
  additionalComments?: ModelStringInput | null,
  reviewID?: ModelIDInput | null,
  and?: Array< ModelReportReviewConditionInput | null > | null,
  or?: Array< ModelReportReviewConditionInput | null > | null,
  not?: ModelReportReviewConditionInput | null,
};

export type ReportReview = {
  __typename: "ReportReview",
  id: string,
  reason?: string | null,
  additionalComments?: string | null,
  reviewID: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateReportReviewInput = {
  id: string,
  reason?: string | null,
  additionalComments?: string | null,
  reviewID?: string | null,
};

export type DeleteReportReviewInput = {
  id: string,
};

export type CreateLocationManagerInput = {
  id?: string | null,
  storyAccess?: boolean | null,
  userId?: string | null,
  familyName?: string | null,
  givenName?: string | null,
  fullAccess?: boolean | null,
  locationID: string,
};

export type ModelLocationManagerConditionInput = {
  storyAccess?: ModelBooleanInput | null,
  userId?: ModelStringInput | null,
  familyName?: ModelStringInput | null,
  givenName?: ModelStringInput | null,
  fullAccess?: ModelBooleanInput | null,
  locationID?: ModelIDInput | null,
  and?: Array< ModelLocationManagerConditionInput | null > | null,
  or?: Array< ModelLocationManagerConditionInput | null > | null,
  not?: ModelLocationManagerConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type LocationManager = {
  __typename: "LocationManager",
  id: string,
  storyAccess?: boolean | null,
  userId?: string | null,
  familyName?: string | null,
  givenName?: string | null,
  fullAccess?: boolean | null,
  locationID: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateLocationManagerInput = {
  id: string,
  storyAccess?: boolean | null,
  userId?: string | null,
  familyName?: string | null,
  givenName?: string | null,
  fullAccess?: boolean | null,
  locationID?: string | null,
};

export type DeleteLocationManagerInput = {
  id: string,
};

export type CreateChatGroupInput = {
  id?: string | null,
  userID: string,
  locationID: string,
};

export type ModelChatGroupConditionInput = {
  userID?: ModelStringInput | null,
  locationID?: ModelStringInput | null,
  and?: Array< ModelChatGroupConditionInput | null > | null,
  or?: Array< ModelChatGroupConditionInput | null > | null,
  not?: ModelChatGroupConditionInput | null,
};

export type ChatGroup = {
  __typename: "ChatGroup",
  id: string,
  userID: string,
  locationID: string,
  ChatMessages?: ModelChatMessageConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelChatMessageConnection = {
  __typename: "ModelChatMessageConnection",
  items:  Array<ChatMessage | null >,
  nextToken?: string | null,
};

export type ChatMessage = {
  __typename: "ChatMessage",
  id: string,
  senderID: string,
  receiverID: string,
  data?: string | null,
  timeStamp?: number | null,
  isFile?: boolean | null,
  chatgroupID: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateChatGroupInput = {
  id: string,
  userID?: string | null,
  locationID?: string | null,
};

export type DeleteChatGroupInput = {
  id: string,
};

export type CreateChatMessageInput = {
  id?: string | null,
  senderID: string,
  receiverID: string,
  data?: string | null,
  timeStamp?: number | null,
  isFile?: boolean | null,
  chatgroupID: string,
};

export type ModelChatMessageConditionInput = {
  senderID?: ModelIDInput | null,
  receiverID?: ModelIDInput | null,
  data?: ModelStringInput | null,
  timeStamp?: ModelIntInput | null,
  isFile?: ModelBooleanInput | null,
  chatgroupID?: ModelIDInput | null,
  and?: Array< ModelChatMessageConditionInput | null > | null,
  or?: Array< ModelChatMessageConditionInput | null > | null,
  not?: ModelChatMessageConditionInput | null,
};

export type UpdateChatMessageInput = {
  id: string,
  senderID?: string | null,
  receiverID?: string | null,
  data?: string | null,
  timeStamp?: number | null,
  isFile?: boolean | null,
  chatgroupID?: string | null,
};

export type DeleteChatMessageInput = {
  id: string,
};

export type CreateKeywordsInput = {
  id?: string | null,
  keyword?: string | null,
};

export type ModelKeywordsConditionInput = {
  keyword?: ModelStringInput | null,
  and?: Array< ModelKeywordsConditionInput | null > | null,
  or?: Array< ModelKeywordsConditionInput | null > | null,
  not?: ModelKeywordsConditionInput | null,
};

export type Keywords = {
  __typename: "Keywords",
  id: string,
  keyword?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateKeywordsInput = {
  id: string,
  keyword?: string | null,
};

export type DeleteKeywordsInput = {
  id: string,
};

export type CreateLiveSnapInput = {
  id?: string | null,
  video?: string | null,
  expirationUnixTime?: number | null,
};

export type ModelLiveSnapConditionInput = {
  video?: ModelStringInput | null,
  expirationUnixTime?: ModelIntInput | null,
  and?: Array< ModelLiveSnapConditionInput | null > | null,
  or?: Array< ModelLiveSnapConditionInput | null > | null,
  not?: ModelLiveSnapConditionInput | null,
};

export type LiveSnap = {
  __typename: "LiveSnap",
  id: string,
  video?: string | null,
  expirationUnixTime?: number | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateLiveSnapInput = {
  id: string,
  video?: string | null,
  expirationUnixTime?: number | null,
};

export type DeleteLiveSnapInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  gender?: string | null,
  dob?: string | null,
  interests: Array< string >,
  cognitoUser: string,
  givenName?: string | null,
  familyName?: string | null,
  myFavourites?: Array< string | null > | null,
};

export type ModelUserConditionInput = {
  gender?: ModelStringInput | null,
  dob?: ModelStringInput | null,
  interests?: ModelStringInput | null,
  cognitoUser?: ModelIDInput | null,
  givenName?: ModelStringInput | null,
  familyName?: ModelStringInput | null,
  myFavourites?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  gender?: string | null,
  dob?: string | null,
  interests: Array< string >,
  cognitoUser: string,
  givenName?: string | null,
  familyName?: string | null,
  myFavourites?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  gender?: string | null,
  dob?: string | null,
  interests?: Array< string > | null,
  cognitoUser?: string | null,
  givenName?: string | null,
  familyName?: string | null,
  myFavourites?: Array< string | null > | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateReviewInput = {
  id?: string | null,
  description: string,
  flag?: string | null,
  locationID: string,
  rating: number,
  ownerName: string,
};

export type ModelReviewConditionInput = {
  description?: ModelStringInput | null,
  flag?: ModelStringInput | null,
  locationID?: ModelIDInput | null,
  rating?: ModelFloatInput | null,
  ownerName?: ModelStringInput | null,
  and?: Array< ModelReviewConditionInput | null > | null,
  or?: Array< ModelReviewConditionInput | null > | null,
  not?: ModelReviewConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Review = {
  __typename: "Review",
  id: string,
  description: string,
  flag?: string | null,
  locationID: string,
  rating: number,
  ownerName: string,
  ReportReviews?: ModelReportReviewConnection | null,
  ReviewReplies?: ModelReviewReplyConnection | null,
  ReviewInteraction?: ModelReviewInteractionsConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelReportReviewConnection = {
  __typename: "ModelReportReviewConnection",
  items:  Array<ReportReview | null >,
  nextToken?: string | null,
};

export type ModelReviewReplyConnection = {
  __typename: "ModelReviewReplyConnection",
  items:  Array<ReviewReply | null >,
  nextToken?: string | null,
};

export type ModelReviewInteractionsConnection = {
  __typename: "ModelReviewInteractionsConnection",
  items:  Array<ReviewInteractions | null >,
  nextToken?: string | null,
};

export type UpdateReviewInput = {
  id: string,
  description?: string | null,
  flag?: string | null,
  locationID?: string | null,
  rating?: number | null,
  ownerName?: string | null,
};

export type DeleteReviewInput = {
  id: string,
};

export type CreateLocationInput = {
  id?: string | null,
  amenities: Array< AmenitieInput >,
  address: AddressInput,
  name: string,
  category: string,
  businessID: string,
  description: string,
  email: string,
  hours: Array< LocationHoursInput >,
  images?: Array< LocationImageInput > | null,
  phoneNumber: string,
  liveView?: string | null,
  status: Status,
  latitude: number,
  longitude: number,
  keywords: Array< string >,
  locationImage: string,
  isPublished: boolean,
  social?: Array< SocialInput | null > | null,
  searchField?: string | null,
  avgRating?: number | null,
  websiteURL?: string | null,
  locationLiveSnapId?: string | null,
};

export type AmenitieInput = {
  value: string,
  label: string,
  icon: string,
};

export type AddressInput = {
  address: string,
  unit?: string | null,
  city: string,
  country: string,
  state: string,
  postalcode: string,
  geoLocation: CoordinatesInput,
};

export type CoordinatesInput = {
  lat: number,
  lng: number,
};

export type LocationHoursInput = {
  open: boolean,
  startTime?: string | null,
  endTime?: string | null,
  name: string,
};

export type LocationImageInput = {
  type: string,
  key: string,
};

export enum Status {
  WAITING = "WAITING",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
}


export type SocialInput = {
  type?: string | null,
  address?: string | null,
};

export type ModelLocationConditionInput = {
  name?: ModelStringInput | null,
  category?: ModelStringInput | null,
  businessID?: ModelIDInput | null,
  description?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  liveView?: ModelStringInput | null,
  status?: ModelStatusInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  keywords?: ModelStringInput | null,
  locationImage?: ModelStringInput | null,
  isPublished?: ModelBooleanInput | null,
  searchField?: ModelStringInput | null,
  avgRating?: ModelFloatInput | null,
  websiteURL?: ModelStringInput | null,
  and?: Array< ModelLocationConditionInput | null > | null,
  or?: Array< ModelLocationConditionInput | null > | null,
  not?: ModelLocationConditionInput | null,
  locationLiveSnapId?: ModelIDInput | null,
};

export type ModelStatusInput = {
  eq?: Status | null,
  ne?: Status | null,
};

export type Location = {
  __typename: "Location",
  id: string,
  amenities:  Array<Amenitie >,
  address: Address,
  name: string,
  category: string,
  businessID: string,
  description: string,
  email: string,
  hours:  Array<LocationHours >,
  images?:  Array<LocationImage > | null,
  phoneNumber: string,
  liveView?: string | null,
  status: Status,
  Reviews?: ModelReviewConnection | null,
  LiveSnap?: LiveSnap | null,
  latitude: number,
  longitude: number,
  keywords: Array< string >,
  locationImage: string,
  isPublished: boolean,
  social?:  Array<Social | null > | null,
  searchField?: string | null,
  avgRating?: number | null,
  LocationManagers?: ModelLocationManagerConnection | null,
  websiteURL?: string | null,
  createdAt: string,
  updatedAt: string,
  locationLiveSnapId?: string | null,
  owner?: string | null,
};

export type Amenitie = {
  __typename: "Amenitie",
  value: string,
  label: string,
  icon: string,
};

export type Address = {
  __typename: "Address",
  address: string,
  unit?: string | null,
  city: string,
  country: string,
  state: string,
  postalcode: string,
  geoLocation: Coordinates,
};

export type Coordinates = {
  __typename: "Coordinates",
  lat: number,
  lng: number,
};

export type LocationHours = {
  __typename: "LocationHours",
  open: boolean,
  startTime?: string | null,
  endTime?: string | null,
  name: string,
};

export type LocationImage = {
  __typename: "LocationImage",
  type: string,
  key: string,
};

export type ModelReviewConnection = {
  __typename: "ModelReviewConnection",
  items:  Array<Review | null >,
  nextToken?: string | null,
};

export type Social = {
  __typename: "Social",
  type?: string | null,
  address?: string | null,
};

export type ModelLocationManagerConnection = {
  __typename: "ModelLocationManagerConnection",
  items:  Array<LocationManager | null >,
  nextToken?: string | null,
};

export type UpdateLocationInput = {
  id: string,
  amenities?: Array< AmenitieInput > | null,
  address?: AddressInput | null,
  name?: string | null,
  category?: string | null,
  businessID?: string | null,
  description?: string | null,
  email?: string | null,
  hours?: Array< LocationHoursInput > | null,
  images?: Array< LocationImageInput > | null,
  phoneNumber?: string | null,
  liveView?: string | null,
  status?: Status | null,
  latitude?: number | null,
  longitude?: number | null,
  keywords?: Array< string > | null,
  locationImage?: string | null,
  isPublished?: boolean | null,
  social?: Array< SocialInput | null > | null,
  searchField?: string | null,
  avgRating?: number | null,
  websiteURL?: string | null,
  locationLiveSnapId?: string | null,
};

export type DeleteLocationInput = {
  id: string,
};

export type CreateBusinessInput = {
  id?: string | null,
  description: string,
  address: AddressInput,
  name: string,
  number: number,
  phone: string,
  size: string,
  type: string,
  websiteUrl?: string | null,
  createdDate: string,
  status: Status,
  cognitoUser: string,
  documents: Array< BusinessDocumentInput >,
  identityId: string,
  email: string,
  searchField: string,
};

export type BusinessDocumentInput = {
  document: string,
  documentType: string,
};

export type ModelBusinessConditionInput = {
  description?: ModelStringInput | null,
  name?: ModelStringInput | null,
  number?: ModelIntInput | null,
  phone?: ModelStringInput | null,
  size?: ModelStringInput | null,
  type?: ModelStringInput | null,
  websiteUrl?: ModelStringInput | null,
  createdDate?: ModelStringInput | null,
  status?: ModelStatusInput | null,
  cognitoUser?: ModelIDInput | null,
  identityId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  searchField?: ModelStringInput | null,
  and?: Array< ModelBusinessConditionInput | null > | null,
  or?: Array< ModelBusinessConditionInput | null > | null,
  not?: ModelBusinessConditionInput | null,
};

export type Business = {
  __typename: "Business",
  id: string,
  description: string,
  address: Address,
  name: string,
  number: number,
  phone: string,
  size: string,
  type: string,
  websiteUrl?: string | null,
  createdDate: string,
  status: Status,
  cognitoUser: string,
  Locations?: ModelLocationConnection | null,
  documents:  Array<BusinessDocument >,
  identityId: string,
  email: string,
  searchField: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelLocationConnection = {
  __typename: "ModelLocationConnection",
  items:  Array<Location | null >,
  nextToken?: string | null,
};

export type BusinessDocument = {
  __typename: "BusinessDocument",
  document: string,
  documentType: string,
};

export type UpdateBusinessInput = {
  id: string,
  description?: string | null,
  address?: AddressInput | null,
  name?: string | null,
  number?: number | null,
  phone?: string | null,
  size?: string | null,
  type?: string | null,
  websiteUrl?: string | null,
  createdDate?: string | null,
  status?: Status | null,
  cognitoUser?: string | null,
  documents?: Array< BusinessDocumentInput > | null,
  identityId?: string | null,
  email?: string | null,
  searchField?: string | null,
};

export type DeleteBusinessInput = {
  id: string,
};

export type ModelReviewInteractionsFilterInput = {
  id?: ModelIDInput | null,
  reviewID?: ModelIDInput | null,
  reaction?: ModelIntInput | null,
  and?: Array< ModelReviewInteractionsFilterInput | null > | null,
  or?: Array< ModelReviewInteractionsFilterInput | null > | null,
  not?: ModelReviewInteractionsFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelReviewReplyFilterInput = {
  id?: ModelIDInput | null,
  description?: ModelStringInput | null,
  ownerName?: ModelStringInput | null,
  reviewID?: ModelIDInput | null,
  and?: Array< ModelReviewReplyFilterInput | null > | null,
  or?: Array< ModelReviewReplyFilterInput | null > | null,
  not?: ModelReviewReplyFilterInput | null,
};

export type ModelReportReviewFilterInput = {
  id?: ModelIDInput | null,
  reason?: ModelStringInput | null,
  additionalComments?: ModelStringInput | null,
  reviewID?: ModelIDInput | null,
  and?: Array< ModelReportReviewFilterInput | null > | null,
  or?: Array< ModelReportReviewFilterInput | null > | null,
  not?: ModelReportReviewFilterInput | null,
};

export type ModelLocationManagerFilterInput = {
  id?: ModelIDInput | null,
  storyAccess?: ModelBooleanInput | null,
  userId?: ModelStringInput | null,
  familyName?: ModelStringInput | null,
  givenName?: ModelStringInput | null,
  fullAccess?: ModelBooleanInput | null,
  locationID?: ModelIDInput | null,
  and?: Array< ModelLocationManagerFilterInput | null > | null,
  or?: Array< ModelLocationManagerFilterInput | null > | null,
  not?: ModelLocationManagerFilterInput | null,
};

export type ModelChatGroupFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelStringInput | null,
  locationID?: ModelStringInput | null,
  and?: Array< ModelChatGroupFilterInput | null > | null,
  or?: Array< ModelChatGroupFilterInput | null > | null,
  not?: ModelChatGroupFilterInput | null,
};

export type ModelChatGroupConnection = {
  __typename: "ModelChatGroupConnection",
  items:  Array<ChatGroup | null >,
  nextToken?: string | null,
};

export type ModelChatMessageFilterInput = {
  id?: ModelIDInput | null,
  senderID?: ModelIDInput | null,
  receiverID?: ModelIDInput | null,
  data?: ModelStringInput | null,
  timeStamp?: ModelIntInput | null,
  isFile?: ModelBooleanInput | null,
  chatgroupID?: ModelIDInput | null,
  and?: Array< ModelChatMessageFilterInput | null > | null,
  or?: Array< ModelChatMessageFilterInput | null > | null,
  not?: ModelChatMessageFilterInput | null,
};

export type ModelKeywordsFilterInput = {
  id?: ModelIDInput | null,
  keyword?: ModelStringInput | null,
  and?: Array< ModelKeywordsFilterInput | null > | null,
  or?: Array< ModelKeywordsFilterInput | null > | null,
  not?: ModelKeywordsFilterInput | null,
};

export type ModelKeywordsConnection = {
  __typename: "ModelKeywordsConnection",
  items:  Array<Keywords | null >,
  nextToken?: string | null,
};

export type ModelLiveSnapFilterInput = {
  id?: ModelIDInput | null,
  video?: ModelStringInput | null,
  expirationUnixTime?: ModelIntInput | null,
  and?: Array< ModelLiveSnapFilterInput | null > | null,
  or?: Array< ModelLiveSnapFilterInput | null > | null,
  not?: ModelLiveSnapFilterInput | null,
};

export type ModelLiveSnapConnection = {
  __typename: "ModelLiveSnapConnection",
  items:  Array<LiveSnap | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  gender?: ModelStringInput | null,
  dob?: ModelStringInput | null,
  interests?: ModelStringInput | null,
  cognitoUser?: ModelIDInput | null,
  givenName?: ModelStringInput | null,
  familyName?: ModelStringInput | null,
  myFavourites?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelReviewFilterInput = {
  id?: ModelIDInput | null,
  description?: ModelStringInput | null,
  flag?: ModelStringInput | null,
  locationID?: ModelIDInput | null,
  rating?: ModelFloatInput | null,
  ownerName?: ModelStringInput | null,
  and?: Array< ModelReviewFilterInput | null > | null,
  or?: Array< ModelReviewFilterInput | null > | null,
  not?: ModelReviewFilterInput | null,
};

export type ModelLocationFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  category?: ModelStringInput | null,
  businessID?: ModelIDInput | null,
  description?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  liveView?: ModelStringInput | null,
  status?: ModelStatusInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  keywords?: ModelStringInput | null,
  locationImage?: ModelStringInput | null,
  isPublished?: ModelBooleanInput | null,
  searchField?: ModelStringInput | null,
  avgRating?: ModelFloatInput | null,
  websiteURL?: ModelStringInput | null,
  and?: Array< ModelLocationFilterInput | null > | null,
  or?: Array< ModelLocationFilterInput | null > | null,
  not?: ModelLocationFilterInput | null,
  locationLiveSnapId?: ModelIDInput | null,
};

export type ModelBusinessFilterInput = {
  id?: ModelIDInput | null,
  description?: ModelStringInput | null,
  name?: ModelStringInput | null,
  number?: ModelIntInput | null,
  phone?: ModelStringInput | null,
  size?: ModelStringInput | null,
  type?: ModelStringInput | null,
  websiteUrl?: ModelStringInput | null,
  createdDate?: ModelStringInput | null,
  status?: ModelStatusInput | null,
  cognitoUser?: ModelIDInput | null,
  identityId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  searchField?: ModelStringInput | null,
  and?: Array< ModelBusinessFilterInput | null > | null,
  or?: Array< ModelBusinessFilterInput | null > | null,
  not?: ModelBusinessFilterInput | null,
};

export type ModelBusinessConnection = {
  __typename: "ModelBusinessConnection",
  items:  Array<Business | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionReviewInteractionsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  reviewID?: ModelSubscriptionIDInput | null,
  reaction?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionReviewInteractionsFilterInput | null > | null,
  or?: Array< ModelSubscriptionReviewInteractionsFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionReviewReplyFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  description?: ModelSubscriptionStringInput | null,
  ownerName?: ModelSubscriptionStringInput | null,
  reviewID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionReviewReplyFilterInput | null > | null,
  or?: Array< ModelSubscriptionReviewReplyFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionReportReviewFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  reason?: ModelSubscriptionStringInput | null,
  additionalComments?: ModelSubscriptionStringInput | null,
  reviewID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionReportReviewFilterInput | null > | null,
  or?: Array< ModelSubscriptionReportReviewFilterInput | null > | null,
};

export type ModelSubscriptionLocationManagerFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  storyAccess?: ModelSubscriptionBooleanInput | null,
  userId?: ModelSubscriptionStringInput | null,
  familyName?: ModelSubscriptionStringInput | null,
  givenName?: ModelSubscriptionStringInput | null,
  fullAccess?: ModelSubscriptionBooleanInput | null,
  locationID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionLocationManagerFilterInput | null > | null,
  or?: Array< ModelSubscriptionLocationManagerFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionChatGroupFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionStringInput | null,
  locationID?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionChatGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionChatGroupFilterInput | null > | null,
};

export type ModelSubscriptionChatMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  senderID?: ModelSubscriptionIDInput | null,
  receiverID?: ModelSubscriptionIDInput | null,
  data?: ModelSubscriptionStringInput | null,
  timeStamp?: ModelSubscriptionIntInput | null,
  isFile?: ModelSubscriptionBooleanInput | null,
  chatgroupID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionChatMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionChatMessageFilterInput | null > | null,
};

export type ModelSubscriptionKeywordsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  keyword?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionKeywordsFilterInput | null > | null,
  or?: Array< ModelSubscriptionKeywordsFilterInput | null > | null,
};

export type ModelSubscriptionLiveSnapFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  video?: ModelSubscriptionStringInput | null,
  expirationUnixTime?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionLiveSnapFilterInput | null > | null,
  or?: Array< ModelSubscriptionLiveSnapFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  gender?: ModelSubscriptionStringInput | null,
  dob?: ModelSubscriptionStringInput | null,
  interests?: ModelSubscriptionStringInput | null,
  cognitoUser?: ModelSubscriptionIDInput | null,
  givenName?: ModelSubscriptionStringInput | null,
  familyName?: ModelSubscriptionStringInput | null,
  myFavourites?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionReviewFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  description?: ModelSubscriptionStringInput | null,
  flag?: ModelSubscriptionStringInput | null,
  locationID?: ModelSubscriptionIDInput | null,
  rating?: ModelSubscriptionFloatInput | null,
  ownerName?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionReviewFilterInput | null > | null,
  or?: Array< ModelSubscriptionReviewFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionLocationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  businessID?: ModelSubscriptionIDInput | null,
  description?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  liveView?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  latitude?: ModelSubscriptionFloatInput | null,
  longitude?: ModelSubscriptionFloatInput | null,
  keywords?: ModelSubscriptionStringInput | null,
  locationImage?: ModelSubscriptionStringInput | null,
  isPublished?: ModelSubscriptionBooleanInput | null,
  searchField?: ModelSubscriptionStringInput | null,
  avgRating?: ModelSubscriptionFloatInput | null,
  websiteURL?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLocationFilterInput | null > | null,
  or?: Array< ModelSubscriptionLocationFilterInput | null > | null,
};

export type ModelSubscriptionBusinessFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  description?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  number?: ModelSubscriptionIntInput | null,
  phone?: ModelSubscriptionStringInput | null,
  size?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  websiteUrl?: ModelSubscriptionStringInput | null,
  createdDate?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  identityId?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  searchField?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBusinessFilterInput | null > | null,
  or?: Array< ModelSubscriptionBusinessFilterInput | null > | null,
};

export type CreateReviewInteractionsMutationVariables = {
  input: CreateReviewInteractionsInput,
  condition?: ModelReviewInteractionsConditionInput | null,
};

export type CreateReviewInteractionsMutation = {
  createReviewInteractions?:  {
    __typename: "ReviewInteractions",
    id: string,
    reviewID: string,
    reaction?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateReviewInteractionsMutationVariables = {
  input: UpdateReviewInteractionsInput,
  condition?: ModelReviewInteractionsConditionInput | null,
};

export type UpdateReviewInteractionsMutation = {
  updateReviewInteractions?:  {
    __typename: "ReviewInteractions",
    id: string,
    reviewID: string,
    reaction?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteReviewInteractionsMutationVariables = {
  input: DeleteReviewInteractionsInput,
  condition?: ModelReviewInteractionsConditionInput | null,
};

export type DeleteReviewInteractionsMutation = {
  deleteReviewInteractions?:  {
    __typename: "ReviewInteractions",
    id: string,
    reviewID: string,
    reaction?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateReviewReplyMutationVariables = {
  input: CreateReviewReplyInput,
  condition?: ModelReviewReplyConditionInput | null,
};

export type CreateReviewReplyMutation = {
  createReviewReply?:  {
    __typename: "ReviewReply",
    id: string,
    description?: string | null,
    ownerName?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateReviewReplyMutationVariables = {
  input: UpdateReviewReplyInput,
  condition?: ModelReviewReplyConditionInput | null,
};

export type UpdateReviewReplyMutation = {
  updateReviewReply?:  {
    __typename: "ReviewReply",
    id: string,
    description?: string | null,
    ownerName?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteReviewReplyMutationVariables = {
  input: DeleteReviewReplyInput,
  condition?: ModelReviewReplyConditionInput | null,
};

export type DeleteReviewReplyMutation = {
  deleteReviewReply?:  {
    __typename: "ReviewReply",
    id: string,
    description?: string | null,
    ownerName?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateReportReviewMutationVariables = {
  input: CreateReportReviewInput,
  condition?: ModelReportReviewConditionInput | null,
};

export type CreateReportReviewMutation = {
  createReportReview?:  {
    __typename: "ReportReview",
    id: string,
    reason?: string | null,
    additionalComments?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateReportReviewMutationVariables = {
  input: UpdateReportReviewInput,
  condition?: ModelReportReviewConditionInput | null,
};

export type UpdateReportReviewMutation = {
  updateReportReview?:  {
    __typename: "ReportReview",
    id: string,
    reason?: string | null,
    additionalComments?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteReportReviewMutationVariables = {
  input: DeleteReportReviewInput,
  condition?: ModelReportReviewConditionInput | null,
};

export type DeleteReportReviewMutation = {
  deleteReportReview?:  {
    __typename: "ReportReview",
    id: string,
    reason?: string | null,
    additionalComments?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateLocationManagerMutationVariables = {
  input: CreateLocationManagerInput,
  condition?: ModelLocationManagerConditionInput | null,
};

export type CreateLocationManagerMutation = {
  createLocationManager?:  {
    __typename: "LocationManager",
    id: string,
    storyAccess?: boolean | null,
    userId?: string | null,
    familyName?: string | null,
    givenName?: string | null,
    fullAccess?: boolean | null,
    locationID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateLocationManagerMutationVariables = {
  input: UpdateLocationManagerInput,
  condition?: ModelLocationManagerConditionInput | null,
};

export type UpdateLocationManagerMutation = {
  updateLocationManager?:  {
    __typename: "LocationManager",
    id: string,
    storyAccess?: boolean | null,
    userId?: string | null,
    familyName?: string | null,
    givenName?: string | null,
    fullAccess?: boolean | null,
    locationID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteLocationManagerMutationVariables = {
  input: DeleteLocationManagerInput,
  condition?: ModelLocationManagerConditionInput | null,
};

export type DeleteLocationManagerMutation = {
  deleteLocationManager?:  {
    __typename: "LocationManager",
    id: string,
    storyAccess?: boolean | null,
    userId?: string | null,
    familyName?: string | null,
    givenName?: string | null,
    fullAccess?: boolean | null,
    locationID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateChatGroupMutationVariables = {
  input: CreateChatGroupInput,
  condition?: ModelChatGroupConditionInput | null,
};

export type CreateChatGroupMutation = {
  createChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    userID: string,
    locationID: string,
    ChatMessages?:  {
      __typename: "ModelChatMessageConnection",
      items:  Array< {
        __typename: "ChatMessage",
        id: string,
        senderID: string,
        receiverID: string,
        data?: string | null,
        timeStamp?: number | null,
        isFile?: boolean | null,
        chatgroupID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateChatGroupMutationVariables = {
  input: UpdateChatGroupInput,
  condition?: ModelChatGroupConditionInput | null,
};

export type UpdateChatGroupMutation = {
  updateChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    userID: string,
    locationID: string,
    ChatMessages?:  {
      __typename: "ModelChatMessageConnection",
      items:  Array< {
        __typename: "ChatMessage",
        id: string,
        senderID: string,
        receiverID: string,
        data?: string | null,
        timeStamp?: number | null,
        isFile?: boolean | null,
        chatgroupID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteChatGroupMutationVariables = {
  input: DeleteChatGroupInput,
  condition?: ModelChatGroupConditionInput | null,
};

export type DeleteChatGroupMutation = {
  deleteChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    userID: string,
    locationID: string,
    ChatMessages?:  {
      __typename: "ModelChatMessageConnection",
      items:  Array< {
        __typename: "ChatMessage",
        id: string,
        senderID: string,
        receiverID: string,
        data?: string | null,
        timeStamp?: number | null,
        isFile?: boolean | null,
        chatgroupID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateChatMessageMutationVariables = {
  input: CreateChatMessageInput,
  condition?: ModelChatMessageConditionInput | null,
};

export type CreateChatMessageMutation = {
  createChatMessage?:  {
    __typename: "ChatMessage",
    id: string,
    senderID: string,
    receiverID: string,
    data?: string | null,
    timeStamp?: number | null,
    isFile?: boolean | null,
    chatgroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateChatMessageMutationVariables = {
  input: UpdateChatMessageInput,
  condition?: ModelChatMessageConditionInput | null,
};

export type UpdateChatMessageMutation = {
  updateChatMessage?:  {
    __typename: "ChatMessage",
    id: string,
    senderID: string,
    receiverID: string,
    data?: string | null,
    timeStamp?: number | null,
    isFile?: boolean | null,
    chatgroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteChatMessageMutationVariables = {
  input: DeleteChatMessageInput,
  condition?: ModelChatMessageConditionInput | null,
};

export type DeleteChatMessageMutation = {
  deleteChatMessage?:  {
    __typename: "ChatMessage",
    id: string,
    senderID: string,
    receiverID: string,
    data?: string | null,
    timeStamp?: number | null,
    isFile?: boolean | null,
    chatgroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateKeywordsMutationVariables = {
  input: CreateKeywordsInput,
  condition?: ModelKeywordsConditionInput | null,
};

export type CreateKeywordsMutation = {
  createKeywords?:  {
    __typename: "Keywords",
    id: string,
    keyword?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateKeywordsMutationVariables = {
  input: UpdateKeywordsInput,
  condition?: ModelKeywordsConditionInput | null,
};

export type UpdateKeywordsMutation = {
  updateKeywords?:  {
    __typename: "Keywords",
    id: string,
    keyword?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteKeywordsMutationVariables = {
  input: DeleteKeywordsInput,
  condition?: ModelKeywordsConditionInput | null,
};

export type DeleteKeywordsMutation = {
  deleteKeywords?:  {
    __typename: "Keywords",
    id: string,
    keyword?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateLiveSnapMutationVariables = {
  input: CreateLiveSnapInput,
  condition?: ModelLiveSnapConditionInput | null,
};

export type CreateLiveSnapMutation = {
  createLiveSnap?:  {
    __typename: "LiveSnap",
    id: string,
    video?: string | null,
    expirationUnixTime?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateLiveSnapMutationVariables = {
  input: UpdateLiveSnapInput,
  condition?: ModelLiveSnapConditionInput | null,
};

export type UpdateLiveSnapMutation = {
  updateLiveSnap?:  {
    __typename: "LiveSnap",
    id: string,
    video?: string | null,
    expirationUnixTime?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteLiveSnapMutationVariables = {
  input: DeleteLiveSnapInput,
  condition?: ModelLiveSnapConditionInput | null,
};

export type DeleteLiveSnapMutation = {
  deleteLiveSnap?:  {
    __typename: "LiveSnap",
    id: string,
    video?: string | null,
    expirationUnixTime?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    gender?: string | null,
    dob?: string | null,
    interests: Array< string >,
    cognitoUser: string,
    givenName?: string | null,
    familyName?: string | null,
    myFavourites?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    gender?: string | null,
    dob?: string | null,
    interests: Array< string >,
    cognitoUser: string,
    givenName?: string | null,
    familyName?: string | null,
    myFavourites?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    gender?: string | null,
    dob?: string | null,
    interests: Array< string >,
    cognitoUser: string,
    givenName?: string | null,
    familyName?: string | null,
    myFavourites?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateReviewMutationVariables = {
  input: CreateReviewInput,
  condition?: ModelReviewConditionInput | null,
};

export type CreateReviewMutation = {
  createReview?:  {
    __typename: "Review",
    id: string,
    description: string,
    flag?: string | null,
    locationID: string,
    rating: number,
    ownerName: string,
    ReportReviews?:  {
      __typename: "ModelReportReviewConnection",
      items:  Array< {
        __typename: "ReportReview",
        id: string,
        reason?: string | null,
        additionalComments?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewReplies?:  {
      __typename: "ModelReviewReplyConnection",
      items:  Array< {
        __typename: "ReviewReply",
        id: string,
        description?: string | null,
        ownerName?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewInteraction?:  {
      __typename: "ModelReviewInteractionsConnection",
      items:  Array< {
        __typename: "ReviewInteractions",
        id: string,
        reviewID: string,
        reaction?: number | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateReviewMutationVariables = {
  input: UpdateReviewInput,
  condition?: ModelReviewConditionInput | null,
};

export type UpdateReviewMutation = {
  updateReview?:  {
    __typename: "Review",
    id: string,
    description: string,
    flag?: string | null,
    locationID: string,
    rating: number,
    ownerName: string,
    ReportReviews?:  {
      __typename: "ModelReportReviewConnection",
      items:  Array< {
        __typename: "ReportReview",
        id: string,
        reason?: string | null,
        additionalComments?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewReplies?:  {
      __typename: "ModelReviewReplyConnection",
      items:  Array< {
        __typename: "ReviewReply",
        id: string,
        description?: string | null,
        ownerName?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewInteraction?:  {
      __typename: "ModelReviewInteractionsConnection",
      items:  Array< {
        __typename: "ReviewInteractions",
        id: string,
        reviewID: string,
        reaction?: number | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteReviewMutationVariables = {
  input: DeleteReviewInput,
  condition?: ModelReviewConditionInput | null,
};

export type DeleteReviewMutation = {
  deleteReview?:  {
    __typename: "Review",
    id: string,
    description: string,
    flag?: string | null,
    locationID: string,
    rating: number,
    ownerName: string,
    ReportReviews?:  {
      __typename: "ModelReportReviewConnection",
      items:  Array< {
        __typename: "ReportReview",
        id: string,
        reason?: string | null,
        additionalComments?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewReplies?:  {
      __typename: "ModelReviewReplyConnection",
      items:  Array< {
        __typename: "ReviewReply",
        id: string,
        description?: string | null,
        ownerName?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewInteraction?:  {
      __typename: "ModelReviewInteractionsConnection",
      items:  Array< {
        __typename: "ReviewInteractions",
        id: string,
        reviewID: string,
        reaction?: number | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateLocationMutationVariables = {
  input: CreateLocationInput,
  condition?: ModelLocationConditionInput | null,
};

export type CreateLocationMutation = {
  createLocation?:  {
    __typename: "Location",
    id: string,
    amenities:  Array< {
      __typename: "Amenitie",
      value: string,
      label: string,
      icon: string,
    } >,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    category: string,
    businessID: string,
    description: string,
    email: string,
    hours:  Array< {
      __typename: "LocationHours",
      open: boolean,
      startTime?: string | null,
      endTime?: string | null,
      name: string,
    } >,
    images?:  Array< {
      __typename: "LocationImage",
      type: string,
      key: string,
    } > | null,
    phoneNumber: string,
    liveView?: string | null,
    status: Status,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        description: string,
        flag?: string | null,
        locationID: string,
        rating: number,
        ownerName: string,
        ReportReviews?:  {
          __typename: "ModelReportReviewConnection",
          items:  Array< {
            __typename: "ReportReview",
            id: string,
            reason?: string | null,
            additionalComments?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewReplies?:  {
          __typename: "ModelReviewReplyConnection",
          items:  Array< {
            __typename: "ReviewReply",
            id: string,
            description?: string | null,
            ownerName?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewInteraction?:  {
          __typename: "ModelReviewInteractionsConnection",
          items:  Array< {
            __typename: "ReviewInteractions",
            id: string,
            reviewID: string,
            reaction?: number | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    LiveSnap?:  {
      __typename: "LiveSnap",
      id: string,
      video?: string | null,
      expirationUnixTime?: number | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    latitude: number,
    longitude: number,
    keywords: Array< string >,
    locationImage: string,
    isPublished: boolean,
    social?:  Array< {
      __typename: "Social",
      type?: string | null,
      address?: string | null,
    } | null > | null,
    searchField?: string | null,
    avgRating?: number | null,
    LocationManagers?:  {
      __typename: "ModelLocationManagerConnection",
      items:  Array< {
        __typename: "LocationManager",
        id: string,
        storyAccess?: boolean | null,
        userId?: string | null,
        familyName?: string | null,
        givenName?: string | null,
        fullAccess?: boolean | null,
        locationID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    websiteURL?: string | null,
    createdAt: string,
    updatedAt: string,
    locationLiveSnapId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateLocationMutationVariables = {
  input: UpdateLocationInput,
  condition?: ModelLocationConditionInput | null,
};

export type UpdateLocationMutation = {
  updateLocation?:  {
    __typename: "Location",
    id: string,
    amenities:  Array< {
      __typename: "Amenitie",
      value: string,
      label: string,
      icon: string,
    } >,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    category: string,
    businessID: string,
    description: string,
    email: string,
    hours:  Array< {
      __typename: "LocationHours",
      open: boolean,
      startTime?: string | null,
      endTime?: string | null,
      name: string,
    } >,
    images?:  Array< {
      __typename: "LocationImage",
      type: string,
      key: string,
    } > | null,
    phoneNumber: string,
    liveView?: string | null,
    status: Status,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        description: string,
        flag?: string | null,
        locationID: string,
        rating: number,
        ownerName: string,
        ReportReviews?:  {
          __typename: "ModelReportReviewConnection",
          items:  Array< {
            __typename: "ReportReview",
            id: string,
            reason?: string | null,
            additionalComments?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewReplies?:  {
          __typename: "ModelReviewReplyConnection",
          items:  Array< {
            __typename: "ReviewReply",
            id: string,
            description?: string | null,
            ownerName?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewInteraction?:  {
          __typename: "ModelReviewInteractionsConnection",
          items:  Array< {
            __typename: "ReviewInteractions",
            id: string,
            reviewID: string,
            reaction?: number | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    LiveSnap?:  {
      __typename: "LiveSnap",
      id: string,
      video?: string | null,
      expirationUnixTime?: number | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    latitude: number,
    longitude: number,
    keywords: Array< string >,
    locationImage: string,
    isPublished: boolean,
    social?:  Array< {
      __typename: "Social",
      type?: string | null,
      address?: string | null,
    } | null > | null,
    searchField?: string | null,
    avgRating?: number | null,
    LocationManagers?:  {
      __typename: "ModelLocationManagerConnection",
      items:  Array< {
        __typename: "LocationManager",
        id: string,
        storyAccess?: boolean | null,
        userId?: string | null,
        familyName?: string | null,
        givenName?: string | null,
        fullAccess?: boolean | null,
        locationID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    websiteURL?: string | null,
    createdAt: string,
    updatedAt: string,
    locationLiveSnapId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteLocationMutationVariables = {
  input: DeleteLocationInput,
  condition?: ModelLocationConditionInput | null,
};

export type DeleteLocationMutation = {
  deleteLocation?:  {
    __typename: "Location",
    id: string,
    amenities:  Array< {
      __typename: "Amenitie",
      value: string,
      label: string,
      icon: string,
    } >,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    category: string,
    businessID: string,
    description: string,
    email: string,
    hours:  Array< {
      __typename: "LocationHours",
      open: boolean,
      startTime?: string | null,
      endTime?: string | null,
      name: string,
    } >,
    images?:  Array< {
      __typename: "LocationImage",
      type: string,
      key: string,
    } > | null,
    phoneNumber: string,
    liveView?: string | null,
    status: Status,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        description: string,
        flag?: string | null,
        locationID: string,
        rating: number,
        ownerName: string,
        ReportReviews?:  {
          __typename: "ModelReportReviewConnection",
          items:  Array< {
            __typename: "ReportReview",
            id: string,
            reason?: string | null,
            additionalComments?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewReplies?:  {
          __typename: "ModelReviewReplyConnection",
          items:  Array< {
            __typename: "ReviewReply",
            id: string,
            description?: string | null,
            ownerName?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewInteraction?:  {
          __typename: "ModelReviewInteractionsConnection",
          items:  Array< {
            __typename: "ReviewInteractions",
            id: string,
            reviewID: string,
            reaction?: number | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    LiveSnap?:  {
      __typename: "LiveSnap",
      id: string,
      video?: string | null,
      expirationUnixTime?: number | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    latitude: number,
    longitude: number,
    keywords: Array< string >,
    locationImage: string,
    isPublished: boolean,
    social?:  Array< {
      __typename: "Social",
      type?: string | null,
      address?: string | null,
    } | null > | null,
    searchField?: string | null,
    avgRating?: number | null,
    LocationManagers?:  {
      __typename: "ModelLocationManagerConnection",
      items:  Array< {
        __typename: "LocationManager",
        id: string,
        storyAccess?: boolean | null,
        userId?: string | null,
        familyName?: string | null,
        givenName?: string | null,
        fullAccess?: boolean | null,
        locationID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    websiteURL?: string | null,
    createdAt: string,
    updatedAt: string,
    locationLiveSnapId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateBusinessMutationVariables = {
  input: CreateBusinessInput,
  condition?: ModelBusinessConditionInput | null,
};

export type CreateBusinessMutation = {
  createBusiness?:  {
    __typename: "Business",
    id: string,
    description: string,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    number: number,
    phone: string,
    size: string,
    type: string,
    websiteUrl?: string | null,
    createdDate: string,
    status: Status,
    cognitoUser: string,
    Locations?:  {
      __typename: "ModelLocationConnection",
      items:  Array< {
        __typename: "Location",
        id: string,
        amenities:  Array< {
          __typename: "Amenitie",
          value: string,
          label: string,
          icon: string,
        } >,
        address:  {
          __typename: "Address",
          address: string,
          unit?: string | null,
          city: string,
          country: string,
          state: string,
          postalcode: string,
          geoLocation:  {
            __typename: "Coordinates",
            lat: number,
            lng: number,
          },
        },
        name: string,
        category: string,
        businessID: string,
        description: string,
        email: string,
        hours:  Array< {
          __typename: "LocationHours",
          open: boolean,
          startTime?: string | null,
          endTime?: string | null,
          name: string,
        } >,
        images?:  Array< {
          __typename: "LocationImage",
          type: string,
          key: string,
        } > | null,
        phoneNumber: string,
        liveView?: string | null,
        status: Status,
        Reviews?:  {
          __typename: "ModelReviewConnection",
          items:  Array< {
            __typename: "Review",
            id: string,
            description: string,
            flag?: string | null,
            locationID: string,
            rating: number,
            ownerName: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        LiveSnap?:  {
          __typename: "LiveSnap",
          id: string,
          video?: string | null,
          expirationUnixTime?: number | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        latitude: number,
        longitude: number,
        keywords: Array< string >,
        locationImage: string,
        isPublished: boolean,
        social?:  Array< {
          __typename: "Social",
          type?: string | null,
          address?: string | null,
        } | null > | null,
        searchField?: string | null,
        avgRating?: number | null,
        LocationManagers?:  {
          __typename: "ModelLocationManagerConnection",
          items:  Array< {
            __typename: "LocationManager",
            id: string,
            storyAccess?: boolean | null,
            userId?: string | null,
            familyName?: string | null,
            givenName?: string | null,
            fullAccess?: boolean | null,
            locationID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        websiteURL?: string | null,
        createdAt: string,
        updatedAt: string,
        locationLiveSnapId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    documents:  Array< {
      __typename: "BusinessDocument",
      document: string,
      documentType: string,
    } >,
    identityId: string,
    email: string,
    searchField: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBusinessMutationVariables = {
  input: UpdateBusinessInput,
  condition?: ModelBusinessConditionInput | null,
};

export type UpdateBusinessMutation = {
  updateBusiness?:  {
    __typename: "Business",
    id: string,
    description: string,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    number: number,
    phone: string,
    size: string,
    type: string,
    websiteUrl?: string | null,
    createdDate: string,
    status: Status,
    cognitoUser: string,
    Locations?:  {
      __typename: "ModelLocationConnection",
      items:  Array< {
        __typename: "Location",
        id: string,
        amenities:  Array< {
          __typename: "Amenitie",
          value: string,
          label: string,
          icon: string,
        } >,
        address:  {
          __typename: "Address",
          address: string,
          unit?: string | null,
          city: string,
          country: string,
          state: string,
          postalcode: string,
          geoLocation:  {
            __typename: "Coordinates",
            lat: number,
            lng: number,
          },
        },
        name: string,
        category: string,
        businessID: string,
        description: string,
        email: string,
        hours:  Array< {
          __typename: "LocationHours",
          open: boolean,
          startTime?: string | null,
          endTime?: string | null,
          name: string,
        } >,
        images?:  Array< {
          __typename: "LocationImage",
          type: string,
          key: string,
        } > | null,
        phoneNumber: string,
        liveView?: string | null,
        status: Status,
        Reviews?:  {
          __typename: "ModelReviewConnection",
          items:  Array< {
            __typename: "Review",
            id: string,
            description: string,
            flag?: string | null,
            locationID: string,
            rating: number,
            ownerName: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        LiveSnap?:  {
          __typename: "LiveSnap",
          id: string,
          video?: string | null,
          expirationUnixTime?: number | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        latitude: number,
        longitude: number,
        keywords: Array< string >,
        locationImage: string,
        isPublished: boolean,
        social?:  Array< {
          __typename: "Social",
          type?: string | null,
          address?: string | null,
        } | null > | null,
        searchField?: string | null,
        avgRating?: number | null,
        LocationManagers?:  {
          __typename: "ModelLocationManagerConnection",
          items:  Array< {
            __typename: "LocationManager",
            id: string,
            storyAccess?: boolean | null,
            userId?: string | null,
            familyName?: string | null,
            givenName?: string | null,
            fullAccess?: boolean | null,
            locationID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        websiteURL?: string | null,
        createdAt: string,
        updatedAt: string,
        locationLiveSnapId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    documents:  Array< {
      __typename: "BusinessDocument",
      document: string,
      documentType: string,
    } >,
    identityId: string,
    email: string,
    searchField: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBusinessMutationVariables = {
  input: DeleteBusinessInput,
  condition?: ModelBusinessConditionInput | null,
};

export type DeleteBusinessMutation = {
  deleteBusiness?:  {
    __typename: "Business",
    id: string,
    description: string,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    number: number,
    phone: string,
    size: string,
    type: string,
    websiteUrl?: string | null,
    createdDate: string,
    status: Status,
    cognitoUser: string,
    Locations?:  {
      __typename: "ModelLocationConnection",
      items:  Array< {
        __typename: "Location",
        id: string,
        amenities:  Array< {
          __typename: "Amenitie",
          value: string,
          label: string,
          icon: string,
        } >,
        address:  {
          __typename: "Address",
          address: string,
          unit?: string | null,
          city: string,
          country: string,
          state: string,
          postalcode: string,
          geoLocation:  {
            __typename: "Coordinates",
            lat: number,
            lng: number,
          },
        },
        name: string,
        category: string,
        businessID: string,
        description: string,
        email: string,
        hours:  Array< {
          __typename: "LocationHours",
          open: boolean,
          startTime?: string | null,
          endTime?: string | null,
          name: string,
        } >,
        images?:  Array< {
          __typename: "LocationImage",
          type: string,
          key: string,
        } > | null,
        phoneNumber: string,
        liveView?: string | null,
        status: Status,
        Reviews?:  {
          __typename: "ModelReviewConnection",
          items:  Array< {
            __typename: "Review",
            id: string,
            description: string,
            flag?: string | null,
            locationID: string,
            rating: number,
            ownerName: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        LiveSnap?:  {
          __typename: "LiveSnap",
          id: string,
          video?: string | null,
          expirationUnixTime?: number | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        latitude: number,
        longitude: number,
        keywords: Array< string >,
        locationImage: string,
        isPublished: boolean,
        social?:  Array< {
          __typename: "Social",
          type?: string | null,
          address?: string | null,
        } | null > | null,
        searchField?: string | null,
        avgRating?: number | null,
        LocationManagers?:  {
          __typename: "ModelLocationManagerConnection",
          items:  Array< {
            __typename: "LocationManager",
            id: string,
            storyAccess?: boolean | null,
            userId?: string | null,
            familyName?: string | null,
            givenName?: string | null,
            fullAccess?: boolean | null,
            locationID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        websiteURL?: string | null,
        createdAt: string,
        updatedAt: string,
        locationLiveSnapId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    documents:  Array< {
      __typename: "BusinessDocument",
      document: string,
      documentType: string,
    } >,
    identityId: string,
    email: string,
    searchField: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetReviewInteractionsQueryVariables = {
  id: string,
};

export type GetReviewInteractionsQuery = {
  getReviewInteractions?:  {
    __typename: "ReviewInteractions",
    id: string,
    reviewID: string,
    reaction?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListReviewInteractionsQueryVariables = {
  filter?: ModelReviewInteractionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReviewInteractionsQuery = {
  listReviewInteractions?:  {
    __typename: "ModelReviewInteractionsConnection",
    items:  Array< {
      __typename: "ReviewInteractions",
      id: string,
      reviewID: string,
      reaction?: number | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ReviewInteractionsByReviewIDQueryVariables = {
  reviewID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReviewInteractionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReviewInteractionsByReviewIDQuery = {
  reviewInteractionsByReviewID?:  {
    __typename: "ModelReviewInteractionsConnection",
    items:  Array< {
      __typename: "ReviewInteractions",
      id: string,
      reviewID: string,
      reaction?: number | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReviewReplyQueryVariables = {
  id: string,
};

export type GetReviewReplyQuery = {
  getReviewReply?:  {
    __typename: "ReviewReply",
    id: string,
    description?: string | null,
    ownerName?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListReviewRepliesQueryVariables = {
  filter?: ModelReviewReplyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReviewRepliesQuery = {
  listReviewReplies?:  {
    __typename: "ModelReviewReplyConnection",
    items:  Array< {
      __typename: "ReviewReply",
      id: string,
      description?: string | null,
      ownerName?: string | null,
      reviewID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ReviewRepliesByReviewIDQueryVariables = {
  reviewID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReviewReplyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReviewRepliesByReviewIDQuery = {
  reviewRepliesByReviewID?:  {
    __typename: "ModelReviewReplyConnection",
    items:  Array< {
      __typename: "ReviewReply",
      id: string,
      description?: string | null,
      ownerName?: string | null,
      reviewID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReportReviewQueryVariables = {
  id: string,
};

export type GetReportReviewQuery = {
  getReportReview?:  {
    __typename: "ReportReview",
    id: string,
    reason?: string | null,
    additionalComments?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListReportReviewsQueryVariables = {
  filter?: ModelReportReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportReviewsQuery = {
  listReportReviews?:  {
    __typename: "ModelReportReviewConnection",
    items:  Array< {
      __typename: "ReportReview",
      id: string,
      reason?: string | null,
      additionalComments?: string | null,
      reviewID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ReportReviewsByReviewIDQueryVariables = {
  reviewID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReportReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReportReviewsByReviewIDQuery = {
  reportReviewsByReviewID?:  {
    __typename: "ModelReportReviewConnection",
    items:  Array< {
      __typename: "ReportReview",
      id: string,
      reason?: string | null,
      additionalComments?: string | null,
      reviewID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLocationManagerQueryVariables = {
  id: string,
};

export type GetLocationManagerQuery = {
  getLocationManager?:  {
    __typename: "LocationManager",
    id: string,
    storyAccess?: boolean | null,
    userId?: string | null,
    familyName?: string | null,
    givenName?: string | null,
    fullAccess?: boolean | null,
    locationID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListLocationManagersQueryVariables = {
  filter?: ModelLocationManagerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLocationManagersQuery = {
  listLocationManagers?:  {
    __typename: "ModelLocationManagerConnection",
    items:  Array< {
      __typename: "LocationManager",
      id: string,
      storyAccess?: boolean | null,
      userId?: string | null,
      familyName?: string | null,
      givenName?: string | null,
      fullAccess?: boolean | null,
      locationID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type LocationManagersByLocationIDQueryVariables = {
  locationID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLocationManagerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LocationManagersByLocationIDQuery = {
  locationManagersByLocationID?:  {
    __typename: "ModelLocationManagerConnection",
    items:  Array< {
      __typename: "LocationManager",
      id: string,
      storyAccess?: boolean | null,
      userId?: string | null,
      familyName?: string | null,
      givenName?: string | null,
      fullAccess?: boolean | null,
      locationID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChatGroupQueryVariables = {
  id: string,
};

export type GetChatGroupQuery = {
  getChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    userID: string,
    locationID: string,
    ChatMessages?:  {
      __typename: "ModelChatMessageConnection",
      items:  Array< {
        __typename: "ChatMessage",
        id: string,
        senderID: string,
        receiverID: string,
        data?: string | null,
        timeStamp?: number | null,
        isFile?: boolean | null,
        chatgroupID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChatGroupsQueryVariables = {
  filter?: ModelChatGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatGroupsQuery = {
  listChatGroups?:  {
    __typename: "ModelChatGroupConnection",
    items:  Array< {
      __typename: "ChatGroup",
      id: string,
      userID: string,
      locationID: string,
      ChatMessages?:  {
        __typename: "ModelChatMessageConnection",
        items:  Array< {
          __typename: "ChatMessage",
          id: string,
          senderID: string,
          receiverID: string,
          data?: string | null,
          timeStamp?: number | null,
          isFile?: boolean | null,
          chatgroupID: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChatMessageQueryVariables = {
  id: string,
};

export type GetChatMessageQuery = {
  getChatMessage?:  {
    __typename: "ChatMessage",
    id: string,
    senderID: string,
    receiverID: string,
    data?: string | null,
    timeStamp?: number | null,
    isFile?: boolean | null,
    chatgroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChatMessagesQueryVariables = {
  filter?: ModelChatMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatMessagesQuery = {
  listChatMessages?:  {
    __typename: "ModelChatMessageConnection",
    items:  Array< {
      __typename: "ChatMessage",
      id: string,
      senderID: string,
      receiverID: string,
      data?: string | null,
      timeStamp?: number | null,
      isFile?: boolean | null,
      chatgroupID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ChatMessagesByChatgroupIDQueryVariables = {
  chatgroupID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelChatMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ChatMessagesByChatgroupIDQuery = {
  chatMessagesByChatgroupID?:  {
    __typename: "ModelChatMessageConnection",
    items:  Array< {
      __typename: "ChatMessage",
      id: string,
      senderID: string,
      receiverID: string,
      data?: string | null,
      timeStamp?: number | null,
      isFile?: boolean | null,
      chatgroupID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetKeywordsQueryVariables = {
  id: string,
};

export type GetKeywordsQuery = {
  getKeywords?:  {
    __typename: "Keywords",
    id: string,
    keyword?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListKeywordsQueryVariables = {
  filter?: ModelKeywordsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListKeywordsQuery = {
  listKeywords?:  {
    __typename: "ModelKeywordsConnection",
    items:  Array< {
      __typename: "Keywords",
      id: string,
      keyword?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLiveSnapQueryVariables = {
  id: string,
};

export type GetLiveSnapQuery = {
  getLiveSnap?:  {
    __typename: "LiveSnap",
    id: string,
    video?: string | null,
    expirationUnixTime?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListLiveSnapsQueryVariables = {
  filter?: ModelLiveSnapFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLiveSnapsQuery = {
  listLiveSnaps?:  {
    __typename: "ModelLiveSnapConnection",
    items:  Array< {
      __typename: "LiveSnap",
      id: string,
      video?: string | null,
      expirationUnixTime?: number | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    gender?: string | null,
    dob?: string | null,
    interests: Array< string >,
    cognitoUser: string,
    givenName?: string | null,
    familyName?: string | null,
    myFavourites?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      gender?: string | null,
      dob?: string | null,
      interests: Array< string >,
      cognitoUser: string,
      givenName?: string | null,
      familyName?: string | null,
      myFavourites?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReviewQueryVariables = {
  id: string,
};

export type GetReviewQuery = {
  getReview?:  {
    __typename: "Review",
    id: string,
    description: string,
    flag?: string | null,
    locationID: string,
    rating: number,
    ownerName: string,
    ReportReviews?:  {
      __typename: "ModelReportReviewConnection",
      items:  Array< {
        __typename: "ReportReview",
        id: string,
        reason?: string | null,
        additionalComments?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewReplies?:  {
      __typename: "ModelReviewReplyConnection",
      items:  Array< {
        __typename: "ReviewReply",
        id: string,
        description?: string | null,
        ownerName?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewInteraction?:  {
      __typename: "ModelReviewInteractionsConnection",
      items:  Array< {
        __typename: "ReviewInteractions",
        id: string,
        reviewID: string,
        reaction?: number | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListReviewsQueryVariables = {
  filter?: ModelReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReviewsQuery = {
  listReviews?:  {
    __typename: "ModelReviewConnection",
    items:  Array< {
      __typename: "Review",
      id: string,
      description: string,
      flag?: string | null,
      locationID: string,
      rating: number,
      ownerName: string,
      ReportReviews?:  {
        __typename: "ModelReportReviewConnection",
        items:  Array< {
          __typename: "ReportReview",
          id: string,
          reason?: string | null,
          additionalComments?: string | null,
          reviewID: string,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      ReviewReplies?:  {
        __typename: "ModelReviewReplyConnection",
        items:  Array< {
          __typename: "ReviewReply",
          id: string,
          description?: string | null,
          ownerName?: string | null,
          reviewID: string,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      ReviewInteraction?:  {
        __typename: "ModelReviewInteractionsConnection",
        items:  Array< {
          __typename: "ReviewInteractions",
          id: string,
          reviewID: string,
          reaction?: number | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ReviewsByLocationIDQueryVariables = {
  locationID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReviewsByLocationIDQuery = {
  reviewsByLocationID?:  {
    __typename: "ModelReviewConnection",
    items:  Array< {
      __typename: "Review",
      id: string,
      description: string,
      flag?: string | null,
      locationID: string,
      rating: number,
      ownerName: string,
      ReportReviews?:  {
        __typename: "ModelReportReviewConnection",
        items:  Array< {
          __typename: "ReportReview",
          id: string,
          reason?: string | null,
          additionalComments?: string | null,
          reviewID: string,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      ReviewReplies?:  {
        __typename: "ModelReviewReplyConnection",
        items:  Array< {
          __typename: "ReviewReply",
          id: string,
          description?: string | null,
          ownerName?: string | null,
          reviewID: string,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      ReviewInteraction?:  {
        __typename: "ModelReviewInteractionsConnection",
        items:  Array< {
          __typename: "ReviewInteractions",
          id: string,
          reviewID: string,
          reaction?: number | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLocationQueryVariables = {
  id: string,
};

export type GetLocationQuery = {
  getLocation?:  {
    __typename: "Location",
    id: string,
    amenities:  Array< {
      __typename: "Amenitie",
      value: string,
      label: string,
      icon: string,
    } >,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    category: string,
    businessID: string,
    description: string,
    email: string,
    hours:  Array< {
      __typename: "LocationHours",
      open: boolean,
      startTime?: string | null,
      endTime?: string | null,
      name: string,
    } >,
    images?:  Array< {
      __typename: "LocationImage",
      type: string,
      key: string,
    } > | null,
    phoneNumber: string,
    liveView?: string | null,
    status: Status,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        description: string,
        flag?: string | null,
        locationID: string,
        rating: number,
        ownerName: string,
        ReportReviews?:  {
          __typename: "ModelReportReviewConnection",
          items:  Array< {
            __typename: "ReportReview",
            id: string,
            reason?: string | null,
            additionalComments?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewReplies?:  {
          __typename: "ModelReviewReplyConnection",
          items:  Array< {
            __typename: "ReviewReply",
            id: string,
            description?: string | null,
            ownerName?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewInteraction?:  {
          __typename: "ModelReviewInteractionsConnection",
          items:  Array< {
            __typename: "ReviewInteractions",
            id: string,
            reviewID: string,
            reaction?: number | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    LiveSnap?:  {
      __typename: "LiveSnap",
      id: string,
      video?: string | null,
      expirationUnixTime?: number | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    latitude: number,
    longitude: number,
    keywords: Array< string >,
    locationImage: string,
    isPublished: boolean,
    social?:  Array< {
      __typename: "Social",
      type?: string | null,
      address?: string | null,
    } | null > | null,
    searchField?: string | null,
    avgRating?: number | null,
    LocationManagers?:  {
      __typename: "ModelLocationManagerConnection",
      items:  Array< {
        __typename: "LocationManager",
        id: string,
        storyAccess?: boolean | null,
        userId?: string | null,
        familyName?: string | null,
        givenName?: string | null,
        fullAccess?: boolean | null,
        locationID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    websiteURL?: string | null,
    createdAt: string,
    updatedAt: string,
    locationLiveSnapId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListLocationsQueryVariables = {
  filter?: ModelLocationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLocationsQuery = {
  listLocations?:  {
    __typename: "ModelLocationConnection",
    items:  Array< {
      __typename: "Location",
      id: string,
      amenities:  Array< {
        __typename: "Amenitie",
        value: string,
        label: string,
        icon: string,
      } >,
      address:  {
        __typename: "Address",
        address: string,
        unit?: string | null,
        city: string,
        country: string,
        state: string,
        postalcode: string,
        geoLocation:  {
          __typename: "Coordinates",
          lat: number,
          lng: number,
        },
      },
      name: string,
      category: string,
      businessID: string,
      description: string,
      email: string,
      hours:  Array< {
        __typename: "LocationHours",
        open: boolean,
        startTime?: string | null,
        endTime?: string | null,
        name: string,
      } >,
      images?:  Array< {
        __typename: "LocationImage",
        type: string,
        key: string,
      } > | null,
      phoneNumber: string,
      liveView?: string | null,
      status: Status,
      Reviews?:  {
        __typename: "ModelReviewConnection",
        items:  Array< {
          __typename: "Review",
          id: string,
          description: string,
          flag?: string | null,
          locationID: string,
          rating: number,
          ownerName: string,
          ReportReviews?:  {
            __typename: "ModelReportReviewConnection",
            nextToken?: string | null,
          } | null,
          ReviewReplies?:  {
            __typename: "ModelReviewReplyConnection",
            nextToken?: string | null,
          } | null,
          ReviewInteraction?:  {
            __typename: "ModelReviewInteractionsConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      LiveSnap?:  {
        __typename: "LiveSnap",
        id: string,
        video?: string | null,
        expirationUnixTime?: number | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      latitude: number,
      longitude: number,
      keywords: Array< string >,
      locationImage: string,
      isPublished: boolean,
      social?:  Array< {
        __typename: "Social",
        type?: string | null,
        address?: string | null,
      } | null > | null,
      searchField?: string | null,
      avgRating?: number | null,
      LocationManagers?:  {
        __typename: "ModelLocationManagerConnection",
        items:  Array< {
          __typename: "LocationManager",
          id: string,
          storyAccess?: boolean | null,
          userId?: string | null,
          familyName?: string | null,
          givenName?: string | null,
          fullAccess?: boolean | null,
          locationID: string,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      websiteURL?: string | null,
      createdAt: string,
      updatedAt: string,
      locationLiveSnapId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type LocationsByBusinessIDQueryVariables = {
  businessID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLocationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LocationsByBusinessIDQuery = {
  locationsByBusinessID?:  {
    __typename: "ModelLocationConnection",
    items:  Array< {
      __typename: "Location",
      id: string,
      amenities:  Array< {
        __typename: "Amenitie",
        value: string,
        label: string,
        icon: string,
      } >,
      address:  {
        __typename: "Address",
        address: string,
        unit?: string | null,
        city: string,
        country: string,
        state: string,
        postalcode: string,
        geoLocation:  {
          __typename: "Coordinates",
          lat: number,
          lng: number,
        },
      },
      name: string,
      category: string,
      businessID: string,
      description: string,
      email: string,
      hours:  Array< {
        __typename: "LocationHours",
        open: boolean,
        startTime?: string | null,
        endTime?: string | null,
        name: string,
      } >,
      images?:  Array< {
        __typename: "LocationImage",
        type: string,
        key: string,
      } > | null,
      phoneNumber: string,
      liveView?: string | null,
      status: Status,
      Reviews?:  {
        __typename: "ModelReviewConnection",
        items:  Array< {
          __typename: "Review",
          id: string,
          description: string,
          flag?: string | null,
          locationID: string,
          rating: number,
          ownerName: string,
          ReportReviews?:  {
            __typename: "ModelReportReviewConnection",
            nextToken?: string | null,
          } | null,
          ReviewReplies?:  {
            __typename: "ModelReviewReplyConnection",
            nextToken?: string | null,
          } | null,
          ReviewInteraction?:  {
            __typename: "ModelReviewInteractionsConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      LiveSnap?:  {
        __typename: "LiveSnap",
        id: string,
        video?: string | null,
        expirationUnixTime?: number | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      latitude: number,
      longitude: number,
      keywords: Array< string >,
      locationImage: string,
      isPublished: boolean,
      social?:  Array< {
        __typename: "Social",
        type?: string | null,
        address?: string | null,
      } | null > | null,
      searchField?: string | null,
      avgRating?: number | null,
      LocationManagers?:  {
        __typename: "ModelLocationManagerConnection",
        items:  Array< {
          __typename: "LocationManager",
          id: string,
          storyAccess?: boolean | null,
          userId?: string | null,
          familyName?: string | null,
          givenName?: string | null,
          fullAccess?: boolean | null,
          locationID: string,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      websiteURL?: string | null,
      createdAt: string,
      updatedAt: string,
      locationLiveSnapId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBusinessQueryVariables = {
  id: string,
};

export type GetBusinessQuery = {
  getBusiness?:  {
    __typename: "Business",
    id: string,
    description: string,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    number: number,
    phone: string,
    size: string,
    type: string,
    websiteUrl?: string | null,
    createdDate: string,
    status: Status,
    cognitoUser: string,
    Locations?:  {
      __typename: "ModelLocationConnection",
      items:  Array< {
        __typename: "Location",
        id: string,
        amenities:  Array< {
          __typename: "Amenitie",
          value: string,
          label: string,
          icon: string,
        } >,
        address:  {
          __typename: "Address",
          address: string,
          unit?: string | null,
          city: string,
          country: string,
          state: string,
          postalcode: string,
          geoLocation:  {
            __typename: "Coordinates",
            lat: number,
            lng: number,
          },
        },
        name: string,
        category: string,
        businessID: string,
        description: string,
        email: string,
        hours:  Array< {
          __typename: "LocationHours",
          open: boolean,
          startTime?: string | null,
          endTime?: string | null,
          name: string,
        } >,
        images?:  Array< {
          __typename: "LocationImage",
          type: string,
          key: string,
        } > | null,
        phoneNumber: string,
        liveView?: string | null,
        status: Status,
        Reviews?:  {
          __typename: "ModelReviewConnection",
          items:  Array< {
            __typename: "Review",
            id: string,
            description: string,
            flag?: string | null,
            locationID: string,
            rating: number,
            ownerName: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        LiveSnap?:  {
          __typename: "LiveSnap",
          id: string,
          video?: string | null,
          expirationUnixTime?: number | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        latitude: number,
        longitude: number,
        keywords: Array< string >,
        locationImage: string,
        isPublished: boolean,
        social?:  Array< {
          __typename: "Social",
          type?: string | null,
          address?: string | null,
        } | null > | null,
        searchField?: string | null,
        avgRating?: number | null,
        LocationManagers?:  {
          __typename: "ModelLocationManagerConnection",
          items:  Array< {
            __typename: "LocationManager",
            id: string,
            storyAccess?: boolean | null,
            userId?: string | null,
            familyName?: string | null,
            givenName?: string | null,
            fullAccess?: boolean | null,
            locationID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        websiteURL?: string | null,
        createdAt: string,
        updatedAt: string,
        locationLiveSnapId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    documents:  Array< {
      __typename: "BusinessDocument",
      document: string,
      documentType: string,
    } >,
    identityId: string,
    email: string,
    searchField: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBusinessesQueryVariables = {
  filter?: ModelBusinessFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBusinessesQuery = {
  listBusinesses?:  {
    __typename: "ModelBusinessConnection",
    items:  Array< {
      __typename: "Business",
      id: string,
      description: string,
      address:  {
        __typename: "Address",
        address: string,
        unit?: string | null,
        city: string,
        country: string,
        state: string,
        postalcode: string,
        geoLocation:  {
          __typename: "Coordinates",
          lat: number,
          lng: number,
        },
      },
      name: string,
      number: number,
      phone: string,
      size: string,
      type: string,
      websiteUrl?: string | null,
      createdDate: string,
      status: Status,
      cognitoUser: string,
      Locations?:  {
        __typename: "ModelLocationConnection",
        items:  Array< {
          __typename: "Location",
          id: string,
          amenities:  Array< {
            __typename: "Amenitie",
            value: string,
            label: string,
            icon: string,
          } >,
          address:  {
            __typename: "Address",
            address: string,
            unit?: string | null,
            city: string,
            country: string,
            state: string,
            postalcode: string,
          },
          name: string,
          category: string,
          businessID: string,
          description: string,
          email: string,
          hours:  Array< {
            __typename: "LocationHours",
            open: boolean,
            startTime?: string | null,
            endTime?: string | null,
            name: string,
          } >,
          images?:  Array< {
            __typename: "LocationImage",
            type: string,
            key: string,
          } > | null,
          phoneNumber: string,
          liveView?: string | null,
          status: Status,
          Reviews?:  {
            __typename: "ModelReviewConnection",
            nextToken?: string | null,
          } | null,
          LiveSnap?:  {
            __typename: "LiveSnap",
            id: string,
            video?: string | null,
            expirationUnixTime?: number | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null,
          latitude: number,
          longitude: number,
          keywords: Array< string >,
          locationImage: string,
          isPublished: boolean,
          social?:  Array< {
            __typename: "Social",
            type?: string | null,
            address?: string | null,
          } | null > | null,
          searchField?: string | null,
          avgRating?: number | null,
          LocationManagers?:  {
            __typename: "ModelLocationManagerConnection",
            nextToken?: string | null,
          } | null,
          websiteURL?: string | null,
          createdAt: string,
          updatedAt: string,
          locationLiveSnapId?: string | null,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      documents:  Array< {
        __typename: "BusinessDocument",
        document: string,
        documentType: string,
      } >,
      identityId: string,
      email: string,
      searchField: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateReviewInteractionsSubscriptionVariables = {
  filter?: ModelSubscriptionReviewInteractionsFilterInput | null,
  owner?: string | null,
};

export type OnCreateReviewInteractionsSubscription = {
  onCreateReviewInteractions?:  {
    __typename: "ReviewInteractions",
    id: string,
    reviewID: string,
    reaction?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateReviewInteractionsSubscriptionVariables = {
  filter?: ModelSubscriptionReviewInteractionsFilterInput | null,
  owner?: string | null,
};

export type OnUpdateReviewInteractionsSubscription = {
  onUpdateReviewInteractions?:  {
    __typename: "ReviewInteractions",
    id: string,
    reviewID: string,
    reaction?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteReviewInteractionsSubscriptionVariables = {
  filter?: ModelSubscriptionReviewInteractionsFilterInput | null,
  owner?: string | null,
};

export type OnDeleteReviewInteractionsSubscription = {
  onDeleteReviewInteractions?:  {
    __typename: "ReviewInteractions",
    id: string,
    reviewID: string,
    reaction?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateReviewReplySubscriptionVariables = {
  filter?: ModelSubscriptionReviewReplyFilterInput | null,
  owner?: string | null,
};

export type OnCreateReviewReplySubscription = {
  onCreateReviewReply?:  {
    __typename: "ReviewReply",
    id: string,
    description?: string | null,
    ownerName?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateReviewReplySubscriptionVariables = {
  filter?: ModelSubscriptionReviewReplyFilterInput | null,
  owner?: string | null,
};

export type OnUpdateReviewReplySubscription = {
  onUpdateReviewReply?:  {
    __typename: "ReviewReply",
    id: string,
    description?: string | null,
    ownerName?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteReviewReplySubscriptionVariables = {
  filter?: ModelSubscriptionReviewReplyFilterInput | null,
  owner?: string | null,
};

export type OnDeleteReviewReplySubscription = {
  onDeleteReviewReply?:  {
    __typename: "ReviewReply",
    id: string,
    description?: string | null,
    ownerName?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateReportReviewSubscriptionVariables = {
  filter?: ModelSubscriptionReportReviewFilterInput | null,
  owner?: string | null,
};

export type OnCreateReportReviewSubscription = {
  onCreateReportReview?:  {
    __typename: "ReportReview",
    id: string,
    reason?: string | null,
    additionalComments?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateReportReviewSubscriptionVariables = {
  filter?: ModelSubscriptionReportReviewFilterInput | null,
  owner?: string | null,
};

export type OnUpdateReportReviewSubscription = {
  onUpdateReportReview?:  {
    __typename: "ReportReview",
    id: string,
    reason?: string | null,
    additionalComments?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteReportReviewSubscriptionVariables = {
  filter?: ModelSubscriptionReportReviewFilterInput | null,
  owner?: string | null,
};

export type OnDeleteReportReviewSubscription = {
  onDeleteReportReview?:  {
    __typename: "ReportReview",
    id: string,
    reason?: string | null,
    additionalComments?: string | null,
    reviewID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateLocationManagerSubscriptionVariables = {
  filter?: ModelSubscriptionLocationManagerFilterInput | null,
  owner?: string | null,
};

export type OnCreateLocationManagerSubscription = {
  onCreateLocationManager?:  {
    __typename: "LocationManager",
    id: string,
    storyAccess?: boolean | null,
    userId?: string | null,
    familyName?: string | null,
    givenName?: string | null,
    fullAccess?: boolean | null,
    locationID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateLocationManagerSubscriptionVariables = {
  filter?: ModelSubscriptionLocationManagerFilterInput | null,
  owner?: string | null,
};

export type OnUpdateLocationManagerSubscription = {
  onUpdateLocationManager?:  {
    __typename: "LocationManager",
    id: string,
    storyAccess?: boolean | null,
    userId?: string | null,
    familyName?: string | null,
    givenName?: string | null,
    fullAccess?: boolean | null,
    locationID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteLocationManagerSubscriptionVariables = {
  filter?: ModelSubscriptionLocationManagerFilterInput | null,
  owner?: string | null,
};

export type OnDeleteLocationManagerSubscription = {
  onDeleteLocationManager?:  {
    __typename: "LocationManager",
    id: string,
    storyAccess?: boolean | null,
    userId?: string | null,
    familyName?: string | null,
    givenName?: string | null,
    fullAccess?: boolean | null,
    locationID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateChatGroupSubscriptionVariables = {
  filter?: ModelSubscriptionChatGroupFilterInput | null,
};

export type OnCreateChatGroupSubscription = {
  onCreateChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    userID: string,
    locationID: string,
    ChatMessages?:  {
      __typename: "ModelChatMessageConnection",
      items:  Array< {
        __typename: "ChatMessage",
        id: string,
        senderID: string,
        receiverID: string,
        data?: string | null,
        timeStamp?: number | null,
        isFile?: boolean | null,
        chatgroupID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatGroupSubscriptionVariables = {
  filter?: ModelSubscriptionChatGroupFilterInput | null,
};

export type OnUpdateChatGroupSubscription = {
  onUpdateChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    userID: string,
    locationID: string,
    ChatMessages?:  {
      __typename: "ModelChatMessageConnection",
      items:  Array< {
        __typename: "ChatMessage",
        id: string,
        senderID: string,
        receiverID: string,
        data?: string | null,
        timeStamp?: number | null,
        isFile?: boolean | null,
        chatgroupID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatGroupSubscriptionVariables = {
  filter?: ModelSubscriptionChatGroupFilterInput | null,
};

export type OnDeleteChatGroupSubscription = {
  onDeleteChatGroup?:  {
    __typename: "ChatGroup",
    id: string,
    userID: string,
    locationID: string,
    ChatMessages?:  {
      __typename: "ModelChatMessageConnection",
      items:  Array< {
        __typename: "ChatMessage",
        id: string,
        senderID: string,
        receiverID: string,
        data?: string | null,
        timeStamp?: number | null,
        isFile?: boolean | null,
        chatgroupID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
};

export type OnCreateChatMessageSubscription = {
  onCreateChatMessage?:  {
    __typename: "ChatMessage",
    id: string,
    senderID: string,
    receiverID: string,
    data?: string | null,
    timeStamp?: number | null,
    isFile?: boolean | null,
    chatgroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
};

export type OnUpdateChatMessageSubscription = {
  onUpdateChatMessage?:  {
    __typename: "ChatMessage",
    id: string,
    senderID: string,
    receiverID: string,
    data?: string | null,
    timeStamp?: number | null,
    isFile?: boolean | null,
    chatgroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
};

export type OnDeleteChatMessageSubscription = {
  onDeleteChatMessage?:  {
    __typename: "ChatMessage",
    id: string,
    senderID: string,
    receiverID: string,
    data?: string | null,
    timeStamp?: number | null,
    isFile?: boolean | null,
    chatgroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateKeywordsSubscriptionVariables = {
  filter?: ModelSubscriptionKeywordsFilterInput | null,
};

export type OnCreateKeywordsSubscription = {
  onCreateKeywords?:  {
    __typename: "Keywords",
    id: string,
    keyword?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateKeywordsSubscriptionVariables = {
  filter?: ModelSubscriptionKeywordsFilterInput | null,
};

export type OnUpdateKeywordsSubscription = {
  onUpdateKeywords?:  {
    __typename: "Keywords",
    id: string,
    keyword?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteKeywordsSubscriptionVariables = {
  filter?: ModelSubscriptionKeywordsFilterInput | null,
};

export type OnDeleteKeywordsSubscription = {
  onDeleteKeywords?:  {
    __typename: "Keywords",
    id: string,
    keyword?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateLiveSnapSubscriptionVariables = {
  filter?: ModelSubscriptionLiveSnapFilterInput | null,
  owner?: string | null,
};

export type OnCreateLiveSnapSubscription = {
  onCreateLiveSnap?:  {
    __typename: "LiveSnap",
    id: string,
    video?: string | null,
    expirationUnixTime?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateLiveSnapSubscriptionVariables = {
  filter?: ModelSubscriptionLiveSnapFilterInput | null,
  owner?: string | null,
};

export type OnUpdateLiveSnapSubscription = {
  onUpdateLiveSnap?:  {
    __typename: "LiveSnap",
    id: string,
    video?: string | null,
    expirationUnixTime?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteLiveSnapSubscriptionVariables = {
  filter?: ModelSubscriptionLiveSnapFilterInput | null,
  owner?: string | null,
};

export type OnDeleteLiveSnapSubscription = {
  onDeleteLiveSnap?:  {
    __typename: "LiveSnap",
    id: string,
    video?: string | null,
    expirationUnixTime?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    gender?: string | null,
    dob?: string | null,
    interests: Array< string >,
    cognitoUser: string,
    givenName?: string | null,
    familyName?: string | null,
    myFavourites?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    gender?: string | null,
    dob?: string | null,
    interests: Array< string >,
    cognitoUser: string,
    givenName?: string | null,
    familyName?: string | null,
    myFavourites?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    gender?: string | null,
    dob?: string | null,
    interests: Array< string >,
    cognitoUser: string,
    givenName?: string | null,
    familyName?: string | null,
    myFavourites?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateReviewSubscriptionVariables = {
  filter?: ModelSubscriptionReviewFilterInput | null,
  owner?: string | null,
};

export type OnCreateReviewSubscription = {
  onCreateReview?:  {
    __typename: "Review",
    id: string,
    description: string,
    flag?: string | null,
    locationID: string,
    rating: number,
    ownerName: string,
    ReportReviews?:  {
      __typename: "ModelReportReviewConnection",
      items:  Array< {
        __typename: "ReportReview",
        id: string,
        reason?: string | null,
        additionalComments?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewReplies?:  {
      __typename: "ModelReviewReplyConnection",
      items:  Array< {
        __typename: "ReviewReply",
        id: string,
        description?: string | null,
        ownerName?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewInteraction?:  {
      __typename: "ModelReviewInteractionsConnection",
      items:  Array< {
        __typename: "ReviewInteractions",
        id: string,
        reviewID: string,
        reaction?: number | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateReviewSubscriptionVariables = {
  filter?: ModelSubscriptionReviewFilterInput | null,
  owner?: string | null,
};

export type OnUpdateReviewSubscription = {
  onUpdateReview?:  {
    __typename: "Review",
    id: string,
    description: string,
    flag?: string | null,
    locationID: string,
    rating: number,
    ownerName: string,
    ReportReviews?:  {
      __typename: "ModelReportReviewConnection",
      items:  Array< {
        __typename: "ReportReview",
        id: string,
        reason?: string | null,
        additionalComments?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewReplies?:  {
      __typename: "ModelReviewReplyConnection",
      items:  Array< {
        __typename: "ReviewReply",
        id: string,
        description?: string | null,
        ownerName?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewInteraction?:  {
      __typename: "ModelReviewInteractionsConnection",
      items:  Array< {
        __typename: "ReviewInteractions",
        id: string,
        reviewID: string,
        reaction?: number | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteReviewSubscriptionVariables = {
  filter?: ModelSubscriptionReviewFilterInput | null,
  owner?: string | null,
};

export type OnDeleteReviewSubscription = {
  onDeleteReview?:  {
    __typename: "Review",
    id: string,
    description: string,
    flag?: string | null,
    locationID: string,
    rating: number,
    ownerName: string,
    ReportReviews?:  {
      __typename: "ModelReportReviewConnection",
      items:  Array< {
        __typename: "ReportReview",
        id: string,
        reason?: string | null,
        additionalComments?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewReplies?:  {
      __typename: "ModelReviewReplyConnection",
      items:  Array< {
        __typename: "ReviewReply",
        id: string,
        description?: string | null,
        ownerName?: string | null,
        reviewID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    ReviewInteraction?:  {
      __typename: "ModelReviewInteractionsConnection",
      items:  Array< {
        __typename: "ReviewInteractions",
        id: string,
        reviewID: string,
        reaction?: number | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateLocationSubscriptionVariables = {
  filter?: ModelSubscriptionLocationFilterInput | null,
  owner?: string | null,
};

export type OnCreateLocationSubscription = {
  onCreateLocation?:  {
    __typename: "Location",
    id: string,
    amenities:  Array< {
      __typename: "Amenitie",
      value: string,
      label: string,
      icon: string,
    } >,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    category: string,
    businessID: string,
    description: string,
    email: string,
    hours:  Array< {
      __typename: "LocationHours",
      open: boolean,
      startTime?: string | null,
      endTime?: string | null,
      name: string,
    } >,
    images?:  Array< {
      __typename: "LocationImage",
      type: string,
      key: string,
    } > | null,
    phoneNumber: string,
    liveView?: string | null,
    status: Status,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        description: string,
        flag?: string | null,
        locationID: string,
        rating: number,
        ownerName: string,
        ReportReviews?:  {
          __typename: "ModelReportReviewConnection",
          items:  Array< {
            __typename: "ReportReview",
            id: string,
            reason?: string | null,
            additionalComments?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewReplies?:  {
          __typename: "ModelReviewReplyConnection",
          items:  Array< {
            __typename: "ReviewReply",
            id: string,
            description?: string | null,
            ownerName?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewInteraction?:  {
          __typename: "ModelReviewInteractionsConnection",
          items:  Array< {
            __typename: "ReviewInteractions",
            id: string,
            reviewID: string,
            reaction?: number | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    LiveSnap?:  {
      __typename: "LiveSnap",
      id: string,
      video?: string | null,
      expirationUnixTime?: number | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    latitude: number,
    longitude: number,
    keywords: Array< string >,
    locationImage: string,
    isPublished: boolean,
    social?:  Array< {
      __typename: "Social",
      type?: string | null,
      address?: string | null,
    } | null > | null,
    searchField?: string | null,
    avgRating?: number | null,
    LocationManagers?:  {
      __typename: "ModelLocationManagerConnection",
      items:  Array< {
        __typename: "LocationManager",
        id: string,
        storyAccess?: boolean | null,
        userId?: string | null,
        familyName?: string | null,
        givenName?: string | null,
        fullAccess?: boolean | null,
        locationID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    websiteURL?: string | null,
    createdAt: string,
    updatedAt: string,
    locationLiveSnapId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateLocationSubscriptionVariables = {
  filter?: ModelSubscriptionLocationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateLocationSubscription = {
  onUpdateLocation?:  {
    __typename: "Location",
    id: string,
    amenities:  Array< {
      __typename: "Amenitie",
      value: string,
      label: string,
      icon: string,
    } >,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    category: string,
    businessID: string,
    description: string,
    email: string,
    hours:  Array< {
      __typename: "LocationHours",
      open: boolean,
      startTime?: string | null,
      endTime?: string | null,
      name: string,
    } >,
    images?:  Array< {
      __typename: "LocationImage",
      type: string,
      key: string,
    } > | null,
    phoneNumber: string,
    liveView?: string | null,
    status: Status,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        description: string,
        flag?: string | null,
        locationID: string,
        rating: number,
        ownerName: string,
        ReportReviews?:  {
          __typename: "ModelReportReviewConnection",
          items:  Array< {
            __typename: "ReportReview",
            id: string,
            reason?: string | null,
            additionalComments?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewReplies?:  {
          __typename: "ModelReviewReplyConnection",
          items:  Array< {
            __typename: "ReviewReply",
            id: string,
            description?: string | null,
            ownerName?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewInteraction?:  {
          __typename: "ModelReviewInteractionsConnection",
          items:  Array< {
            __typename: "ReviewInteractions",
            id: string,
            reviewID: string,
            reaction?: number | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    LiveSnap?:  {
      __typename: "LiveSnap",
      id: string,
      video?: string | null,
      expirationUnixTime?: number | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    latitude: number,
    longitude: number,
    keywords: Array< string >,
    locationImage: string,
    isPublished: boolean,
    social?:  Array< {
      __typename: "Social",
      type?: string | null,
      address?: string | null,
    } | null > | null,
    searchField?: string | null,
    avgRating?: number | null,
    LocationManagers?:  {
      __typename: "ModelLocationManagerConnection",
      items:  Array< {
        __typename: "LocationManager",
        id: string,
        storyAccess?: boolean | null,
        userId?: string | null,
        familyName?: string | null,
        givenName?: string | null,
        fullAccess?: boolean | null,
        locationID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    websiteURL?: string | null,
    createdAt: string,
    updatedAt: string,
    locationLiveSnapId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteLocationSubscriptionVariables = {
  filter?: ModelSubscriptionLocationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteLocationSubscription = {
  onDeleteLocation?:  {
    __typename: "Location",
    id: string,
    amenities:  Array< {
      __typename: "Amenitie",
      value: string,
      label: string,
      icon: string,
    } >,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    category: string,
    businessID: string,
    description: string,
    email: string,
    hours:  Array< {
      __typename: "LocationHours",
      open: boolean,
      startTime?: string | null,
      endTime?: string | null,
      name: string,
    } >,
    images?:  Array< {
      __typename: "LocationImage",
      type: string,
      key: string,
    } > | null,
    phoneNumber: string,
    liveView?: string | null,
    status: Status,
    Reviews?:  {
      __typename: "ModelReviewConnection",
      items:  Array< {
        __typename: "Review",
        id: string,
        description: string,
        flag?: string | null,
        locationID: string,
        rating: number,
        ownerName: string,
        ReportReviews?:  {
          __typename: "ModelReportReviewConnection",
          items:  Array< {
            __typename: "ReportReview",
            id: string,
            reason?: string | null,
            additionalComments?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewReplies?:  {
          __typename: "ModelReviewReplyConnection",
          items:  Array< {
            __typename: "ReviewReply",
            id: string,
            description?: string | null,
            ownerName?: string | null,
            reviewID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        ReviewInteraction?:  {
          __typename: "ModelReviewInteractionsConnection",
          items:  Array< {
            __typename: "ReviewInteractions",
            id: string,
            reviewID: string,
            reaction?: number | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    LiveSnap?:  {
      __typename: "LiveSnap",
      id: string,
      video?: string | null,
      expirationUnixTime?: number | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    latitude: number,
    longitude: number,
    keywords: Array< string >,
    locationImage: string,
    isPublished: boolean,
    social?:  Array< {
      __typename: "Social",
      type?: string | null,
      address?: string | null,
    } | null > | null,
    searchField?: string | null,
    avgRating?: number | null,
    LocationManagers?:  {
      __typename: "ModelLocationManagerConnection",
      items:  Array< {
        __typename: "LocationManager",
        id: string,
        storyAccess?: boolean | null,
        userId?: string | null,
        familyName?: string | null,
        givenName?: string | null,
        fullAccess?: boolean | null,
        locationID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    websiteURL?: string | null,
    createdAt: string,
    updatedAt: string,
    locationLiveSnapId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateBusinessSubscriptionVariables = {
  filter?: ModelSubscriptionBusinessFilterInput | null,
  cognitoUser?: string | null,
};

export type OnCreateBusinessSubscription = {
  onCreateBusiness?:  {
    __typename: "Business",
    id: string,
    description: string,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    number: number,
    phone: string,
    size: string,
    type: string,
    websiteUrl?: string | null,
    createdDate: string,
    status: Status,
    cognitoUser: string,
    Locations?:  {
      __typename: "ModelLocationConnection",
      items:  Array< {
        __typename: "Location",
        id: string,
        amenities:  Array< {
          __typename: "Amenitie",
          value: string,
          label: string,
          icon: string,
        } >,
        address:  {
          __typename: "Address",
          address: string,
          unit?: string | null,
          city: string,
          country: string,
          state: string,
          postalcode: string,
          geoLocation:  {
            __typename: "Coordinates",
            lat: number,
            lng: number,
          },
        },
        name: string,
        category: string,
        businessID: string,
        description: string,
        email: string,
        hours:  Array< {
          __typename: "LocationHours",
          open: boolean,
          startTime?: string | null,
          endTime?: string | null,
          name: string,
        } >,
        images?:  Array< {
          __typename: "LocationImage",
          type: string,
          key: string,
        } > | null,
        phoneNumber: string,
        liveView?: string | null,
        status: Status,
        Reviews?:  {
          __typename: "ModelReviewConnection",
          items:  Array< {
            __typename: "Review",
            id: string,
            description: string,
            flag?: string | null,
            locationID: string,
            rating: number,
            ownerName: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        LiveSnap?:  {
          __typename: "LiveSnap",
          id: string,
          video?: string | null,
          expirationUnixTime?: number | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        latitude: number,
        longitude: number,
        keywords: Array< string >,
        locationImage: string,
        isPublished: boolean,
        social?:  Array< {
          __typename: "Social",
          type?: string | null,
          address?: string | null,
        } | null > | null,
        searchField?: string | null,
        avgRating?: number | null,
        LocationManagers?:  {
          __typename: "ModelLocationManagerConnection",
          items:  Array< {
            __typename: "LocationManager",
            id: string,
            storyAccess?: boolean | null,
            userId?: string | null,
            familyName?: string | null,
            givenName?: string | null,
            fullAccess?: boolean | null,
            locationID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        websiteURL?: string | null,
        createdAt: string,
        updatedAt: string,
        locationLiveSnapId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    documents:  Array< {
      __typename: "BusinessDocument",
      document: string,
      documentType: string,
    } >,
    identityId: string,
    email: string,
    searchField: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBusinessSubscriptionVariables = {
  filter?: ModelSubscriptionBusinessFilterInput | null,
  cognitoUser?: string | null,
};

export type OnUpdateBusinessSubscription = {
  onUpdateBusiness?:  {
    __typename: "Business",
    id: string,
    description: string,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    number: number,
    phone: string,
    size: string,
    type: string,
    websiteUrl?: string | null,
    createdDate: string,
    status: Status,
    cognitoUser: string,
    Locations?:  {
      __typename: "ModelLocationConnection",
      items:  Array< {
        __typename: "Location",
        id: string,
        amenities:  Array< {
          __typename: "Amenitie",
          value: string,
          label: string,
          icon: string,
        } >,
        address:  {
          __typename: "Address",
          address: string,
          unit?: string | null,
          city: string,
          country: string,
          state: string,
          postalcode: string,
          geoLocation:  {
            __typename: "Coordinates",
            lat: number,
            lng: number,
          },
        },
        name: string,
        category: string,
        businessID: string,
        description: string,
        email: string,
        hours:  Array< {
          __typename: "LocationHours",
          open: boolean,
          startTime?: string | null,
          endTime?: string | null,
          name: string,
        } >,
        images?:  Array< {
          __typename: "LocationImage",
          type: string,
          key: string,
        } > | null,
        phoneNumber: string,
        liveView?: string | null,
        status: Status,
        Reviews?:  {
          __typename: "ModelReviewConnection",
          items:  Array< {
            __typename: "Review",
            id: string,
            description: string,
            flag?: string | null,
            locationID: string,
            rating: number,
            ownerName: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        LiveSnap?:  {
          __typename: "LiveSnap",
          id: string,
          video?: string | null,
          expirationUnixTime?: number | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        latitude: number,
        longitude: number,
        keywords: Array< string >,
        locationImage: string,
        isPublished: boolean,
        social?:  Array< {
          __typename: "Social",
          type?: string | null,
          address?: string | null,
        } | null > | null,
        searchField?: string | null,
        avgRating?: number | null,
        LocationManagers?:  {
          __typename: "ModelLocationManagerConnection",
          items:  Array< {
            __typename: "LocationManager",
            id: string,
            storyAccess?: boolean | null,
            userId?: string | null,
            familyName?: string | null,
            givenName?: string | null,
            fullAccess?: boolean | null,
            locationID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        websiteURL?: string | null,
        createdAt: string,
        updatedAt: string,
        locationLiveSnapId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    documents:  Array< {
      __typename: "BusinessDocument",
      document: string,
      documentType: string,
    } >,
    identityId: string,
    email: string,
    searchField: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBusinessSubscriptionVariables = {
  filter?: ModelSubscriptionBusinessFilterInput | null,
  cognitoUser?: string | null,
};

export type OnDeleteBusinessSubscription = {
  onDeleteBusiness?:  {
    __typename: "Business",
    id: string,
    description: string,
    address:  {
      __typename: "Address",
      address: string,
      unit?: string | null,
      city: string,
      country: string,
      state: string,
      postalcode: string,
      geoLocation:  {
        __typename: "Coordinates",
        lat: number,
        lng: number,
      },
    },
    name: string,
    number: number,
    phone: string,
    size: string,
    type: string,
    websiteUrl?: string | null,
    createdDate: string,
    status: Status,
    cognitoUser: string,
    Locations?:  {
      __typename: "ModelLocationConnection",
      items:  Array< {
        __typename: "Location",
        id: string,
        amenities:  Array< {
          __typename: "Amenitie",
          value: string,
          label: string,
          icon: string,
        } >,
        address:  {
          __typename: "Address",
          address: string,
          unit?: string | null,
          city: string,
          country: string,
          state: string,
          postalcode: string,
          geoLocation:  {
            __typename: "Coordinates",
            lat: number,
            lng: number,
          },
        },
        name: string,
        category: string,
        businessID: string,
        description: string,
        email: string,
        hours:  Array< {
          __typename: "LocationHours",
          open: boolean,
          startTime?: string | null,
          endTime?: string | null,
          name: string,
        } >,
        images?:  Array< {
          __typename: "LocationImage",
          type: string,
          key: string,
        } > | null,
        phoneNumber: string,
        liveView?: string | null,
        status: Status,
        Reviews?:  {
          __typename: "ModelReviewConnection",
          items:  Array< {
            __typename: "Review",
            id: string,
            description: string,
            flag?: string | null,
            locationID: string,
            rating: number,
            ownerName: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        LiveSnap?:  {
          __typename: "LiveSnap",
          id: string,
          video?: string | null,
          expirationUnixTime?: number | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null,
        latitude: number,
        longitude: number,
        keywords: Array< string >,
        locationImage: string,
        isPublished: boolean,
        social?:  Array< {
          __typename: "Social",
          type?: string | null,
          address?: string | null,
        } | null > | null,
        searchField?: string | null,
        avgRating?: number | null,
        LocationManagers?:  {
          __typename: "ModelLocationManagerConnection",
          items:  Array< {
            __typename: "LocationManager",
            id: string,
            storyAccess?: boolean | null,
            userId?: string | null,
            familyName?: string | null,
            givenName?: string | null,
            fullAccess?: boolean | null,
            locationID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        websiteURL?: string | null,
        createdAt: string,
        updatedAt: string,
        locationLiveSnapId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    documents:  Array< {
      __typename: "BusinessDocument",
      document: string,
      documentType: string,
    } >,
    identityId: string,
    email: string,
    searchField: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
