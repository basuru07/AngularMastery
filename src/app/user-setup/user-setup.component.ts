import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent implements OnInit {

  userForm!: FormGroup;
  isOver18: boolean | null = null; // add the validation 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: [null, Validators.required],
    });

    this.userForm.get('dob')?.valueChanges.subscribe((dob) =>{
      if(dob){
        this.calculateAgeUpdateForm(dob);
      }
    })
  }

  calculateAgeUpdateForm(dob: Date): void {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    this.isOver18 = age >= 18; 

    // Remove all conditional fields first
    this.removeConditionalFields();

    // Add fields based on age
    if (this.isOver18) {
      this.userForm.addControl('university', this.fb.control('', Validators.required));
      this.userForm.addControl('occupation', this.fb.control('', Validators.required));
      this.userForm.addControl('drivingLicense', this.fb.control('', Validators.required));
      this.userForm.addControl('email', this.fb.control('', [Validators.required, Validators.email]));
      this.userForm.addControl('contactNumber', this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')]));
    } else {
      this.userForm.addControl('schoolName', this.fb.control('', Validators.required));
      this.userForm.addControl('guardianName', this.fb.control('', Validators.required));
      this.userForm.addControl('guardianContact', this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')]));
      this.userForm.addControl('relationship', this.fb.control('', Validators.required));
    }
  }

  removeConditionalFields(): void {
    const fieldsToRemove = ['university', 'drivingLicense', 'email', 'contactNumber', 'schoolName', 'guardianName', 'guardianContact', 'relationship'];
    fieldsToRemove.forEach(field => {
      if (this.userForm.contains(field)) {
        this.userForm.removeControl(field);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
      this.userForm.reset();
      this.isOver18 = null;
      this.removeConditionalFields();
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