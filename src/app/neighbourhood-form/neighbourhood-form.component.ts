import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Neighbourhood } from '../neighbourhood/neighbourhood.component';
import { Locality } from '../locality/locality.component';
import { GenericService } from '../service/generic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-neighbourhood-form',
  templateUrl: './neighbourhood-form.component.html',
  styleUrls: ['./neighbourhood-form.component.css']
})
export class NeighbourhoodFormComponent {

  dropdownList: Locality[] = [];

  localities$: Observable<Locality[]> = this.localityService.getAll("/api/localities");

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    locality: new FormControl(),
  });

  ngAfterViewInit() {
    this.localities$.subscribe(
      (data: Locality[]) => this.dropdownList = data,
      (error: any) => this.notifier.notify("error", error.message)
    );
  }

  ngOnInit() {
    if (this.data.ops === "edit")
      this.editForm();
  }

  constructor(
    private localityService: GenericService<Locality>,
    private service: GenericService<Neighbourhood>,
    public dialogRef: MatDialogRef<NeighbourhoodFormComponent>,
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
    this.service.update("/api/neighbourhoods", this.form.value.id, this.form.value).subscribe(
      (data: Neighbourhood) => {
        data = data
        this.dialogRef.close(data);
      },
      (error: any) => this.dialogRef.close(error)
    );
  }

  create() {
    this.service.create("/api/neighbourhoods", this.form.value).subscribe(
      (data: Neighbourhood) => {
        data = data
        this.dialogRef.close(data);
      },
      (error: any) => this.dialogRef.close(error)
    );
  }

  cancel() {
    this.dialogRef.close(false);
  }

  // compareLocality(op1: Locality, op2: Locality) {
  //   return op1.name === op2.name;
  // }

}
