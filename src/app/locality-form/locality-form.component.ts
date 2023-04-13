import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { City } from '../city/city.component';
import { Locality } from '../locality/locality.component';
import { GenericService } from '../service/generic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-locality-form',
  templateUrl: './locality-form.component.html',
  styleUrls: ['./locality-form.component.css']
})
export class LocalityFormComponent {

  dropdownList: City[] = [];

  states$: Observable<City[]> = this.stateService.getAll("/api/cities");

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    city: new FormControl(),
  });
  resource: string = "/api/localities";

  ngAfterViewInit() {
    this.states$.subscribe(
      (data) => this.dropdownList = data,
      (error) => this.notifier.notify("error", error.message)
    );
  }

  ngOnInit() {

    if (this.data.ops === "edit")
      this.editForm();
  }

  constructor(
    private stateService: GenericService<City>,
    private service: GenericService<Locality>,
    public dialogRef: MatDialogRef<LocalityFormComponent>,
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
      this.create();
    } else {
      this.update();
    }
  }

  update() {
    this.service.update(this.resource, this.form.value.id, this.form.value).subscribe(
      (data: Locality) => {
        data = data
        this.dialogRef.close(data);
      },
      (error: any) => this.dialogRef.close(error)
    );
  }

  create() {
    this.service.create(this.resource, this.form.value).subscribe(
      (data: Locality) => {
        data = data
        this.dialogRef.close(data);
      },
      (error: any) => this.dialogRef.close(error)
    );
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
