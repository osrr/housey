export interface User {
  id: string;
  username: string;
  phone: string;
  email: string;
  photoURL: string;
  liked: string[];
}

export interface NewUser extends User {
  password: string;
}

export type HouseType = 'Apartment' | 'Farmhouse' | 'House' | 'Skyscraper';

export interface Unit {
  id: string;
  title: string;
  description: string;
  type: HouseType;
  phone: string;
  location: {
    city: string;
    address: string;
  };
  beds: number;
  baths: number;
  sqft: number;
  images: UploadedFile[];
  reviews: Review[];
  user: {
    userId: string;
    username: string;
    photoURL: string;
    phone: string;
  };
  createdAt: string;
}

export interface Review {
  id: string;
  rate: number;
  description: string;
  user: {
    userId: string;
    username: string;
    photoURL: string;
  };
}

export interface Feature {
  label?: string;
  size?: number;
}

export interface UploadedFile {
  name: string;
  url: string;
}
