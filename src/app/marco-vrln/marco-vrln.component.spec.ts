import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcoVRLNComponent } from './marco-vrln.component';

describe('MarcoVRLNComponent', () => {
  let component: MarcoVRLNComponent;
  let fixture: ComponentFixture<MarcoVRLNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcoVRLNComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcoVRLNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
