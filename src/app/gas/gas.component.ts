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
import { DiseaseFormComponent } from '../disease-form/disease-form.component';
import { GasFormComponent } from '../gas-form/gas-form.component';

@Component({
  selector: 'app-gas',
  templateUrl: './gas.component.html',
  styleUrls: ['./gas.component.css']
})
export class GasComponent {
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  dataSource: MatTableDataSource<Gas>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  resource: string = "/api/gases";

  constructor(
    private service: GenericService<Gas>,
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

        const dialogRef = this.dialog.open(GasFormComponent, {
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

    const dialogRef = this.dialog.open(GasFormComponent, {
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

export interface Gas {
  id: number;
  name: string;
}

