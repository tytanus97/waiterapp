import { QuantityByStatusPipe } from './quantity-by-status.pipe';

describe('QuantityByStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new QuantityByStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
