import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../user.model';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userId!: number;
  title!: string;
  isEdit!: boolean;
  hide: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=\S+$).{8,}$|^\*{8,}$/
        ),
      ]),
    });
  }

  ngOnInit(): void {
    if (this.userService.isEdit) {
      this.title = 'Edit';
      this.userId = this.route.snapshot.params['id'];
      this.isEdit = this.userService.isEdit;

      this.userService.getUser(this.userId).subscribe(
        (user: UserModel) => {
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: '********',
          });
        },
        (error: any) => {
          console.error('Error fetching user:', error);
        }
      );
    } else {
      this.title = 'Create';
    }
  }

  onBack() {
    this.router.navigate(['/dashboard/users/list']);
  }

  submitForm() {
    if (this.userForm.valid) {
      if (this.userService.isEdit) {
        this.userForm.value.password === '********'
          ? (this.userForm.value.password = '')
          : this.userForm.value.password;
        this.userService.updateUser(this.userId, this.userForm.value).subscribe(
          (response) => {
            this.openSnackBar("User has been successfully modified")
            this.router.navigate(['../../'], { relativeTo: this.route });
          },
          (error) => {
            console.log('Error:', error);
            this.openSnackBar('User was not successfully modified')
          }
        );
      } else {
        this.userService.addUser(this.userForm.value).subscribe(
          (response) => {
            console.log('User added:', response);
            this.openSnackBar("User has been successfully added")
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          (error) => {
            console.log('Error:', error);
            this.openSnackBar('User was not successfully added')
          }
        );
      }
    }
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }

}
