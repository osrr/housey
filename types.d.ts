export interface User {
  id: string;
  username: string;
  email: string;
  photoURL: string;
  posts: Unit[];
}

export interface NewUser extends User {
  password: string;
}

export interface Unit {
  id: string;
  userId: string;
  label: string;
  description: string;
  location: {
    city: string;
    address: string;
  };
  info: {
    beds: Feature;
    baths: Feature;
    square_foot: Feature;
  };
  images: UploadedFile[];
}

export interface Feature {
  label?: string;
  size?: number;
}

export interface UploadedFile {
  name: string;
  url: string;
}
