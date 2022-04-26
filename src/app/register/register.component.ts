import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RegisteruserService } from '../registeruser.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  user:User = new User();
  
  constructor(private registerservice: RegisteruserService, private router: Router) { }

  ngOnInit(): void {
  }

  userRegister(){
    console.log(this.user)
    this.registerservice.registeruser(this.user).subscribe(data=>{
      alert("Successfully Registered!!!");
      this.router.navigate(['/login']);
    },error=>alert("Sorry Not Registered"));
    
  }

}
