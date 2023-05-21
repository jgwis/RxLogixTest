import { Component, ElementRef, OnInit, Output,EventEmitter,
   ViewChild, Input, AfterViewInit, AfterContentInit, AfterViewChecked, DoCheck, AfterContentChecked, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild('myModal', { static: false })
  modal!: ElementRef;
  addEmpForm!: FormGroup;
  @Output() addempData = new EventEmitter<any>();
  @Output() updateempData = new EventEmitter<any>();
  @Input() statusmode: string;
  selecteditem: any;
  endDateUpdate: string;
  index: number;
  submitted = false;
  constructor(private fb: FormBuilder, private toast: ToastrService) {}
  
  open() {
    this.modal.nativeElement.style.display = 'block';
    this.addEmpForm.reset();
    this.addEmpForm.controls['empJobTitle'].setValue('');
     if(this.selecteditem){
      this.index = this.selecteditem.indexId;
      this.addEmpForm.patchValue({
        empName: this.selecteditem.empName,
        empJobTitle: this.selecteditem.empJobTitle,
        empAge: this.selecteditem.empAge,
        startDate: this.selecteditem.startDate,
        endDate: this.selecteditem.endDate
        })
        }
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
    this.submitted = false;
    this.addEmpForm.reset();
  }

  ngOnInit(): void {
    this.addEmpForm = this.fb.group({
    empName: ['', Validators.required],
    empJobTitle: ['', Validators.required],
    empAge: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: [''],
      })
  }

currentlyWorking(){
  if(this.addEmpForm.value.endDate == null){
    this.endDateUpdate = '';
  }
  else {
    this.endDateUpdate = this.addEmpForm.value.endDate;
  }
}
get f() { return this.addEmpForm.controls; }
  addEmp(){
    this.submitted = true;
    this.selecteditem = '';
     if(this.addEmpForm.invalid) {
      return
    }
      this.currentlyWorking();
      let addEmpData = {
        empName: this.addEmpForm.value.empName,
        empJobTitle: this.addEmpForm.value.empJobTitle,
        empAge: this.addEmpForm.value.empAge,
        startDate: this.addEmpForm.value.startDate,
        endDate: this.endDateUpdate,
      }
      console.log(addEmpData);
      this.addempData.emit(addEmpData);
      this.closeModal();
      this.toast.success('Added Successfully!', '', {timeOut: 3000 });
      this.addEmpForm.reset();
      this.addEmpForm.controls['empJobTitle'].setValue('');
    }
   

  updateEmp(){
    this.submitted = true;
    this.selecteditem = '';
     if(this.addEmpForm.invalid) {
      return
    }
   
    this.currentlyWorking();
    let updateEmpData = {
      empName: this.addEmpForm.value.empName,
      empJobTitle: this.addEmpForm.value.empJobTitle,
      empAge: this.addEmpForm.value.empAge,
      startDate: this.addEmpForm.value.startDate,
      endDate: this.endDateUpdate,
      indexId: this.index
    }
    this.updateempData.emit(updateEmpData);
    this.closeModal();
    this.toast.success('Updated Successfully!', '', {timeOut: 3000 });
    this.addEmpForm.reset();
    this.addEmpForm.controls['empJobTitle'].setValue('');
  }
}
