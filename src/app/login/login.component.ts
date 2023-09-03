import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider ,GoogleLoginProvider} from "@abacritt/angularx-social-login";
import { ApiServicesService } from 'app/network/apiService.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  @ViewChild('g_id_onload', {static: false}) googleLogin: ElementRef;
  showPass=false;
  email:any;
  password:any;
  loginForm = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  submitted=false;
  constructor( private toastr: ToastrService,private _formBuilder: FormBuilder, private authService: SocialAuthService,private apiService:ApiServicesService) { }
  get loginFormControl() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      // let socialUser = user;
      // this.isLoggedin = user != null;
      // console.log("socialUser",user);
      this.loginWithGoogle(user);
    });
  }
  // loginWithGoogle(): void {
  //   console.log("loginWithGoogleloginWithGoogleloginWithGoogle")
  //   // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //   let el: HTMLElement = this.googleLogin.nativeElement;
  //   el.click();
  //   // document.getElementById("")
  //   // document.addEventListener()
  //   // console.log("this.googleLogin.nativeElement",this.googleLogin.nativeElement);
  //   // this.googleLogin.nativeElement.click();
  // }
  clicked(){
    console.log("clicked()clicked()clicked()");
    // this.authenticateUser(GoogleLoginProvider.PROVIDER_ID);
  }
  public authenticateUser(clientId:any) {
    let auth2 : any;
    let self =this;
    let result : any;
    gapi.load('auth2', function () {
      auth2 = gapi
        .auth2
        .init({client_id: clientId, scope: 'profile email'});
      //Login button reference
      let element : any = document.getElementById('google-login-button');
      auth2.attachClickHandler(element, {}, function (googleUser:any) {
        //Getting profile object
        let profile = googleUser.getBasicProfile();
        console.log("profileprofileprofile",profile)
        console.log("googleUser",googleUser)
        self.loginWithGoogle(profile);
        //Setting data to localstorage.
        // localStorage.setItem('token', googleUser.getAuthResponse().id_token);
        // localStorage.setItem('image', profile.getImageUrl());
        // localStorage.setItem('name', profile.getName());
        // localStorage.setItem('email', profile.getEmail());
        // Alternatively you can create an object and return it like that - result = {
        // token: googleUser.getAuthResponse().id_token, name: profile.getName(), image:
        // profile.getImageUrl(), email: profile.getEmail(), };
        // callback.emit(googleUser);
      }, function (error:any) {
        // alert(JSON.stringify(error, undefined, 2));
      });
    });
  }

  loginWithGoogle(profileData:any){
    console.log("profileData",profileData);
    let data={
      "email": profileData.email,
      "firstName": profileData.firstName,
      "role": "ROLE_CLIENT",
      "photoUrl":profileData.photoUrl
  };
  this.apiService.loginGoogle(data).subscribe(
    (result)=>{
      console.log("result",result);
    },(err)=>{
      console.log("err",err);
    }
  )

  }
  login(){
    this.submitted=true;
    let data= {
      "email": this.email,
      "password": this.password
  }
  // this.toastr.error("cccddd");
  console.log("this.loginForm",this.loginForm)
  if(this.loginForm.valid){

    this.apiService.login(data).subscribe(
      (res:any)=>{
        console.log("res",res);
        if(res['success']){
  this.toastr.success("logged successfully ...");

        }else{
  this.toastr.error("Ivalid email or  password !");

        }
      }
    )
  }

  }

}
