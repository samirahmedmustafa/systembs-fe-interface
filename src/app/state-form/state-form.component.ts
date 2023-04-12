import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from '../state/state.component';
import { GenericService } from '../service/generic.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.css']
})
export class StateFormComponent {
  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
  });

  constructor(
    private service: GenericService<State>,
    public dialogRef: MatDialogRef<StateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifier: NotifierService
  ) { }

  isCreate() {
    return this.data.ops === "create";
  }

  onSubmit() {

    if (this.isCreate()) {
      this.service.create("/api/states", this.form.value).subscribe(
        (data: State) => {
          data = data
          this.dialogRef.close(data);
        },
        (error) => this.dialogRef.close(error)
      );
    } else {
      this.service.update("/api/states", this.form.value.id, this.form.value).subscribe(
        (data: State) => {
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

  ngOnInit(): void {

    if (this.data.ops === "edit") {
      this.form.patchValue(
        {
          id: this.data.state.id,
          name: this.data.state.name
        }
      );
    }
  }

}
