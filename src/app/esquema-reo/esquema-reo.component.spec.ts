import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsquemaReoComponent } from './esquema-reo.component';

describe('EsquemaReoComponent', () => {
  let component: EsquemaReoComponent;
  let fixture: ComponentFixture<EsquemaReoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsquemaReoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsquemaReoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
