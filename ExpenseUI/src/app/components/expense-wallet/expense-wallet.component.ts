import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client, IActionResultTask } from 'src/shared/service-proxies/client';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  MatDatepicker,
} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { DatePipe } from '@angular/common';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-expense-wallet',
  templateUrl: './expense-wallet.component.html',
  styleUrls: ['./expense-wallet.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ExpenseWalletComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'AttachDate',
    'Reserch',
    'Canteen',
    'Car',
    'Marketing',
    'Parking',
  ];
  ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource<IActionResultTask>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading: boolean = false;

  public fromDateFormControl: FormControl = new FormControl(moment());

  constructor(
    private toastr: ToastrService,
    private client: Client,
    private router: Router,

  ) {
    this.dataSource.filterPredicate = (data: any, filter: string) =>
      !filter || data.AttachDate.includes(filter);
  }

  ngOnInit() {
    this.getAllExpenses();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  chosenFromYearHandler(normalizedYear: _moment.Moment) {
    const ctrlValue = this.fromDateFormControl.value;
    ctrlValue.year(normalizedYear.year());
    this.fromDateFormControl.setValue(ctrlValue);
  }

  chosenFromMonthHandler(
    normalizedMonth: _moment.Moment,
    datepicker: MatDatepicker<_moment.Moment>
  ) {
    const ctrlValue = this.fromDateFormControl.value;
    ctrlValue.month(normalizedMonth.month());
    this.fromDateFormControl.setValue(ctrlValue);
    datepicker.close();
  }

  addEvent(event) {
    console.log('Event fire');
    console.log(event.value);

    var filterValue: any = '';
    if (event != undefined) {
      //filterValue = this.datepipe.transform(event.value, 'M/d/yyyy');
      //var month = event.value.toLocaleString('default', { month: 'long' })
      //var year = event.target.value.getFullYear();
      //filterValue = month + " " + year

      console.log(filterValue);
    }
    //this.dataSource.filter = filterValue.trim();
  }

  public refreshData(): void {
    var date = this.fromDateFormControl.value;
    console.log(date);
    var month = date.format('MMMM')
    var year = date.year();
    var filterValue = month + ' ' + year;

    this.dataSource.filter = filterValue.trim();
  }

  public getAllExpenses(): void {
    this.isLoading = true;
    this.client.getAll().subscribe((res: any) => {
      this.dataSource.data = res as IActionResultTask[];
    }, (err) => {
      this.isLoading = false;
      let apiError = JSON.parse(err.response);

      if (apiError.status === HttpStatusCode.Unauthorized) {
        this.toastr.error('Invalid UserName or Password', 'Error!');
        return;
      }
      console.log(apiError.message);
      this.toastr.error(`${apiError.message}`, 'Error!');
    },()=>
    {
      this.isLoading = false
    }
    );
  }
}
