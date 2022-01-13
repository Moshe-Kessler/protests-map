export interface UserState {
  loading: boolean;
  uid: string;
  formStatus: string;
  isLoggedIn: boolean;
  error?: string;
  action?: string;
}
