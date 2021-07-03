import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealfireComponent } from './realfire.component';

describe('RealfireComponent', () => {
  let component: RealfireComponent;
  let fixture: ComponentFixture<RealfireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealfireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealfireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
