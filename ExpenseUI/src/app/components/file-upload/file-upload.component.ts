import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/shared/service-proxies/client';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';

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
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FileUploadComponent implements OnInit {
  //dataimage: any;
  @ViewChild('fileInput') fileInput: ElementRef;
  isLoading: boolean = false;

  fileAttr = 'Choose File';
  rd: any | undefined;
  canteen: any | undefined;
  car: any | undefined;
  marketing: any | undefined;
  parking: any | undefined;

  createFormGroup: FormGroup = new FormGroup({
    dateFormControl: new FormControl('', [Validators.required]),
    uploadFileFormControl: new FormControl('', [Validators.required]),
  });

  constructor(
    elementRef: ElementRef,
    private toastr: ToastrService,
    private client: Client,
    private router: Router
  ) {
    this.fileInput = elementRef;
  }

  ngOnInit(): void {}

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: _moment.Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    //this.date.setValue(ctrlValue);
    this.createFormGroup.controls.dateFormControl.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: _moment.Moment,
    datepicker: MatDatepicker<_moment.Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    //this.date.setValue(ctrlValue);
    this.createFormGroup.controls.dateFormControl.setValue(ctrlValue);
    datepicker.close();
  }

  onFileChange(evt: any) {
    this.fileAttr = '';
    // <--- File Object for future use.
    const target: DataTransfer = <DataTransfer>evt.target;
    let file = evt.target.files[0];
    if (file) {
      // <-- Set Value for Validation
      this.createFormGroup.controls.uploadFileFormControl.setValue(file.name);
      this.fileAttr = file.name;

      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];

        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        if (
          ws['A1'].v != 'R&D' ||
          ws['B1'].v != 'Canteen' ||
          ws['C1'].v != "CEO's car" ||
          ws['D1'].v != 'Marketing' ||
          ws['E1'].v != 'Paking fines'
        ) {
          this.createFormGroup.controls.uploadFileFormControl.setValue('');
          this.fileAttr = 'Choose File';
          this.toastr.error('Invalid Excel Template', 'Error!');
          return;
        }

        // read excel cell values
        this.rd = ws['A2'].v;
        this.canteen = ws['B2'].v;
        this.car = ws['C2'].v;
        this.marketing = ws['D2'].v;
        this.parking = ws['E2'].v;
      };
      reader.readAsBinaryString(target.files[0]);
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  public SuccessReset(): void {
    this.toastr.success('Successfully Added', 'Success !');
    this.createFormGroup.controls.uploadFileFormControl.setValue('');
    //this.createFormGroup.controls.dateFormControl.setValue('');
    this.fileAttr = 'Choose File';
  }

  public ErrorReset(): void {
    this.toastr.error('Invalid excel data', 'Error!');
    this.fileAttr = 'Choose File';
    this.createFormGroup.controls.uploadFileFormControl.setValue('');
  }

  public Create(): void {
    this.isLoading = true;

    var date = new Date(this.date.value);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    this.client
      .create({
        Reserch: this.rd,
        Canteen: this.canteen,
        Car: this.car,
        Marketing: this.marketing,
        Parking: this.parking,
        Year: year,
        Month: month,
      })
      .subscribe(
        (res: any) => {
          this.SuccessReset();
        },
        (err) => {
          this.isLoading = false;
          let apiError = JSON.parse(err.response);

          if (apiError.status === HttpStatusCode.Unauthorized) {
            this.toastr.error("Don't have access", 'Error!');
            return;
          }
          if (apiError.status === HttpStatusCode.BadRequest) {
            this.ErrorReset();
            return;
          }
          console.log(apiError.message);
          this.toastr.error(`${apiError.message}`, 'Error!');
        },
        () => {
          this.isLoading = false;
        }
      );
  }
}
