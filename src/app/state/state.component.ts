import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GenericService } from '../service/generic.service';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material/dialog';
import { StateFormComponent } from '../state-form/state-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  dataSource: MatTableDataSource<State>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  resource: string = "/api/states";

  constructor(
    private service: GenericService<State>,
    public dialog: MatDialog
  ) { this.dataSource = new MatTableDataSource(); }


  delete(item: any) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(confirm => {

      if (confirm) {
        this.service.delete(this.resource, item.id).subscribe(
          (data) => {
            this.service.notifier.notify("error", `item ${item.name} is deleted`);
            this.getAll();
          },
          error => this.service.notifier.notify("error", `Couldn't delete ${item.id}`)
        );
      }

    });
  }

  edit(item: any): void {

    this.service.get(this.resource, item.id).subscribe(

      data => {
        const dialogRef = this.dialog.open(StateFormComponent, {
          data: { item: data, ops: "edit" },
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log("edit: ", result !== undefined)

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
      error => this.service.notifier.notify("error", error.message)
    );

  }

  create(): void {

    const dialogRef = this.dialog.open(StateFormComponent, {
      width: '400px',
      data: { item: "", ops: "create" },
    });

    dialogRef.afterClosed().subscribe(result => {

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
      data => {
        this.dataSource.data = data;
      },
      error => {
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

export interface State {
  id: number;
  name: string;
}