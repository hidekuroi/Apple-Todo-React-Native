import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
})
// ENUMS FOR ERRORS REJECTION
export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptcha {
  Success = 0,
  Error = 1,
  Captcha = 10,
}

// DEFUALT RESPONSE GENERIC
export type DefaultResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>
}
