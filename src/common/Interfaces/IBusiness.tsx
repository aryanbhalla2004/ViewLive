export interface IBusiness {
  description: String,
  address: String,
  name: String,
  number: String,
  phone: String,
  size: String,
  type: String,
  websiteUrl?:  String,
  createdDate?: Date,
  status?: String ,
  cognitoUser?: String,
  documents?: [document],
}

export interface document {
  document: string,
  documentType: string
}