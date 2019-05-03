import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { Employee } from "src/app/shared/employee.model";
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];

  emp:any;

  constructor(public service: EmployeeService,
    public firestore: AngularFirestore,
    public toaster: ToastrService) { }

  ngOnInit() {
    this.service.getEmployes().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      })
    })
  }

  onEdit(emp:Employee){
    this.service.formData = Object.assign({},emp);
  }

  onDelete(id:string){
    //if (confirm("Are you sure to delete this employee record?")) {
      this.firestore.doc('employees/'+id).delete();
      this.toaster.warning("Deleted successfuly", "Employee Delete");
    //}
  }

}
