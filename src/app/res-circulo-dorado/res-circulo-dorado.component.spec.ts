import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResCirculoDoradoComponent } from './res-circulo-dorado.component';

describe('ResCirculoDoradoComponent', () => {
  let component: ResCirculoDoradoComponent;
  let fixture: ComponentFixture<ResCirculoDoradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResCirculoDoradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResCirculoDoradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
