import { Component, OnInit, ViewChild } from '@angular/core';
import { State } from '../state/state.component';
import { Locality } from '../locality/locality.component';
import { Neighbourhood } from '../neighbourhood/neighbourhood.component';
import { City } from '../city/city.component';
import { Condition } from '../condition/condition.component';
import { BuildingType } from '../building-type/building-type.component';
import { Citizen } from '../citizen/citizen.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GenericService } from '../service/generic.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { LocationFormComponent } from '../location-form/location-form.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 'number', 'blkNo',
    'ownerID', 'ownerName', 'ownerPhoneNo',
    'delegateId', 'delegateName', 'delegatePhoneNo',
    'buildingType', 'condition', 'city',
    'neighbourhood', 'locality', 'state',
    'edit', 'delete'
  ];

  dataSource: MatTableDataSource<Citizen>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  resource: string = "/api/locations";

  constructor(
    private service: GenericService<Location>,
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
            this.service.notifier.notify("error", `item ${item.number} is deleted`);
            this.getAll();
          },
          (error: any) => this.service.notifier.notify("error", `Couldn't delete ${item.id}`)
        );
      }

    });
  }

  edit(item: any): void {

    this.service.get(this.resource, item.id).subscribe(
      (data: any) => {

        const dialogRef = this.dialog.open(LocationFormComponent, {
          data: { item: data, ops: "edit" },
        });

        dialogRef.afterClosed().subscribe((result: any) => {

          if (result !== "" && result !== undefined) {
            if (result?.error) {
              this.service.notifier.notify("error", result.error);
            } else {
              this.service.notifier.notify("success", `${result.number} is updated successfully`);
              this.getAll();
            }
          }
        });

      },
      (error: any) => this.service.notifier.notify("error", error.message)
    );

  }

  create(): void {

    const dialogRef = this.dialog.open(LocationFormComponent, {
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
        // console.log("data: ", data)
        // const converted = this.convertData(data);
        this.dataSource.data = data;
      },
      (error: any) => {
        this.service.notifier.notify("alert", error.message)
      }
    );
  }

  // convertData(data: any[][]): Citizen[] {

  //   return data.map((item) => {
  //     return {
  //       id: item[0],
  //       name: item[1],
  //       phoneNo: item[9],
  //       dateOfBirth: item[3],
  //       nationalNo: item[8],
  //       isDisabled: item[5],
  //       skills: item[10],
  //       isSupportEligible: item[7],
  //       isGainingSupport: item[6],
  //       isDeceased: item[4],
  //       buildAddressDetails: item[2],
  //       location: item[12],
  //       nationality: item[13],
  //       qualification: item[14],
  //       school: item[15],
  //       gender: item[11],
  //       supports: item[21],
  //       medicines: item[17],
  //       diseases: item[18],
  //       disabilities: item[20],
  //       professions: item[19],
  //       gases: item[16],
  //       wives: item[21]
  //     };
  //   });

  // }

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

export interface Location {
  id: number;
  number: string;
  blkNo: string;
  ownerId: string;
  ownerName: string;
  ownerPhoneNo: string;
  delegateId: string;
  delegateName: string;
  delegatePhoneNo: string;
  buildingType: BuildingType;
  condition: Condition;
  citizens: Citizen[];
  city: City;
  neighbourhood: Neighbourhood;
  locality: Locality;
  state: State;
}