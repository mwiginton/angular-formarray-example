import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  emailForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      // We use a FormArray for the email addresses
      emails: this.formBuilder.array([this.createEmailFormGroup()])
    });
  }

  createEmailFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get emailControls() {
    return (this.emailForm.get('emails') as FormArray).controls;
  }

  addEmail() {
    const emails = this.emailForm.get('emails') as FormArray;
    emails.push(this.createEmailFormGroup());
  }

  removeEmail(index: number) {
    const emails = this.emailForm.get('emails') as FormArray;
    emails.removeAt(index);
  }

  submitForm() {
    if (this.emailForm.valid) {
      // Do something with the form data, e.g., send it to the server
      console.log(this.emailForm.value);
    } else {
      console.log("Form is invalid. Please fill in all required fields.");
    }
  }
}
