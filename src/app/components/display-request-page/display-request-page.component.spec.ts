import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DisplayRequestPageComponent } from './display-request-page.component';
import { MatProgressSpinnerModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestFetcherService } from 'src/app/services/request-fetcher.service';
import { Module } from 'src/app/models/Module';
import { Link } from 'src/app/models/Link';
import { Content } from 'src/app/models/Content';
import { Filter } from 'src/app/models/Filter';
import { Observable,of } from 'rxjs';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

describe('DisplayRequestPageComponent', () => {
  let component: DisplayRequestPageComponent;
  let fixture: ComponentFixture<DisplayRequestPageComponent>;
  let toast : ToastrService;
  let c1=null;
  let c2=null;
  let l1=null;
  let l2=null;
  let f1=null;
  let m1=null;
  let me=null;
  let filter: Filter = new Filter("Java","String", null);
  let location:Location;
  let url:string;
  let event = {target: {value: "0"}};
  let router:Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,
                 NgSelectModule,
                 MatProgressSpinnerModule,
                 HttpClientTestingModule,
                 ToastrModule.forRoot(),
                 RouterTestingModule,
                 MatCardModule,
                 BrowserAnimationsModule
                 ],
      declarations: [ DisplayRequestPageComponent ],
      providers: [RequestFetcherService,ToastrService,Location]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(DisplayRequestPageComponent);
      component = fixture.componentInstance;
      location = TestBed.get(Location);
      location.onUrlChange((urlChanged)=>{url=urlChanged});
      toast = TestBed.get(ToastrService);
      router = TestBed.get(Router)
    });
  }));

  beforeEach(() => {
   
    let filter: Filter = new Filter("Java","String", null);
    fixture.detectChanges();
    fixture.detectChanges();
    m1=new Module( 1, "1", 1, [l1], [l1], [l1], [l1]);
    l1=new Link( 1, c1, m1, "reval", 1);
    l2=new Link( 2, c1, m1, "reval", 2);
    c1=new Content( 1, "adsad", "format: string", "description: string", "url: string", [l1,l2]);
    c2=new Content(2,'hey','format: adas','description','www.something.coomo',[l1,l2]);  
    f1=new Filter( "adasd0", "adawae", []);

  });

  it('createSearch should update req',()=>{
    spyOn(component.rs,'getAllRequests').and.returnValue(of(null));
    let url = window.location.href;
    component.createSearch(-1,url);
    expect(component.req).toBe(null);
  });

  it('createSearch should update req',()=>{
    spyOn(component,'sendSearch');
    let url = window.location.href;
    component.createSearch(2,url);
    expect(component.sendSearch).toHaveBeenCalled();
    
  });
  it('createSearch should update req',()=>{
    spyOn(component,'sendSearch');
    let url = '';
    component.createSearch(2,url);
    expect(component.sendSearch).toHaveBeenCalled();
    
  });

  it('removeRequest should call ngOnInit',()=>{
    spyOn(component.rs,'deleteRequestByID').and.returnValue(of(null));
    spyOn(component,'ngOnInit');
    component.removeRequest(1);
    expect(component.ngOnInit).toHaveBeenCalled();
  });
  
  it('submit should call sendSearch',()=>{
    component.selFormat="ALL"
    spyOn(component,'sendSearch');
    component.submit();
    expect(component.sendSearch).toHaveBeenCalled();
  });

  it('submit should call sendSearch',()=>{
    spyOn(component,'sendSearch');
    component.submit();
    expect(component.sendSearch).toHaveBeenCalled();
  });

  it('editRequest',()=>{
    spyOn(router, 'navigate').and.callFake(()=>Promise.resolve(true))
    component.editRequest(event);
    expect(component.session.get('request')).toBe('"0"');
  });

  it('updateURL should update location',()=>{
    spyOn(component.location,'replaceState')
    component.updateURL(f1)
    expect(component.location.replaceState).toHaveBeenCalled();
    
  });
  
  it('getIDsFromSebjects should update moduleIDs',()=>{
    spyOn(component.ms.subjectNameToModule,'get').and.returnValue(m1);
    let array=["hola","nunca","buenas"];
    component.getIDsFromSubjects(array);
    expect(component.moduleIDs[0]).toBe(m1.id);
    
  });

  it('sendSearch should update req',()=>{
    spyOn(component.rs,'filterContent').and.returnValue(of(c1));
    component.sendSearch(f1);
    expect(component.req).toBe(c1);
  });

  it('sendSearch should throw error, No Results Found',()=>{
    
    spyOn(toast,'error');
    spyOn(component.rs,'filterContent').and.returnValue(of([]));
    component.sendSearch(f1);
    expect(toast.error).toHaveBeenCalledWith('No Results Found');
  });

  it('sendSearch should throw error, Response was null',()=>{
    spyOn(toast,'error');
    spyOn(component.rs,'filterContent').and.returnValue(of(null));
    component.sendSearch(null);
    expect(toast.error).toHaveBeenCalledWith('Response was null');
  });
  
  it('sendSearach should set isSearching to false',()=>{
    spyOn(component.rs,'filterContent').and.returnValue(of(null));
    component.sendSearch(null);
    expect(component.isSearching).toBe(false);
  });

  it('sendSearch should update selectedSubjects',()=>{
    component.selectedSubjects=c1;
    component.sendSearch(f1);
    expect(component.searchedSubjects).toBe(c1);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
