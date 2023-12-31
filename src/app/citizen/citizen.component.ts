import { Component, ViewChild } from '@angular/core';
import { State } from '../state/state.component';
import { CityFormComponent } from '../city-form/city-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GenericService } from '../service/generic.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Nationality } from '../nationality/nationality.component';
import { Qualification } from '../qualification/qualification.component';
import { Gender } from '../gender/gender.component';
import { CitizenFormComponent } from '../citizen-form/citizen-form.component';
import { School } from '../school/school.component';

@Component({
  selector: 'app-citizen',
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.css']
})
export class CitizenComponent {

  displayedColumns: string[] = [
    'id', 'name', 'phoneNo',
    'dateOfBirth', 'nationalNo', 'isDisabled',
    'skills', 'isSupportEligible', 'isGainingSupport',
    'isDeceased', 'buildAddressDetails', 'location',
    'nationality', 'qualification', 'gender', 'wives',
    'edit', 'delete'
  ];

  dataSource: MatTableDataSource<Citizen>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  resource: string = "/api/citizens/custom";
  editresource: string = "/api/citizens";

  constructor(
    private service: GenericService<Citizen>,
    public dialog: MatDialog
  ) { this.dataSource = new MatTableDataSource(); }


  delete(item: any) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((confirm: any) => {

      if (confirm) {
        this.service.delete(this.resource, item.id).subscribe(
          (data: any) => {
            this.service.notifier.notify("error", `item ${item.name} is deleted`);
            this.getAll();
          },
          (error: any) => this.service.notifier.notify("error", `Couldn't delete ${item.id}`)
        );
      }

    });
  }

  edit(item: any): void {

    this.service.get(this.editresource, item.id).subscribe(
      (data: any) => {

        const dialogRef = this.dialog.open(CitizenFormComponent, {
          data: { item: data, ops: "edit" },
        });

        dialogRef.afterClosed().subscribe((result: any) => {

          if (result !== "" && result !== undefined) {
            if (result?.error) {
              this.service.notifier.notify("error", result.error);
            } else {
              this.service.notifier.notify("success", `${result.name} is updated successfully`);
              this.getAll();
            }
          }
        });

      },
      (error: any) => this.service.notifier.notify("error", error.message)
    );

  }

  create(): void {

    const dialogRef = this.dialog.open(CitizenFormComponent, {
      width: '800px',
      height: '800px',
      data: { item: "", ops: "create" },
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result !== undefined && result !== "") {
        if (result?.message !== "" && result?.message !== undefined) {
          this.service.notifier.notify("error", `${result?.message}`);
        } else {
          this.service.notifier.notify("success", `${result.name} is added successfully`);
          this.getAll();
        }
      }
    });

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.service.getAll(this.resource).subscribe(
      (data: any) => {
        const converted = this.convertData(data);
        this.dataSource.data = converted;
      },
      (error: any) => {
        this.service.notifier.notify("alert", error.message)
      }
    );
  }

  convertData(data: any[][]): Citizen[] {

    return data.map((item) => {
      return {
        id: item[0],
        name: item[1],
        phoneNo: item[9],
        dateOfBirth: item[3],
        nationalNo: item[8],
        isDisabled: item[5],
        skills: item[10],
        isSupportEligible: item[7],
        isGainingSupport: item[6],
        isDeceased: item[4],
        buildAddressDetails: item[2],
        location: item[12],
        nationality: item[13],
        qualification: item[14],
        school: item[15],
        gender: item[11],
        medicines: item[17],
        diseases: item[18],
        disabilities: item[20],
        professions: item[19],
        gases: item[16],
        supports: item[21],
        followers: item[22]
        // wives: item[22],
      };
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export interface Citizen {
  id: number;
  name: string;
  phoneNo: string;
  dateOfBirth: Date;
  nationalNo: string;
  isDisabled: boolean;
  skills: string;
  isSupportEligible: boolean;
  isGainingSupport: boolean;
  isDeceased: boolean;
  buildAddressDetails: string;
  location: Location;
  nationality: Nationality;
  qualification: Qualification;
  school: School;
  gender: Gender;
  supports: number;
  medicines: number;
  diseases: number;
  disabilities: number;
  professions: number;
  gases: number;
  followers : number;
  // wives: number;
}
