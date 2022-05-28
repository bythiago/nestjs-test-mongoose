import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;
  const createCatDto: CreateCatDto = {
    name: 'Cat #1',
    breed: 'Breed #1',
    age: 4,
  };

  const mockCat = {
    name: 'Cat #1',
    breed: 'Breed #1',
    age: 4,
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue(createCatDto),
            deleteOne: jest.fn().mockResolvedValue(mockCat),
            findOne: jest.fn().mockResolvedValue(mockCat),
          },
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of cats', async () => {
      expect(await controller.findAll()).toEqual([]);
    });
  });

  describe('findOne()', () => {
    it('should return a cat', async () => {
      expect(await controller.findOne('a id')).toEqual(mockCat);
    });
  });

  describe('create()', () => {
    it('should create a new cat', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockCat);

      await controller.create(createCatDto);
      expect(createSpy).toHaveBeenCalledWith(createCatDto);
    });
  });

  describe('delete()', () => {
    it('should return a cat', async () => {
      expect(await controller.delete('a id')).toEqual(mockCat);
    });
  });
});
