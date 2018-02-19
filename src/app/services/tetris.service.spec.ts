import { TestBed, inject } from '@angular/core/testing';

import { TetrisService } from './tetris.service';

describe('TetrisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TetrisService]
    });
  });

  it('should be created', inject([TetrisService], (service: TetrisService) => {
    expect(service).toBeTruthy();
  }));
});
