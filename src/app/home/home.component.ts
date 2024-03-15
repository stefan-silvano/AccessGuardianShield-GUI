import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DatePipe } from '@angular/common';
import { AuthorizationService } from '../dashboard/content/authorization/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe],
})
export class HomeComponent implements OnInit {
  authorizations: any[] = [];
  searchTerm: string = '';

  constructor(
    private authorizationService: AuthorizationService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  performSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.rows = this.chunkArray(
      this.authorizations.filter((auth) =>
        auth.permission.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      3
    );
  }

  ngOnInit(): void {
    this.fetchAuthorizations();
  }

  fetchAuthorizations(): void {
    this.authorizationService.getAuthorizations().subscribe(
      (authorizations: any[]) => {
        authorizations.forEach((authorization: any) => {
          const formatedStartDate = this.datePipe.transform(
            authorization.startDate,
            'dd.MM.yyyy'
          );
          const formatedEndDate = this.datePipe.transform(
            authorization.endDate,
            'dd.MM.yyyy'
          );
          if (formatedStartDate != null) {
            authorization.startDate = formatedStartDate;
          }
          if (formatedEndDate != null) {
            authorization.endDate = formatedEndDate;
          }
        });
        this.authService.getLoggedUser().subscribe((user) => {
          this.authorizations = authorizations.filter(
            (auth) => auth.user.id === user.id
          );
          this.rows = this.chunkArray(this.authorizations, 3);
        });
      },
      (error: any) => {
        console.error('Failed to fetch authorizations:', error);
      }
    );
  }

  rows: any[] = [];

  chunkArray(arr: any[], size: number): any[] {
    const chunkedArray = [];
    let index = 0;
    while (index < arr.length) {
      chunkedArray.push(arr.slice(index, index + size));
      index += size;
    }
    return chunkedArray;
  }
}
