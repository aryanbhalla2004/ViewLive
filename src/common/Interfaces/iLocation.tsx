import {document} from "./IBusiness"
import { IReview } from "./iReview"

export interface iLocation{
  amenities: [Amenitie]
  address: String,
  name: String,
  category: String,
  coordinates: Coordinates,
  businessID: String,
  description: String,
  email: String,
  hours: LocationHours,
  images: document,
  phoneNumber: String,
  liveView: String,
  status: String,
  Reviews: [IReview]
}



interface Amenitie{

}

interface Coordinates{

}

interface LocationHours{

}