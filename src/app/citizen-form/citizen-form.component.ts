import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericService } from '../service/generic.service';
import { City } from '../city/city.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Observable, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { State } from '../state/state.component';
import { Gender } from '../gender/gender.component';
import { Support } from '../support/support.component';
import { Qualification } from '../qualification/qualification.component';
import { Medicine } from '../medicine/medicine.component';
import { Disease } from '../disease/disease.component';
import { Disability } from '../disability/disability.component';
import { Profession } from '../profession/profession.component';
import { Gas } from '../gas/gas.component';
import { Nationality } from '../nationality/nationality.component';
import { School } from '../school/school.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-citizen-form',
  templateUrl: './citizen-form.component.html',
  styleUrls: ['./citizen-form.component.css']
})
export class CitizenFormComponent implements AfterViewInit {

  dropdownSettings:IDropdownSettings = {};

  schoolsList: any[] = [];
  gendersList: any[] = [];
  gasesList: any[] = [];
  medicinesList: any[] = [];
  diseasesList: any[] = [];
  nationalitiesList: any[] = [];
  supportsList: any[] = [];
  disabilitiesList: any[] = [];
  qualificationsList: any[] = [];
  locationsList: any[] = [];
  professionsList: any[] = [];

  nationalities$: Observable<any[]> = this.genderService.getAll("/api/nationalities");
  genders$: Observable<any[]> = this.genderService.getAll("/api/genders");
  professions$: Observable<any[]> = this.professionService.getAll("/api/professions");
  medicines$: Observable<any[]> = this.medicineService.getAll("/api/medicines");
  diseases$: Observable<any[]> = this.diseaseService.getAll("/api/diseases");
  gases$: Observable<any[]> = this.gasService.getAll("/api/gases");
  qualifications$: Observable<any[]> = this.qualificationService.getAll("/api/qualifications");
  supports$: Observable<any[]> = this.supportService.getAll("/api/supports");
  disabilities$: Observable<any[]> = this.disabilityService.getAll("/api/disabilities");
  locations$: Observable<any[]> = this.locationService.getAll("/api/locations");
  schools$: Observable<any[]> = this.schoolService.getAll("/api/schools");

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    phoneNo: new FormControl(),
    dateOfBirth: new FormControl(),
    nationalNo: new FormControl(),
    isDisabled: new FormControl(),
    skills: new FormControl(),
    isSupportEligible: new FormControl(false),
    isGainingSupport: new FormControl(false),
    isDeceased: new FormControl(),
    buildAddressDetails: new FormControl(),
    location: new FormControl(),
    nationality: new FormControl(),
    school: new FormControl(),
    qualification: new FormControl(),
    gender: new FormControl(),
    supports: new FormControl(),
    medicines: new FormControl(),
    diseases: new FormControl(),
    gases: new FormControl(),
    disabilities: new FormControl(),
    professions: new FormControl(),
  });
  resource: string = "/api/citizens";

  ngAfterViewInit() {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.nationalities$.subscribe((data) => this.nationalitiesList = data,(error) => this.notifier.notify("error", error.message));
    this.schools$.subscribe((data) => this.schoolsList = data,(error) => this.notifier.notify("error", error.message));
    this.gases$.subscribe((data) => this.gasesList = data,(error) => this.notifier.notify("error", error.message));
    this.genders$.subscribe((data) => this.gendersList = data,(error) => this.notifier.notify("error", error.message));
    this.professions$.subscribe((data) => this.professionsList = data,(error) => this.notifier.notify("error", error.message));
    this.medicines$.subscribe((data) => this.medicinesList = data,(error) => this.notifier.notify("error", error.message));
    this.diseases$.subscribe((data) => this.diseasesList = data,(error) => this.notifier.notify("error", error.message));
    this.nationalities$.subscribe((data) => this.nationalitiesList = data,(error) => this.notifier.notify("error", error.message));
    this.qualifications$.subscribe((data) => this.qualificationsList = data,(error) => this.notifier.notify("error", error.message));
    this.disabilities$.subscribe((data) => this.disabilitiesList = data,(error) => this.notifier.notify("error", error.message));
    this.locations$.subscribe((data) => this.locationsList = data,(error) => this.notifier.notify("error", error.message));
    this.supports$.subscribe((data) => this.supportsList = data,(error) => this.notifier.notify("error", error.message));

  }

  ngOnInit() {

    if (this.data.ops === "edit")
      this.editForm();
  }

  constructor(
    private genderService: GenericService<Gender>,
    private supportService: GenericService<Support>,
    private qualificationService: GenericService<Qualification>,
    private medicineService: GenericService<Medicine>,
    private diseaseService: GenericService<Disease>,
    private disabilityService: GenericService<Disability>,
    private professionService: GenericService<Profession>,
    private gasService: GenericService<Gas>,
    private schoolService: GenericService<School>,
    private locationService: GenericService<Location>,
    private service: GenericService<City>,
    public dialogRef: MatDialogRef<CitizenFormComponent>,
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

  // compareState(op1: State, op2: State) {
  //   return op1.name === op2.name;
  // }

}