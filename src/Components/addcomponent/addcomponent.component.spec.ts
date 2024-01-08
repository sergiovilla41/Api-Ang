import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcomponentComponent } from './addcomponent.component';

describe('AddcomponentComponent', () => {
  let component: AddcomponentComponent;
  let fixture: ComponentFixture<AddcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
