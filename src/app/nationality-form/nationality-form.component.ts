import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from '../state/state.component';
import { GenericService } from '../service/generic.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Nationality } from '../nationality/nationality.component';

@Component({
  selector: 'app-nationality-form',
  templateUrl: './nationality-form.component.html',
  styleUrls: ['./nationality-form.component.css']
})
export class NationalityFormComponent {

  resource: string = "/api/nationalities";

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
  });

  constructor(
    private service: GenericService<Nationality>,
    public dialogRef: MatDialogRef<NationalityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifier: NotifierService
  ) { }

  isCreate() {
    return this.data.ops === "create";
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

  update() {
    this.service.update(this.resource, this.form.value.id, this.form.value).subscribe(
      (data: any) => {
        data = data
        this.dialogRef.close(data);
      },
      (error) => this.dialogRef.close(error)
    );
  }

  onSubmit() {

    if (this.isCreate()) {
      this.create();
    } else {
      this.update();
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {

    if (this.data.ops === "edit") {
      this.form.patchValue(
        {
          id: this.data.item.id,
          name: this.data.item.name
        }
      );
    }
  }

}
