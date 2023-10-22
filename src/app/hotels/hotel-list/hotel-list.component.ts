import {Component, OnInit} from '@angular/core';
import {IHotel} from "../shared/model/hotel";
import {HotelListService} from "../shared/service/hotel-list.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
title:string = "Liste des hotels";
public showBadge:boolean = true;
public receivedRating: string | undefined;
private  _hotelFilter = 'mot';
public errorMessage! : string;
  public  hotels: IHotel[] = [];
  // private _hotelListService: HotelListService;

  public filteredHotel : IHotel[] = [];
  constructor(private hotelListService: HotelListService) { }

  public toggleBadge() :void {
    this.showBadge = !this.showBadge;
  }
  ngOnInit(): void {
    this.hotelListService.getHotels().subscribe({
      next:value => {
          this.hotels = value;
          this.filteredHotel = this.hotels;
      },
      error: err => this.errorMessage = err
    });
    this.hotelFilter = '';

  }

  public  get hotelFilter(): string {
    return this._hotelFilter;
  }

  public set hotelFilter(filter: string ){
    this._hotelFilter = filter;
    this.filteredHotel = this.hotelFilter ? this.filterHotels(this.hotelFilter):this.hotels;
  }

  private filterHotels(criteria: string): IHotel[]{
    criteria = criteria.toLowerCase();
    return this.hotels.filter(
      (hotel: IHotel) => hotel.hotelName.toLowerCase().indexOf(criteria) != -1
    );
  }

   public receiveRatingClicked(message: string) {
      this.receivedRating = message;
  }
}
