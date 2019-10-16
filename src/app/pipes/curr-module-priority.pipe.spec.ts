import { CurrModulePriorityPipe } from './curr-module-priority.pipe';

describe('CurrModulePriorityPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrModulePriorityPipe(null);
    expect(pipe).toBeTruthy();
  });
});
