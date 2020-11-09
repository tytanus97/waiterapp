import { HasAnnotationPipe } from './has-annotation.pipe';

describe('HasAnnotationPipe', () => {
  it('create an instance', () => {
    const pipe = new HasAnnotationPipe();
    expect(pipe).toBeTruthy();
  });
});
