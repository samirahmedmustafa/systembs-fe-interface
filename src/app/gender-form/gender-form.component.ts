import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { City } from '../city/city.component';
import { Locality } from '../locality/locality.component';
import { GenericService } from '../service/generic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Condition } from '../condition/condition.component';
import { BuildingType } from '../building-type/building-type.component';
import { Gender } from '../gender/gender.component';

@Component({
  selector: 'app-gender-form',
  templateUrl: './gender-form.component.html',
  styleUrls: ['./gender-form.component.css']
})
export class GenderFormComponent {
  resource: string = "/api/genders"

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required)
  });

  ngAfterViewInit() {
  }

  ngOnInit() {

    if (this.data.ops === "edit")
      this.editForm();
  }

  constructor(
    private service: GenericService<Gender>,
    public dialogRef: MatDialogRef<GenderFormComponent>,
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
      (data: any) => {
        data = data
        this.dialogRef.close(data);
      },
      (error: any) => this.dialogRef.close(error)
    );
  }

  create() {
    this.service.create(this.resource, this.form.value).subscribe(
      (data: any) => {
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
