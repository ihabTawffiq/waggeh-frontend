import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showPass=false;
  showConfirmPass=false;
  password:string;
  confirmPassword:string;
  passwordIsMatch:boolean=true;
  signInFrom:FormGroup;

  constructor() {
    this.signInFrom = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required]),
 
    })
     
   }

  ngOnInit(): void {
    // this.signInFrom.
  }
  passwordMatch(){
    if(this.password && this.confirmPassword){
      if(this.password.toLowerCase()==this.confirmPassword.toLowerCase()){
        this.passwordIsMatch=true;
      }else{
        this.passwordIsMatch=false;
      }

    }
  }

}
