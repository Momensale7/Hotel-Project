export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" ;
}

export interface AuthState {
  user: any;
  userProfile: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
  password: string;
  confirmPassword: string;
  profileImage: File | null;
  role: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
