import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericService } from '../service/generic.service';
import { City } from '../city/city.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Observable, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { State } from '../state/state.component';
import { MatSelect } from '@angular/material/select';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit, AfterViewInit, OnDestroy {

  // dropdownList: {item_id: number, item_text: string}[] = [];
  dropdownList: State[] = [];
  selectedItems: {item_id: number, item_text: string}[] = [];
  dropdownSettings:IDropdownSettings = {};

  states$: Observable<State[]> = this.stateService.getAll("/api/states");

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    state: new FormControl(),
  });

  ngAfterViewInit() {
        this.states$.subscribe(
      (data) => {
        this.dropdownList = data
        console.log(this.dropdownList)
      },
      (error) => this.notifier.notify("error", error.message)
    );
  }

  ngOnInit() {
    
console.log(this.data.ops)
    if (this.data.ops === "edit")
      this.editForm();

    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  constructor(
    private stateService: GenericService<State>,
    private service: GenericService<City>,
    public dialogRef: MatDialogRef<CityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifier: NotifierService
  ) { }

  ngOnDestroy(): void {

  }

  editForm() {
    this.form.patchValue(
      {
        id: this.data.item.id,
        name: this.data.item.name,
        state: this.data.item.state
      }
    );
  }

  isCreate() {
    return this.data.ops === "create";
  }

  onSubmit() {

    if (this.isCreate()) {
      this.service.create("/api/cities", this.form.value).subscribe(
        (data: City) => {
          data = data
          this.dialogRef.close(data);
        },
        (error) => this.dialogRef.close(error)
      );
    } else {
      this.service.update("/api/cities", this.form.value.id, this.form.value).subscribe(
        (data: City) => {
          data = data
          this.dialogRef.close(data);
        },
        (error) => this.dialogRef.close(error)
      );
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }

  compareState(op1: State, op2: State) {
    return op1.name === op2.name;
  }

}
