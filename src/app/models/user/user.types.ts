export interface User {
  _id: string;
  name: string;
  email: string;
  phone: null | number;
  image: null | string;
  isDeleted?: boolean;
}

export interface UserList {
  users: Array<User>;
  pagination: any;
}



