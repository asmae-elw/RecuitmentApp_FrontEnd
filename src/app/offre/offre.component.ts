import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OffreService } from '../_services/offre.service';
import { Offre } from './offre';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

  public offres: Offre[];
  public editOffre: Offre;
  public deleteOffre: Offre;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  tokenStorageService: any;

   constructor(private offreService: OffreService){}

  ngOnInit() {
    this.getOffres();
  }

  public getOffres(): void {
    this.offreService.getOffres().subscribe(
      (response: Offre[]) => {
        this.offres = response;
        console.log(this.offres);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddOffre(addForm: NgForm): void {
    document.getElementById('add-offre-form').click();
    this.offreService.addOffre(addForm.value).subscribe(
      (response: Offre) => {
        console.log(response);
        this.getOffres();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateOffre(offre: Offre): void {
    this.offreService.updateOffre(offre).subscribe(
      (response: Offre) => {
        console.log(response);
        this.getOffres();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteOffre(offreId: number): void {
    this.offreService.deleteOffre(offreId).subscribe(
      (response: void) => {
        console.log(response);
        this.getOffres();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchOffres(key: string): void {
    console.log(key);
    const results: Offre[] = [];
    for (const offre of this.offres) {
      if (offre.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || offre.contract.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || offre.salary.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || offre.experience.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || offre.prerequisites.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(offre);
      }
    }
    this.offres = results;
    if (results.length === 0 || !key) {
      this.getOffres();
    }
  }

  public onOpenModal(offre: Offre, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addOffreModal');
    }
    if (mode === 'edit') {
      this.editOffre = offre;
      button.setAttribute('data-target', '#updateOffreModal');
    }
    if (mode === 'delete') {
      this.deleteOffre = offre;
      button.setAttribute('data-target', '#deleteOffreModal');
    }
    container.appendChild(button);
    button.click();
  }

}
