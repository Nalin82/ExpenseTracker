import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/shared/service-proxies/client';
import * as _moment from 'moment';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

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
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class GraphViewComponent implements OnInit {
  public isLoading: boolean = false;
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = { responsive: true };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  public fromDateFormControl: FormControl = new FormControl(moment());
  public toDateFormControl: FormControl = new FormControl(moment());
  public date = new FormControl(moment());

  constructor(private client: Client, private toastr: ToastrService) {}

  ngOnInit(): void {
    console.log('graph-view');
    this.getData(
      this.fromDateFormControl.value.year(),
      this.toDateFormControl.value.year(),
      this.fromDateFormControl.value.month(),
      this.toDateFormControl.value.month()
    );
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

  chosenToYearHandler(normalizedYear: _moment.Moment) {
    const ctrlValue = this.toDateFormControl.value;
    ctrlValue.year(normalizedYear.year());
    this.toDateFormControl.setValue(ctrlValue);
  }

  chosenToMonthHandler(
    normalizedMonth: _moment.Moment,
    datepicker: MatDatepicker<_moment.Moment>
  ) {
    const ctrlValue = this.toDateFormControl.value;
    ctrlValue.month(normalizedMonth.month());
    this.toDateFormControl.setValue(ctrlValue);
    datepicker.close();
  }

  public refreshData(): void {
    this.getData(
      this.fromDateFormControl.value.year(),
      this.toDateFormControl.value.year(),
      this.fromDateFormControl.value.month() + 1,
      this.toDateFormControl.value.month() + 1
    );
  }

  public getData(fromYear, toYear, fromMonth, toMonth): void {
    this.isLoading = true;
    this.client
      .getByPeriod({
        fromMonth,
        toMonth,
        fromYear,
        toYear,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.lineChartData = [];
          this.lineChartData.push({
            data: res.map((d) => d['Reserch']),
            label: 'Reserch & Development',
          });
          this.lineChartData.push({
            data: res.map((d) => d['Car']),
            label: "CEO's car",
          });
          this.lineChartData.push({
            data: res.map((d) => d['Canteen']),
            label: 'Canteen',
          });
          this.lineChartData.push({
            data: res.map((d) => d['Marketing']),
            label: 'Marketing',
          });
          this.lineChartData.push({
            data: res.map((d) => d['Parking']),
            label: 'Parking fines',
          });
          this.lineChartLabels = res.map((d) => d['AttachDate']);
        },
        (err) => {
          this.isLoading = false;
          let apiError = JSON.parse(err.response);
          if (apiError.status === HttpStatusCode.Unauthorized) {
            this.toastr.error('Invalid UserName or Password', 'Error!');
            return;
          }
          console.log(apiError.message);
          this.toastr.error(`${apiError.message}`, 'Error!');
        },
        () => (this.isLoading = false)
      );
  }
}
