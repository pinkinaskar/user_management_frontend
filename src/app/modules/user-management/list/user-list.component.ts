import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserList, User } from '@models/user/user.types';
import { UserService } from '@shared/services/user.service';
import { ToastMessage } from '@shared/lib/toast.message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [TitleCasePipe]
})
export class UserListComponent implements OnInit {

  userList: Array<User> = [];
  totalData: number = 0;
  limit: number = 10;
  current: number = 1;
  totalPageNo: number = 0;
  sortBy: string | null = null;
  sortValue: string | null = null;

  constructor(
    private userService: UserService,
    private toastMessage: ToastMessage,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getUsers(this.current);

  }

  /**
   * @Author Name: Pinki Naskar
   * @Function get all active users detail
   */
  getUsers(current: number = 1) {

    this.userService.getAllUsers(this.limit, current)
      .subscribe((response: any) => {

        //console.log(response);

        if (response.error == false) {
          this.userList = (response?.data?.users || []);

          if (this.userList.length > 0) {
            this.totalData = response.data.pagination.total;    //total data                            
          }
          else {
            this.totalData = 0;
          }

          this.totalPageNo = Math.ceil(this.totalData / this.limit);   //total page no calculation

          // this.toastMessage.success(response.message);                                     
        }
        else {
          this.toastMessage.error(response.message);
        }


      },
        (err: Error) => {

          console.log('error===>', err);

        }
      )

  }

  onGoTo(page: number): void {
    this.current = page
    this.getUsers(this.current);
  }

  onNext(page: number): void {
    this.current = page + 1;
    this.getUsers(this.current);
  }

  onPrevious(page: number): void {
    this.current = page - 1;
    this.getUsers(this.current);
  }

  goToAddUser() {
    this.router.navigateByUrl('/user/add');
  }

  /**
   * @Author Name: Pinki Naskar
   * @Function delete user 
   */
  removeUser = (userData: User, content: any) => {
    const _modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    _modal.result.then(
      (result: any) => {


        this.userService.deleteUser(userData)
          .subscribe((response: any) => {

            //console.log(response);

            if (response.error == false) {
              this.toastMessage.success('User deleted successfully');
              this.current = 1;
              this.getUsers(this.current);
            }
            else {
              this.toastMessage.error(response.message);
            }


          },
            (err) => {

              console.log('error===>', err);

            }
          )

      },
      (reason: any) => {
        console.log("reason => Here.... ", reason)
      },
    );
  }



}
