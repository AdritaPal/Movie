import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginuserService } from '../loginuser.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
 
  constructor(private loginuserservice: LoginuserService, private router: Router) { }

 

  ngOnInit(): void {
  }

  userLogin(){

    console.log(this.user)
    this.loginuserservice.loginUser(this.user).subscribe(data=>{
      alert("LOGIN SUCCESSFUL");
      this.router.navigate(['/home']);
    },error=>alert("SORRY!! PLEASE ENTER CORRECT USERID/PASSWORD COMBINATION"));
  }

  

}


