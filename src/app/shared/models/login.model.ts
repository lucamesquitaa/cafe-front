export interface LoginModel{
    email: string;
    password: string;
}
export interface LoginResponseModel{
  token: string;
  userId: string;
}
export interface ResultLoginModel{
  Id: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Photo: string;
}
export interface GoogleLoginModel{
  idToken: string;
}
