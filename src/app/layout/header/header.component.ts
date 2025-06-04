import { Component,OnInit,OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit,OnDestroy{
  isLoggedIn=false; //Estado local de autenticación
  private subscription:Subscription |null=null;

  constructor(private authService:AuthService){}

  ngOnInit(){
    //Subscriptor al estado de autenticación
    this.subscription=this.authService.isLoggedIn().subscribe((loggedIn)=>{
      this.isLoggedIn=loggedIn;
    })
  }
  logout(){
    this.authService.logout();  //Llamar al método del logout del servicio.
  }

  ngOnDestroy(){
    //Cancelar la subscripcion al destruir el componente.
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
