import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from './assignment.service';


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
})
export class AssignmentComponent{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService
  ) {}

  get isAdd(): boolean {
    return this.assignmentService.isAdd;
  }

  newAssignment() {
    this.assignmentService.isAdd = true;
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onBack(){
    this.assignmentService.isAdd = false;
    this.router.navigate(['list'], { relativeTo: this.route });
  }
}
