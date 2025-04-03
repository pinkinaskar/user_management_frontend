import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToastMessage {

  constructor(private toastrService: ToastrService) { }

  error(message: string, title = '') {
    this.toastrService.clear();
    this.toastrService.error(message, title, {
      timeOut: 5000,
      // disableTimeOut: true,
      // tapToDismiss: false,
      enableHtml: true,
      closeButton: true,
      toastClass: "alert alert-danger",
      // toastClass: "alert alert-danger alert-with-icon",
      positionClass: 'toast-bottom-right'
    });

    // this.toastrService.error(message, 'Error !!',
    //   {
    //     positionClass: 'toast-bottom-left',
    //   }
    // );
  }

  success(message: string, title: string = '') {
    this.toastrService.clear();

    this.toastrService.success(message, title, {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success",
      // toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-bottom-right'
    });

   
  }

  notification(title: string, message: string) {

    this.toastrService.success(message, 'You have new notification : ' + title, {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-info alert-with-icon",
      positionClass: 'toast-bottom-right'
    });
  }

  clear() {
    this.toastrService.clear();
  }

}

