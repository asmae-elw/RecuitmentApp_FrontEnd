import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondidatPostulesComponent } from './condidat-postules.component';

describe('CondidatPostulesComponent', () => {
  let component: CondidatPostulesComponent;
  let fixture: ComponentFixture<CondidatPostulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondidatPostulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondidatPostulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
