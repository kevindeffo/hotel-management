import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HotelListService} from "../shared/service/hotel-list.service";
import {IHotel} from "../shared/model/hotel";

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  public hotel: IHotel | undefined = <IHotel>{};

  constructor(private route: ActivatedRoute, private hotelListService: HotelListService, private router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    const id: number = +this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.hotelListService.getHotels().subscribe((hotels: IHotel[]) => {
      this.hotel = hotels.find(hotel => hotel.id == id);
    })
  }

  public backToList() {
    this.router.navigate(['/hotels'])
  }
}
