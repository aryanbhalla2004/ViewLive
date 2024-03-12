import { Address } from "../../../../../API";

export interface IProfileInterface {
  business?: business,
  pNumber?: string,
  gender?: string,
  address?: Address,
  dob?: string,
  interests: string[],
}


export interface business {
  description: string,
  address: Address,
  name: string,
  number: string,
  phone: string,
  size: string,
  type: string,
  websiteUrl?:  string,
  createdDate?: string,
  documentProof: {
    oneType: string,
    oneFile: File | null,
    twoType: string,
    twoFile: File | null
  }
}

