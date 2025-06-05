import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
<<<<<<< HEAD
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/regions']);
      },
      error: (err) => {
        this.error = 'Usuario y contraseña inválido';
      },
    });
  }
=======
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username='';
  password='';
  error:string|null=null;

  constructor(private auth:AuthService, private router:Router) {}

    onSubmit(){
      this.auth.login(this.username,this.password).subscribe({
        next: (res)=>{
          this.auth.setToken(res.token);
          this.router.navigate(['/regions']);
        },
        error: (err)=>{
          this.error='Usuario y contraseña inválido';
        },
      });
    }
>>>>>>> af2e84d53eb7c9910ee79b72556d292593294f9b
}
