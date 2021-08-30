import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostuleInfos } from '../board-user/postuleInfos';
import { PostuleInfosService } from '../_services/postuleInfosService';

@Component({
  selector: 'app-condidat-postules',
  templateUrl: './condidat-postules.component.html',
  styleUrls: ['./condidat-postules.component.css']
})
export class CondidatPostulesComponent implements OnInit {

  public postuleInfoss: PostuleInfos[];

   constructor(private postuleInfosService: PostuleInfosService){}

  ngOnInit() {
    this.getAllPostInfos();
  }

  public getAllPostInfos(): void {
    this.postuleInfosService.getAllPostInfos().subscribe(
      (response: PostuleInfos[]) => {
        this.postuleInfoss = response;
        console.log("get user"+this.postuleInfoss);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
