import { RequestPipe } from './request.pipe';

describe('RequestPipe', () => {
  it('create an instance', () => {
    const pipe = new RequestPipe();
    expect(pipe).toBeTruthy();
  });
});
