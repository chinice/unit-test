import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidateBvnDTO } from './validate-bvn.dto';
import * as fs from 'fs';

describe('AppController', () => {
  let appController: AppController, appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('testing case 1: Valid BVN in request payload"', async () => {
    const img = fs.readFileSync('./image.png');
    const ImageDetail = img.toString('base64');
    const dto = new ValidateBvnDTO();
    dto.bvn = '11111111111';
    const expectedRes = {
      Message: 'Success',
      Code: '00',
      Bvn: '11111111111',
      ImageDetail,
      BasicDetail: Buffer.from('Chinedu Rowland', 'base64').toString(),
    };
    const response = await appService.processBVN(dto);
    expect(response).toStrictEqual(expectedRes);
  });

  it('testing case 2: Empty BVN in request"', async () => {
    const dto = new ValidateBvnDTO();
    dto.bvn = '';
    const expectedRes = {
      Message:
        'One or more of your request parameters failed validation. Please retry',
      Code: '400',
      Bvn: '',
    };
    const response = await appService.processBVN(dto);
    expect(response).toStrictEqual(expectedRes);
  });

  it('testing case 3: Invalid BVN in request payload"', async () => {
    const dto = new ValidateBvnDTO();
    dto.bvn = '11111111112';
    const expectedRes = {
      Message: 'The searched BVN does not exist',
      Code: '01',
      Bvn: '11111111112',
    };
    const response = await appService.processBVN(dto);
    expect(response).toStrictEqual(expectedRes);
  });

  it('testing case 4: Less than 11 BVN Digits"', async () => {
    const dto = new ValidateBvnDTO();
    dto.bvn = '1234567890';
    const expectedRes = {
      Message: 'The searched BVN is invalid',
      Code: '02',
      Bvn: '1234567890',
    };
    const response = await appService.processBVN(dto);
    expect(response).toStrictEqual(expectedRes);
  });

  it('testing case 5: Contains non digits in requested payload"', async () => {
    const dto = new ValidateBvnDTO();
    dto.bvn = '1234567890e';
    const expectedRes = {
      Message: 'The searched BVN is invalid',
      Code: '400',
      Bvn: '1234567890e',
    };
    const response = await appService.processBVN(dto);
    expect(response).toStrictEqual(expectedRes);
  });
});
