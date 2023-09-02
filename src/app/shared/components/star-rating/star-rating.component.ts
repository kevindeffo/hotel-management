import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges{

  @Input()
  public rating:number = 2;
  public starWidth!: number ;

  @Output()
  public starRatingClicked: EventEmitter<string> = new EventEmitter<string>();
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.starWidth = this.rating * 125/5
  }

  public sendRating() {
    this.starRatingClicked.emit(`la note est de ${this.rating}`);
  }
}
