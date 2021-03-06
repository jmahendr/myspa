import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Comment } from '../shared/comment';

import 'rxjs/add/operator/switchMap';
import { keyframes } from '@angular/core/src/animation/dsl';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishCopy=null;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  userComment: Comment;
  errMess: string;
  visibility = 'shown';
  @ViewChild(FormGroupDirective) commentFormDirective;


  commentFormErrors = {
    'comment': '',
    'author': ''
  };

  commentFormValidationMessages = {
    'comment': {
      'required': 'Message is a required field'
    },
    'author': {
      'required': 'Author Name is a required field',
      'minlength': 'Author Name should be atleast 2 characters long'
    }
  };

  constructor( private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL 
) {
    this.createCommentForm();
   }

  ngOnInit() {
    this.dishservice.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds,
    errmess => {this.errMess = <any>errmess; });

    this.route.params
    .switchMap((params: Params) => {this.visibility='hidden'; return this.dishservice.getDish(+params['id']);})
    .subscribe(dish => {
                        this.dish = dish; 
                        this.dishCopy = dish;
                        this.setPrevNext(dish.id);
                        this.visibility = 'shown';
                      });
  }

  goBack() {
    this.location.back();
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2)]]
      });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if(!this.commentForm) { return; };

    this.userComment = undefined;

    const cmtFrm = this.commentForm;

    for(const field in this.commentFormErrors) {
      //clear previous error messages
      this.commentFormErrors[field] = '';

      //get form element (i.e. FormControl)
      const control = cmtFrm.get(field);
      if(control &&
          control.dirty &&
          control.invalid) {
            const messages = this.commentFormValidationMessages[field];
            for(const key in control.errors) {
              this.commentFormErrors[field] += messages[key] + ' ';
            }
          }
      
      if(this.commentForm.valid){
        this.userComment = this.commentForm.value;
      }
    }
  }
  
  onCommentSubmit() {
    this.userComment = this.commentForm.value;
    this.userComment['date'] = new Date().toISOString();
    

    this.dishCopy.comments.push(this.userComment);
    this.dishCopy.save()
    .subscribe(dish => {this.dish = dish; console.log(JSON.stringify(dish))});
    this.userComment = undefined;

    this.commentFormErrors = {
      'comment': '',
      'author': ''
    };
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: ''
    });

    this.commentFormDirective.resetForm();
    this.commentFormErrors = {
      'comment': '',
      'author': ''
    };
    
    
  }
}
