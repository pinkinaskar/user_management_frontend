import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastMessage } from '@shared/lib/toast.message';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { clientFormErroMsg } from '@shared/validators/error-messages';
import { checkFormValidation, checkImageExtention, makeAllFormControlAsDirty, noWhitespaceValidator, checkAgeLimit } from '@shared/validators/validate-functions';
import { UserList, User } from '@models/user/user.types';
import { LoaderService } from '@shared/services/loader.service';
import { environment } from '@env/environment';
import { UserService } from '@shared/services/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],

})

export class AddUserComponent implements OnInit {

  clientForm!: FormGroup;
  clientErrorMsg: any = null;
  uniqueId: string | null = null;
  userData: User | null = null;
  profilePicLInk: string | null = null;
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog!: ElementRef;
  displayMessage: string = '';

  constructor(
    private toastMessage: ToastMessage,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.uniqueId = this.activatedRoute.snapshot.params['id'] || null;
    this.generateForm();

    if (this.uniqueId != null) {
      this.getUserInfo();
    }
  }

  generateForm() {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required, noWhitespaceValidator]],
      email: ['', [Validators.required, noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      phone: ['', [Validators.required, noWhitespaceValidator, Validators.pattern(/^[\d\+\-\(\)]{10,15}$/)]],
      image: [''],
    });
  }

  makeFieldDirty = (_field: string) => {
    const control = this.clientForm.get(_field);
    if (control) {
      control.markAsDirty();  // Mark the control as dirty only if it exists
    } else {
      console.error(`Form control '${_field}' not found.`);
    }
  }


  validateForm = (_field: string = '') => {
    if (_field.trim().length > 0) {
      this.makeFieldDirty(_field)
    }

    this.clientErrorMsg = checkFormValidation(this.clientForm, clientFormErroMsg);
    // console.log(this.clientForm.value, this.clientForm)
  }

  /**
   * @Author Name: Pinki Naskar
   * @Function Description: Get user information
   */
  getUserInfo() {

    this.loaderService.setLoading(true);

    this.userService.getUserInfo(this.uniqueId)
      .subscribe((response) => {

        //console.log(response);
        this.loaderService.setLoading(false);
        if (response.error == false) {
          this.userData = response.data;

          this.clientForm.patchValue({
            name: this.userData.name,
            email: this.userData.email,
            phone: this.userData.phone,
            image: this.userData.image ? this.userData.image.split('/').pop() : '',
          });

          this.profilePicLInk = this.userData.image;
        }
        else {
          this.toastMessage.error(response.message);
        }


      },
        (err) => {
          this.loaderService.setLoading(false);
          console.log('error===>', err);

        }
      )
  }

  goBack() {
    this.router.navigate(['user']);

  }

  /**
   * @Author Name: Pinki Naskar
   * @Function Description: add or edit user information 
   */
  submitClientForm() {

    if (!this.clientForm.valid) {
      makeAllFormControlAsDirty(this.clientForm);
      this.validateForm();
      console.log('error : ', this.clientErrorMsg)
      return;
    }

    const data: any = { ...this.clientForm.value };

    this.loaderService.setLoading(true);

    this.userService.saveUserData(data, this.uniqueId)
      .subscribe((response: any) => {

        //console.log(response);

        if (response.error == false) {
          this.loaderService.setLoading(false);

          if (this.uniqueId != null) {
            /**
             * delete previous file
            */
            // this.getClientInfo();
            this.displayMessage = 'User updated successfully';

          }
          else {
            this.displayMessage = 'User added successfully';
            this.profilePicLInk = '';
            this.clientForm.reset();
          }
          this.toastMessage.success(this.displayMessage);
        }
        else {
          this.loaderService.setLoading(false);
          this.toastMessage.error(response.message);
        }


      },
        (err) => {

          console.log('error===>', err);
          this.loaderService.setLoading(false);
          this.toastMessage.error(err.error.message);

        }
      )
  }

  /**
   * @Author Name: Pinki Naskar
   * @Function upload user image 
   */
  uploadImageFile = (inputFileEvent: any) => {

    console.group("uploadProfileImage: ")
    //console.log(inputFileEvent.target.files, inputFileEvent.target.files.length)

    if (inputFileEvent.target.files.length > 0) {

      const _file = inputFileEvent.target.files[0];
      //console.log(_file)
      var _fileExt = _file.name.split('.').pop();

      if (environment.upload_details.ALLOWED_IMG_EXT.includes(_fileExt.toUpperCase())) {
        console.log(_file.size, environment.upload_details.MAX_IMAGE_SIZE);
        if (_file.size <= environment.upload_details.MAX_IMAGE_SIZE) {
          let formParams = new FormData();
          formParams.append('image', _file);

          this.loaderService.setLoading(true);

          this.userService.uploadFile(formParams).subscribe({
            next: (_res: any) => {
              //console.log('Upload Response: ', _res);
              const control = this.clientForm.get('image');
              if (control) {
                control.setValue(_res.data.image);
              }

              this.profilePicLInk = `/public/files/${_res.data.image}`;
              this.loaderService.setLoading(false);

            },
            error: (_err: any) => {
              this.loaderService.setLoading(false);
              console.error("Upload Error: ", _err);

            }
          })

        } else {
          this.toastMessage.error("Max upload image size is 2 MB")
        }
      } else {
        this.toastMessage.error("Chosen image are not valid. Please select an image JPG, JPEG, PNG");
      }

      // console.log("Upload profile: ", _file, _fileExt)
    }
    console.groupEnd();

  }


}
