export type PropertyFormValues = {
  title: string;
  description: string;
  pricePerNight: string;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: string;
  status: string;
  amenities: string[];
};

export type Property = {
  _id: string;
  title: string;
  description: string;
  pricePerNight: string;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: string;
  status: string;
  amenities: string[];
  image: string[];
};
