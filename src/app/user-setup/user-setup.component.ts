import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent implements OnInit {

  userForm!: FormGroup;
  isOver18: boolean | null = null; // add the validation

  constructor(private fb: FormBuilder, private router: Router) { }

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
    const fieldsToRemove = ['university', 'occupation', 'drivingLicense', 'email', 'contactNumber', 'schoolName', 'guardianName', 'guardianContact', 'relationship'];
    fieldsToRemove.forEach(field => {
      if (this.userForm.contains(field)) {
        this.userForm.removeControl(field);
      }
    });
  }

  // Handle Enter key navigation with validation
  onEnterKeyPressed(event: KeyboardEvent, fieldName: string): void {
    event.preventDefault();

    const currentControl = this.userForm.get(fieldName);

    if (currentControl) {
      // Mark field as touched and dirty to trigger validation display
      currentControl.markAsTouched();
      currentControl.markAsDirty();
      currentControl.updateValueAndValidity();

      // If current field is invalid, don't move to next field
      if (currentControl.invalid) {
        return; // Stay on current field to show error
      }
    }

    // Move to next field if current field is valid
    this.focusNextField(event.target as HTMLElement);
  }

  // Focus next field logic
  private focusNextField(currentElement: HTMLElement): void {
    const form = currentElement.closest('form');
    if (!form) return;

    // Get all focusable elements in the form
    const focusableElements = form.querySelectorAll(
      'input:not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]):not([readonly]), nz-date-picker, nz-radio-group, button:not([disabled])'
    );

    const focusableArray = Array.from(focusableElements) as HTMLElement[];

    // Find current element index
    let currentIndex = -1;
    for (let i = 0; i < focusableArray.length; i++) {
      const element = focusableArray[i];
      if (element === currentElement || element.contains(currentElement)) {
        currentIndex = i;
        break;
      }
    }

    // Move to next focusable element
    if (currentIndex > -1 && currentIndex < focusableArray.length - 1) {
      const nextElement = focusableArray[currentIndex + 1];
      this.setFocusOnElement(nextElement);
    }
  }

  // Handle different element types for focus
  private setFocusOnElement(element: HTMLElement): void {
    setTimeout(() => {
      if (element.tagName === 'NZ-DATE-PICKER') {
        const input = element.querySelector('input');
        if (input) input.focus();
      } else if (element.tagName === 'NZ-RADIO-GROUP') {
        const firstRadio = element.querySelector('input[type="radio"]');
        if (firstRadio) (firstRadio as HTMLElement).focus();
      } else if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
        element.focus();
      } else {
        // For complex components, try to find the input inside
        const input = element.querySelector('input, select, textarea');
        if (input) (input as HTMLElement).focus();
        else element.focus();
      }
    }, 50); // Small delay to ensure DOM is ready
  }

  // NEW METHOD: Check if field should show error (optional helper)
  shouldShowError(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // NEW METHOD: Get specific error message (optional helper)
  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['pattern']) {
        if (fieldName.includes('contact') || fieldName.includes('contactNumber')) {
          return 'Please enter a valid 10-digit phone number';
        }
        return 'Please enter a valid format';
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
      this.router.navigate(['/profile-component'],{queryParams: this.userForm.value})
      this.userForm.reset();
      this.isOver18 = null;
      this.removeConditionalFields();
    }
    else{
      Object.values(this.userForm.controls).forEach(control =>{
        if(control.invalid){
          control.markAsTouched(); // Add this line
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf:true}); // recheck the validation for that fields
        }
      })
    }
  }
}
