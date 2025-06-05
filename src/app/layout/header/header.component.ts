import { Component,OnInit,OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
<<<<<<< HEAD
import { NotificationsComponent } from "../../shared/notifications/notifications.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, NotificationsComponent],
=======

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
>>>>>>> af2e84d53eb7c9910ee79b72556d292593294f9b
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
