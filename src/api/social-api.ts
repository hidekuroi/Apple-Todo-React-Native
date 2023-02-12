import axios from "axios"
import { PhotosType, UserPageType } from "../types/common"
// import APIKey from './apikey';

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
  }
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


type UploadPhotoResponse = {
  data: {photos: PhotosType},
  resultCode: ResultCodeEnum,
  messages: Array<string>
}


// DEFUALT RESPONSE GENERIC
export type DefaultResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance
      .get<UserPageType>(`profile/` + userId)
      .then((response) => response.data)
  },
  uploadPhoto(file: any, apikey: string) {
    let formData = new FormData();
    formData.append('image', {uri: file.uri, name: 'photo.png',filename :'imageName.png',type: 'image/png'});
    formData.append('Content-Type', 'image/png');

    return instance.put<UploadPhotoResponse>('profile/photo', formData, {headers: {'API-KEY': apikey}}).then(response => response)
  }
}
