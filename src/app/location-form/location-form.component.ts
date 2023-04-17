import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { GenericService } from '../service/generic.service';
import { City } from '../city/city.component';
import { Neighbourhood } from '../neighbourhood/neighbourhood.component';
import { Locality } from '../locality/locality.component';
import { State } from '../state/state.component';
import { BuildingType } from '../building-type/building-type.component';
import { Condition } from '../condition/condition.component';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent {

  buildingTypeList: any[] = [];
  conditionList: any[] = [];
  cityList: any[] = [];
  neighbourhoodList: any[] = [];
  localityList: any[] = [];
  stateList: any[] = [];

  buildingTypes$: Observable<any[]> = this.buildingTypeService.getAll("/api/buildingTypes");
  conditions$: Observable<any[]> = this.conditionService.getAll("/api/conditions");
  neighbourhoods$: Observable<any[]> = this.neighbourhoodService.getAll("/api/neighbourhoods");
  localities$: Observable<any[]> = this.localityService.getAll("/api/localities");
  states$: Observable<any[]> = this.stateService.getAll("/api/states");
  cities$: Observable<any[]> = this.cityService.getAll("/api/cities");

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    number: new FormControl('', Validators.required),
    blkNo: new FormControl(),
    ownerID: new FormControl('',Validators.required),
    ownerName: new FormControl('', Validators.required),
    ownerPhoneNo: new FormControl('', Validators.required),
    delegateId: new FormControl(),
    delegateName: new FormControl(),
    delegatePhoneNo: new FormControl(),
    buildingType: new FormControl('', Validators.required),
    condition: new FormControl('', Validators.required),
    citizens: new FormControl(),
    city: new FormControl('', Validators.required),
    neighbourhood: new FormControl('', Validators.required),
    locality: new FormControl(),
    state: new FormControl('', Validators.required)
  });
  resource: string = "/api/locations";

  ngAfterViewInit() {
    this.buildingTypes$.subscribe((data) => this.buildingTypeList = data, (error) => this.notifier.notify("error", error.message));
    this.conditions$.subscribe((data) => this.conditionList = data, (error) => this.notifier.notify("error", error.message));
    this.neighbourhoods$.subscribe((data) => this.neighbourhoodList = data, (error) => this.notifier.notify("error", error.message));
    this.localities$.subscribe((data) => this.localityList = data, (error) => this.notifier.notify("error", error.message));
    this.states$.subscribe((data) => this.stateList = data, (error) => this.notifier.notify("error", error.message));
    this.cities$.subscribe((data) => this.cityList = data, (error) => this.notifier.notify("error", error.message));
  }

  ngOnInit() {

    if (this.data.ops === "edit")
      this.editForm();
  }

  constructor(
    private cityService: GenericService<City>,
    private stateService: GenericService<State>,
    private localityService: GenericService<Locality>,
    private neighbourhoodService: GenericService<Neighbourhood>,
    private buildingTypeService: GenericService<BuildingType>,
    private conditionService: GenericService<Condition>,
    private service: GenericService<Location>,
    public dialogRef: MatDialogRef<LocationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifier: NotifierService
  ) { }

  ngOnDestroy(): void {

  }

  editForm() {
    this.form.patchValue(
      {
        id: this.data.item.id,
        number: this.data.item.number,
        blkNo: this.data.item.blkNo,
        ownerID: this.data.item.ownerID,
        ownerName: this.data.item.ownerName,
        ownerPhoneNo: this.data.item.ownerPhoneNo,
        delegateId: this.data.item.delegateId,
        delegateName: this.data.item.delegateName,
        delegatePhoneNo: this.data.item.delegatePhoneNo,
        buildingType: this.data.item.buildingType,
        condition: this.data.item.condition,
        citizens: this.data.item.citizens,
        city: this.data.item.city,
        neighbourhood: this.data.item.neighbourhood,
        locality: this.data.item.locality,
        state: this.data.item.state
      }
    );
  }

  isCreate() {
    return this.data.ops === "create";
  }

  onSubmit() {

    if (this.isCreate()) {
      this.create();
    } else {
      this.update();
    }
  }

  update() {
    this.service.update(this.resource, this.form.value.id, this.form.value).subscribe(
      (data: any) => {
        data = data
        this.dialogRef.close(data);
      },
      (error) => this.dialogRef.close(error)
    );
  }

  create() {
    this.service.create(this.resource, this.form.value).subscribe(
      (data: any) => {
        data = data
        this.dialogRef.close(data);
      },
      (error) => this.dialogRef.close(error)
    );
  }

  cancel() {
    this.dialogRef.close(false);
  }

}