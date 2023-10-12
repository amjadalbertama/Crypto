import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean;
  isHome!: boolean;
  auth_name: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.isLoggedIn = authService.isLoggedIn;
    this.auth_name = authService.getName();
    console.log(this.auth_name)
  }

  ngOnInit(): void {
      window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (!header) return;
        const topPage = window.pageYOffset < 100;
        header.classList.toggle('colored', !topPage);
        header.classList.toggle('transparent', topPage);
      });

      this.isHome = this.router.url === '/home';
  }

  logOutUser(): void {
    // console.error("tess")
    this.authService.logout().subscribe(() => {
      window.location.reload();
      this.router.navigate(['/home']);
      this.toastr.success('Logout Success');
    }, (error) => {
      console.error(error); 
    });
  }
}
