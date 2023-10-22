import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IHotel} from "../shared/model/hotel";
import {ActivatedRoute, Router} from "@angular/router";
import {HotelListService} from "../shared/service/hotel-list.service";
import {GlobalGenericValidator} from "../shared/validators/global-generic.validator";
// import confirm from "$GLOBAL$";

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit, AfterViewInit {

  public hotelForm!: FormGroup;
  public hotel: IHotel = <IHotel>{};
  public pageTitle! : string;
  public errorMessage! : string;
  public  formErrors : {[key:string]:string} = {};

  private globalGenericValidator! : GlobalGenericValidator;

  private validationMessage: {[key : string]: {[key:string]:string} } = {
    hotelName: {
      required: 'Le champ Nom de l\'hotel est obligatoire.'
    },
    price: {
      require: 'Le prix de l\'hotel est obligatoire.'
    }
  }
  constructor(private fb: FormBuilder, private route: ActivatedRoute,private hotelListService: HotelListService,private router: Router) { }

  private initForm(): void{
      this.hotelForm = this.fb.group({
        hotelName: ['', Validators.required],
        price: ['', Validators.required],
        rating: [''],
        description: [''],
        tags: this.fb.array([])
      })
  }

  ngOnInit(): void {
    // @ts-ignore
    // const id: number = +this.route.snapshot.paramMap.get('id');

    this.globalGenericValidator = new GlobalGenericValidator(this.validationMessage);

    this.route.paramMap.subscribe(
      params => {
        // @ts-ignore
        const id = +params.get('id')
        console.log(id)
        this.initForm();
        if(id != 0){
          this.getSelectedHotel(id)
          this.pageTitle = `Editer l'hotel`;
        }else {
          this.hotel.id = 0;
          this.pageTitle = "Ajouter un hotel";
        }
      }
    )
    // console.log(id);
    // this.initForm(id);
  }

  ngAfterViewInit(): void {
    this.hotelForm.valueChanges.subscribe(()=>{
      console.log("form change");
      this.formErrors = this.globalGenericValidator.createErrorMessage(this.hotelForm);
      console.log("errors:", this.formErrors);
    })

  }

  public getSelectedHotel(id:number) {
      this.hotelListService.getHotelById(id).subscribe({
        next:value => {
          console.log('before value')
          console.log(value)
          if (value) {
            this.hotel = value;
          }
          if(this.hotel != undefined){
            this.displayHotel(this.hotel)
          }
        }
      });
  }

  public displayHotel(hotel: IHotel):void{
    this.hotelForm.patchValue({
      hotelName: this.hotel?.hotelName,
      price: this.hotel?.price,
      rating: this.hotel?.rating,
      description: this.hotel?.description
    })

    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []))
  }

  saveHotel() {
    console.log(this.hotel)
    if(this.hotelForm.valid){
      if(this.hotelForm.dirty){
        const hotel: IHotel = {
          ...this.hotel,
            ...this.hotelForm.value
        }

        if (hotel.id == 0){
          this.hotelListService.createHotel(hotel).subscribe(
            {
              next: ()=> this.saveCompleted(),
              error: (err) => this.errorMessage = err
            }
          )

        } else {
          this.hotelListService.updateHotel(hotel).subscribe({
            next:()=>this.saveCompleted(),
            error: (err) => this.errorMessage = err
            }
          )
        }
      }
    }
    console.log(this.hotelForm.value);
  }

  public  deleHotel(){
    if (confirm(`Voulez vous vraiment supprimer ${this.hotel.hotelName} ?`)){
      this.hotelListService.deleteHotel(this.hotel.id).subscribe({
        next:() => this.saveCompleted()
      })
    }
  }

  public saveCompleted():void{
    this.hotelForm.reset();
    this.router.navigate(['/hotels'])
  }

  public get tags(): FormArray{
    return this.hotelForm.get('tags') as FormArray;
  }

  public addTags(): void{
    this.tags.push(new FormControl());
  }

  public deleteTags(index: number): void{
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  hideError() {
    this.errorMessage = "";
  }


}
