import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, visibility, expand } from '../animations/app.animation';

import { FeedbackService } from "../services/feedback.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand()
    ]
})
export class ContactComponent implements OnInit {
 
  feedbackForm: FormGroup;
  @ViewChild(FormGroupDirective) feedbackFormDirective;
  //view https://github.com/angular/material2/issues/4190 on resetForm() usage.

  feedback: Feedback;
  contactType = ContactType;
  retFeedback = {};
  formVisibility='shown';
  spinnerVisibility='hidden';
  postConfirmationVisibility='hidden';
  submitted = false;
  

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm) {return;}

    const form = this.feedbackForm;

    for( const field in this.formErrors) {
      //clear previous error messages
      this.formErrors[field] = '';
      //get form element(control)
      const control = form.get(field);
      if(control && control.dirty && control.invalid) {
        const messages = this.validationMessages[field];
        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        } 
      } 
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    //console.log(this.feedback);
    this.formVisibility = 'hidden';
    this.spinnerVisibility = 'shown';
    this.feedbackService.submitFeedback(this.feedback)
    .subscribe(data => {
        //var key = 'id';
        this.retFeedback = data;
        this.spinnerVisibility='hidden';
        this.postConfirmationVisibility='shown';
        this.submitted = true;
        setTimeout(() => {
          this.submitted = false;
          this.postConfirmationVisibility='hidden';
          this.formVisibility='shown';
        }, 5000);
        
        /*this.feedbackService.getFeedback(data[key])
          .subscribe(fbr => {
            this.retFeedback = fbr;
            console.log('output 1' + JSON.stringify(this.retFeedback));
            console.log('output 2' + JSON.stringify(data[key]));
            }); */
      },
        errmess => {console.log(errmess)});
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }
}
