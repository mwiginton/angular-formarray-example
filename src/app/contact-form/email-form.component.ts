import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      // We use a FormArray for the email addresses
      contacts: this.formBuilder.array([this.createContactFormGroup()])
    });
  }

  createContactFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get contactControls() {
    return (this.contactForm.get('contacts') as FormArray).controls;
  }

  addContact() {
    const contacts = this.contactForm.get('contacts') as FormArray;
    contacts.push(this.createContactFormGroup());
  }

  removeContact(index: number) {
    const contacts = this.contactForm.get('contacts') as FormArray;
    contacts.removeAt(index);
  }

  submitForm() {
    if (this.contactForm.valid) {
      // Do something with the form data, e.g., send it to the server
      console.log(this.contactForm.value);
    } else {
      console.log("Form is invalid. Please fill in all required fields.");
    }
  }
}
