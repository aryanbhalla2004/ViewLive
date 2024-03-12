export interface IStorageLocation {
  geo: cord,
  coverage_area: number,
  createdDate: Date,
  location_data: string,
}

interface cord {
  latitude: number | undefined,
  longitude: number | undefined,
}
