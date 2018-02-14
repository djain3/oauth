import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vk oauth';
  friends = [];


  constructor( private http: Http, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      let code = params['code'];
      if (code) {
        this.http
          .get('getToken/'+code)
          .toPromise()
          .then((response) => {
            this.router.navigateByUrl('/');
            localStorage.setItem('user', JSON.parse(response['_body']).user_id);
          })
          .catch((err) => {
            console.log('err');
            this.router.navigateByUrl('/');
          })
      }

      let user = localStorage.getItem('user');
      if(user) {

        this.http
          .get('isUsed/'+user)
          .toPromise()
          .then((response) => {
            console.log('iu', JSON.parse(response['_body']));
            if(JSON.parse(response['_body']).response==1) {
              this.http
                .get('getFriends/'+user)
                .toPromise()
                .then((response) => {
                  this.friends = JSON.parse(response['_body']).response.items;
                })
                .catch((err) => {
                  console.log('err', err);
                })
            }
          })
          .catch((err) => {
            console.log('err', err);
          })
      }
    });
  }

  auth() {

    console.log('auth');
    this.http
      .get('getToken')
      .toPromise()
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log('err')
      })
  }
}
