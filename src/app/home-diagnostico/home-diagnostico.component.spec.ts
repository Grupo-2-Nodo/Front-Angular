import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiagnosticoComponent } from './home-diagnostico.component';

describe('HomeDiagnosticoComponent', () => {
  let component: HomeDiagnosticoComponent;
  let fixture: ComponentFixture<HomeDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDiagnosticoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
