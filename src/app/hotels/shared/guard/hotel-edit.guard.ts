import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {HotelEditComponent} from "../../hotel-edit/hotel-edit.component";

@Injectable({
  providedIn: 'root'
})
export class HotelEditGuard implements CanDeactivate<HotelEditComponent> {
  canDeactivate(component: HotelEditComponent): boolean{
    if(component.hotelForm.dirty){
      const hotelName = component.hotelForm.get('hotelName')?.value || 'nouveau hotel';
      return confirm(`Voulez vous vraiment annuler les changements apporte a ${hotelName} ?`)
    }
    return true;
  }

}
