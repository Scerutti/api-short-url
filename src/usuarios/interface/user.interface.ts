import { Document } from "mongoose";

export interface UserBase extends Document{
  name: string;
  email: string;
  last_name: string;
  fullName: string;
  other_user_data: ComplmentUserInfo;
  cartid: string;
  enabled?: boolean;
  avatar?: string;
}


export interface ComplmentUserInfo {
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  cp: string;
}

export type Operation = "addition" | "deletion";

export interface UserDTO extends Omit<UserBase, keyof UserBase > {}
export interface CreateUserDTO extends Omit<UserBase, 'createdAt' | 'updatedAt' | '_id' | '__v'> {}
export interface UpdateUserDTO extends Partial<UserBase> {};
