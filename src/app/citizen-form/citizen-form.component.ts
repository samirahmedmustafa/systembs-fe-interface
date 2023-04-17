import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericService } from '../service/generic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Observable, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { Gender } from '../gender/gender.component';
import { Support } from '../support/support.component';
import { Qualification } from '../qualification/qualification.component';
import { Medicine } from '../medicine/medicine.component';
import { Disease } from '../disease/disease.component';
import { Disability } from '../disability/disability.component';
import { Profession } from '../profession/profession.component';
import { Gas } from '../gas/gas.component';
import { School } from '../school/school.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Location } from '../location/location.component';
import { Citizen } from '../citizen/citizen.component';

@Component({
  selector: 'app-citizen-form',
  templateUrl: './citizen-form.component.html',
  styleUrls: ['./citizen-form.component.css']
})
export class CitizenFormComponent implements AfterViewInit {

  dropdownSettings: IDropdownSettings = {};

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
    phoneNo: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    nationalNo: new FormControl('', Validators.required),
    isDisabled: new FormControl(),
    skills: new FormControl(),
    isSupportEligible: new FormControl(),
    isGainingSupport: new FormControl(),
    isDeceased: new FormControl(),
    buildAddressDetails: new FormControl(),
    location: new FormControl(),
    nationality: new FormControl(null, Validators.required),
    school: new FormControl(),
    qualification: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    supports: new FormControl(),
    medicines: new FormControl(),
    diseases: new FormControl(),
    gases: new FormControl(),
    disabilities: new FormControl(),
    professions: new FormControl(),
  });
  resource: string = "/api/citizens";

  ngAfterViewInit() {

    // this.supportsList = [
    //   {
    //     "id": 2,
    //     "name": "UN"
    //   },
    //   {
    //     "id": 3,
    //     "name": "UNICEF"
    //   }
    // ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,

    };

    this.nationalities$.subscribe((data) => this.nationalitiesList = data, (error) => this.notifier.notify("error", error.message));
    this.schools$.subscribe((data) => this.schoolsList = data, (error) => this.notifier.notify("error", error.message));
    this.gases$.subscribe((data) => this.gasesList = data, (error) => this.notifier.notify("error", error.message));
    this.genders$.subscribe((data) => this.gendersList = data, (error) => this.notifier.notify("error", error.message));
    this.professions$.subscribe((data) => this.professionsList = data, (error) => this.notifier.notify("error", error.message));
    this.medicines$.subscribe((data) => this.medicinesList = data, (error) => this.notifier.notify("error", error.message));
    this.diseases$.subscribe((data) => this.diseasesList = data, (error) => this.notifier.notify("error", error.message));
    this.nationalities$.subscribe((data) => this.nationalitiesList = data, (error) => this.notifier.notify("error", error.message));
    this.qualifications$.subscribe((data) => this.qualificationsList = data, (error) => this.notifier.notify("error", error.message));
    this.disabilities$.subscribe((data) => this.disabilitiesList = data, (error) => this.notifier.notify("error", error.message));
    this.locations$.subscribe((data) => this.locationsList = data, (error) => this.notifier.notify("error", error.message));
    this.supports$.subscribe((data) => this.supportsList = data, (error) => this.notifier.notify("error", error.message));

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
    private service: GenericService<Citizen>,
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
        phoneNo: this.data.item.phoneNo,
        dateOfBirth: this.data.item.dateOfBirth,
        nationalNo: this.data.item.nationalNo,
        isDisabled: this.data.item.isDisabled,
        skills: this.data.item.skills,
        isSupportEligible: this.data.item.isSupportEligible,
        isGainingSupport: this.data.item.isGainingSupport,
        isDeceased: this.data.item.isDeceased,
        nationality: this.data.item.nationality,
        buildAddressDetails: this.data.item.buildAddressDetails,
        location: this.data.item.location,
        qualification: this.data.item.qualification,
        gender: this.data.item.gender,
        supports: this.data.item.supports,
        medicines: this.data.item.medicines,
        diseases: this.data.item.diseases,
        disabilities: this.data.item.disabilities,
        professions: this.data.item.professions,
        gases: this.data.item.gases,
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