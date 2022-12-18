import axios from 'axios';
import { UserPageType } from '../types/common';
// import APIKey from './apikey';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    // headers: {
    //     'API-KEY': APIKey
    // }
});
// ENUMS FOR ERRORS REJECTION
export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    Success = 0,
    Error = 1,
    Captcha = 10
}

// DEFUALT RESPONSE GENERIC
export type DefaultResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D,
    resultCode: RC,
    messages: Array<string>
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<UserPageType>(`profile/` + userId)
        .then(response => response.data)
    },
}