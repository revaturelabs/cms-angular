import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CurriculumFetcherService } from 'src/app/services/curriculum-fetcher.service';

@Component({
  selector: 'app-curriculum-modules-page',
  templateUrl: './curriculum-modules-page.component.html',
  styleUrls: ['./curriculum-modules-page.component.css']
})
export class CurriculumModulesPageComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private cfs:CurriculumFetcherService) { }

  ngOnInit() {
    //Load relevant curriculum and display modules.
    this.route.params.pipe(map(params=>params['id']))
    .subscribe(res=>{
      this.cfs.getCurriculumModules(res).subscribe();
    })
  }

}
