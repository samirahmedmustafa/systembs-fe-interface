import { Component, ViewChild } from '@angular/core';
import { City } from '../city/city.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GenericService } from '../service/generic.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { LocalityFormComponent } from '../locality-form/locality-form.component';
import { ConditionFormComponent } from '../condition-form/condition-form.component';
import { BuildingTypeFormComponent } from '../building-type-form/building-type-form.component';
import { GenderFormComponent } from '../gender-form/gender-form.component';
import { StatusFormComponent } from '../status-form/status-form.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  dataSource: MatTableDataSource<Status>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  resource: string = "/api/statuses";

  constructor(
    private service: GenericService<Status>,
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

    this.service.get(this.resource, item.id).subscribe(
      (data: any) => {

        const dialogRef = this.dialog.open(StatusFormComponent, {
          width: '600px',
          height: '400px',
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

    const dialogRef = this.dialog.open(StatusFormComponent, {
      width: '600px',
      height: '400px',
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
        this.dataSource.data = data;
      },
      (error: any) => {
        this.service.notifier.notify("alert", error.message)
      }
    );
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

export interface Status {
  id: number;
  name: string;
}


