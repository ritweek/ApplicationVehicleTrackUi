import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  user: SocialUser | null;
  hasApiAccess = false;

  constructor(private router: Router,
    public socialAuthServive: SocialAuthService, private http: HttpClient) {

      this.user = null;
	this.socialAuthServive.authState.subscribe((user: SocialUser) => {
	  console.log(user);
	  if (user) {
		this.http.post<any>('https://localhost:5001/user/authenticate', { idToken: user.idToken }).subscribe((authToken: any) => {
            console.log(authToken);
            window.localStorage.setItem('bearer', authToken.authToken);					
        })		  
	  }
	  this.user = user;
	});
}

logout(): void {
this.socialAuthServive.signOut().then(() => this.router.navigate(['login']));
}

  ngOnInit(): void {
  }

}
