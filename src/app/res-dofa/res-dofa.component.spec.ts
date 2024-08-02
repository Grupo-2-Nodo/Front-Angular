import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResDofaComponent } from './res-dofa.component';

describe('ResDofaComponent', () => {
  let component: ResDofaComponent;
  let fixture: ComponentFixture<ResDofaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResDofaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResDofaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
