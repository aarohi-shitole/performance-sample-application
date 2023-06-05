import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppraisalEvaluationParameterDetailComponent } from './appraisal-evaluation-parameter-detail.component';

describe('AppraisalEvaluationParameter Management Detail Component', () => {
  let comp: AppraisalEvaluationParameterDetailComponent;
  let fixture: ComponentFixture<AppraisalEvaluationParameterDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppraisalEvaluationParameterDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ appraisalEvaluationParameter: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AppraisalEvaluationParameterDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AppraisalEvaluationParameterDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load appraisalEvaluationParameter on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.appraisalEvaluationParameter).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
