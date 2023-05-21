import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from './services/employee.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filterForm!: FormGroup;
  employeeList: any= [''];
  statusMode: string;
  selectedIndexItem: any = {};
  updateData : any = '';
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private empservice: EmployeeService) {
   
  }
  
ngOnInit(){
 this.employeeList = this.empservice.employeeList;
  this.filterForm = this.fb.group({
    empName: [''],
    empJobTitle: [''],
    empAge: [''],
    startDate: [''],
    endDate: [''],
      })

 }
  @ViewChild('modal', { static: false })  modal!: AddEmployeeComponent;

  openModal(status:string) {
    this.modal.open();
    this.statusMode = status;
    this.modal.selecteditem = '';
}

addItem(newItem: string) {
  this.employeeList.push(newItem);
}

updateItem(item: any) {
 const foundIndex = this.employeeList.findIndex((val:any) => val.indexId === item.indexId);
 this.employeeList[foundIndex] = item;
}

selectedRow(selectedItem: any, index: number){
 selectedItem['indexId'] = index,
  this.modal.selecteditem = selectedItem;
  console.log(selectedItem);
  
}

deleteItem(x: number){
  if(this.employeeList.length > 1) {
    this.employeeList.splice(x,1);
    this.toast.success('Deleted Successfully!', '', {timeOut: 3000 });
  }
  
}

 removeEmptyFilterValue(obj: any) {
  for (var propName in obj) {
    if (obj[propName] === '' || obj[propName] === null) {
      delete obj[propName];
    }
  }
  return obj
}

filterList(){
  this.employeeList = this.empservice.employeeList;
  let filters:any = {
    empName: this.filterForm.value.empName,
    empJobTitle:this.filterForm.value.empJobTitle,
    empAge: this.filterForm.value.empAge,
    startDate:this.filterForm.value.startDate,
    endDate:this.filterForm.value.endDate
   };

 this.removeEmptyFilterValue(filters);
   let filterData = this.employeeList.filter((person: any) => {
    return Object.keys(filters).every((filter:any) => {
      if(filters[filter]){
        if (filter === 'empName') {
          return person[filter].toLowerCase().includes(filters[filter].toLowerCase());
        }else if(filter === 'startDate' || filter === 'endDate'){
           let filterStDate = new Date(filters['startDate']+":00:00:00").getTime() || 
           new Date("1970-01-01 00:00:00").getTime();
           let filterEdDate = new Date(filters['endDate']+":23:59:59").getTime() || Date.now();
           let empStDate = new Date(person['startDate']+":00:00:00").getTime();
           let empEdDate = new Date(person['endDate']+":23:59:59").getTime() || Date.now(); 
          return empStDate >= filterStDate && empStDate <= filterEdDate && empEdDate >= filterStDate && empEdDate <= filterEdDate ;
          }else {
          return filters[filter] === person[filter];
        }
      };
    });
  });
  this.employeeList = filterData;
}

resetFilter(){
  this.employeeList = this.empservice.employeeList;
  this.filterForm.reset();
  this.filterForm.controls['empJobTitle'].setValue('');
}

}
