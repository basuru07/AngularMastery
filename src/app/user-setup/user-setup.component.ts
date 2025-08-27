import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      customerId: ['', Validators.required],
      membership: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
      this.userForm.reset();
    }
    else{
      Object.values(this.userForm.controls).forEach(control =>{
        if(control.invalid){
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf:true});
        }
      })
    }
  }
}