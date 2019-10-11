import { TestBed } from '@angular/core/testing';
import { ContentOrderPipe } from './content-order.pipe';
import { UtilService } from '../services/util.service';


describe('ContentOrderPipe', () => {

  it('create an instance', () => {
    const pipe = new ContentOrderPipe(new UtilService());
    expect(pipe).toBeTruthy();
  });
});
