import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }


  employeeList = [
    {
      empId: 1,
      empName: 'Anil Kumar',
      empJobTitle: 'Manager',
      empAge: 33,
      startDate: '2022-05-10',
      endDate: '2023-05-20',
    },
    {
      empId: 2,
      empName: 'Ankur Tyagi',
      empJobTitle: 'Tech Lead',
      empAge: 38,
      startDate: '2023-02-10',
      endDate: '',
    },
    {
      empId: 3,
      empName: 'Ankur Tyagi',
      empJobTitle: 'Software Developer',
      empAge: 38,
      startDate: '2023-05-10',
      endDate: '2023-05-10',
      isEdit: false,
    },
    {
      empId: 4,
      empName: 'Ravi Yadav',
      empJobTitle: 'Quality Analysis',
      empAge: 30,
      startDate: '2023-05-10',
      endDate: '',
    },
    {
      empId: 5,
      empName: 'Manoj Singh',
      empJobTitle: 'UI Designer',
      empAge: 35,
      startDate: '2023-02-10',
      endDate: '2023-04-10',
    }
  ];
}
