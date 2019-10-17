import { CurriculumModulePriorityPipe } from './curriculum-module-priority.pipe';

describe('CurriculumModulePriorityPipe', () => {
  it('create an instance', () => {
    const pipe = new CurriculumModulePriorityPipe(null);
    expect(pipe).toBeTruthy();
  });
});
