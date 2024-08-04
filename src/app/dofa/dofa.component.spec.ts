import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DofaComponent } from './dofa.component';

describe('DofaComponent', () => {
  let component: DofaComponent;
  let fixture: ComponentFixture<DofaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DofaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DofaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
