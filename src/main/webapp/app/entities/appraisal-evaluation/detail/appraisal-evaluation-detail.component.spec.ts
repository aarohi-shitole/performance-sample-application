import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppraisalEvaluationDetailComponent } from './appraisal-evaluation-detail.component';

describe('AppraisalEvaluation Management Detail Component', () => {
  let comp: AppraisalEvaluationDetailComponent;
  let fixture: ComponentFixture<AppraisalEvaluationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppraisalEvaluationDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ appraisalEvaluation: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AppraisalEvaluationDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AppraisalEvaluationDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load appraisalEvaluation on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.appraisalEvaluation).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
