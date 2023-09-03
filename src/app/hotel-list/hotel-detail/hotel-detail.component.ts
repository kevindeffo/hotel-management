import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HotelListService} from "../hotel-list.service";
import {IHotel} from "../hotel";

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  public hotel: IHotel | undefined = <IHotel>{};

  constructor(private route: ActivatedRoute, private hotelListService: HotelListService) { }

  ngOnInit(): void {
    // @ts-ignore
    const id: number = +this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.hotelListService.getHotels().subscribe((hotels: IHotel[]) => {
      this.hotel = hotels.find(hotel => hotel.hotelId == id);
      console.log(this.hotel);
    })
  }

}
