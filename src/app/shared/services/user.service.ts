import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { BaseResponse } from '@models/base-response.types';
import { UserList, User } from '@models/user/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rootRoute: string = 'user';
  apiUrl: string = environment.apiUrl + '/' + this.rootRoute;
  userList: User[] = [];

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) { }


  /**
   * @Author Name: Pinki Naskar
   * @Function Description: get all user's record
   * @param {number} limit
   * @param {number} page
   */
  getAllUsers = (limit: number = 0, page: number = 0) => {

    let queryParams = `limit=${limit}&page=${page}`;

    return this.httpClient.get<BaseResponse<UserList>>(`${this.apiUrl}?${queryParams}`);
  }
  /**
   * @Author Name: Pinki Naskar
   * @Function Description: upload user image
   * @param  _payload
   */
  uploadFile = (_payload: any) => {
    return this.httpClient.patch<BaseResponse<any>>(`${this.apiUrl}/profile-image`, _payload);
  }
  /**
   * @Author Name: Pinki Naskar
   * @Function Description: add or update user data
   * @param {User} data
   * @param {string | null} userId
   */
  saveUserData = (data: User, userId: string | null) => {

    if (userId != null) {
      return this.httpClient.put<BaseResponse<User>>(`${this.apiUrl}/${userId}`, data);
    }
    else {
      return this.httpClient.post<BaseResponse<User>>(`${this.apiUrl}`, data);
    }

  }
  /**
 * @Author Name: Pinki Naskar
 * @Function Description: delete user
 * @param {User} data
 */
  deleteUser = (data: User) => {
    let payload = { ...data, ...{ isDeleted: true } };
    return this.httpClient.patch<BaseResponse<any>>(`${this.apiUrl}/delete/${data._id}`, payload);
  }
  /**
   * @Author Name: Pinki Naskar
   * @Function Description: get user detail using id
   * @param {string} userId
   */
  getUserInfo = (userId: string | null) => {
    return this.httpClient.get<BaseResponse<User>>(`${this.apiUrl}/${userId}`);
  }


}
