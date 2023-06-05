import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MasterPerformanceIndicatorDetailComponent } from './master-performance-indicator-detail.component';

describe('MasterPerformanceIndicator Management Detail Component', () => {
  let comp: MasterPerformanceIndicatorDetailComponent;
  let fixture: ComponentFixture<MasterPerformanceIndicatorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterPerformanceIndicatorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ masterPerformanceIndicator: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MasterPerformanceIndicatorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MasterPerformanceIndicatorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load masterPerformanceIndicator on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.masterPerformanceIndicator).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
