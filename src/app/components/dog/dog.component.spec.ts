import { async, inject, TestBed, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { DogComponent } from './dog.component';
import { DogService } from '../../services/dog.service';
import { DogResponse } from '../../models/dogResponse';
import { of } from '../../../../node_modules/rxjs';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filters/filter.pipe';

describe('DogComponent', () => {
   let dogComponent: DogComponent;
   let _dogService;
   let fixture: ComponentFixture<DogComponent>;
   let getDogsListSpy;



  beforeEach(() => {
    const dr: DogResponse = { status : 'success', message : ['afflenpinschen']};
    _dogService = jasmine.createSpyObj('DogService', ['getDogsList']);
    getDogsListSpy = _dogService.getDogsList.and.returnValue(of(dr));
    TestBed.configureTestingModule({
      declarations: [
        DogComponent,
        FilterPipe
      ],
      providers: [
        DogService
      ],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(DogComponent);
    dogComponent = fixture.componentInstance;
  });

  it('should create DogComponent', () => {
    expect(dogComponent).toBeTruthy();
  });

  it('should show current dogs breed number', () => {
    dogComponent.getDogsList();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(dogComponent.dogs.length).toBe(1);
    }).catch(function (reject) {
      console.log(reject);
    });
  });

  it('should show current dog image', () => {
    dogComponent.getDogsList();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(dogComponent.dogImg).toBeDefined();
    }).catch(function (reject) {
      console.log(reject);
    });
  });


  afterEach(() => {
    dogComponent = null;
    _dogService = null;
  });

});

