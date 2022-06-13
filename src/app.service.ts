import { Injectable } from '@nestjs/common';
import { ValidateBvnDTO } from './validate-bvn.dto';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async processBVN(param: ValidateBvnDTO) {
    const { bvn } = param;
    if (bvn === '') {
      return {
        Message: 'One or more of your request parameters failed validation. Please retry',
        Code: '400',
        Bvn: bvn,
      };
    } else if (bvn.length < 11) {
      return {
        Message: 'The searched BVN is invalid',
        Code: '02',
        Bvn: bvn,
      };
    } else if (isNaN(bvn)) {
      return {
        Message: 'The searched BVN is invalid',
        Code: '400',
        Bvn: bvn,
      };
    } else if (bvn.length === 11) {
      if (bvn === '11111111111') {
        const img = fs.readFileSync('./image.png');
        const ImageDetail = img.toString('base64');
        return {
          Message: 'Success',
          Code: '00',
          Bvn: bvn,
          ImageDetail,
          BasicDetail: Buffer.from('Chinedu Rowland', 'base64').toString(),
        };
      } else {
        return {
          Message: 'The searched BVN does not exist',
          Code: '01',
          Bvn: bvn,
        };
      }
    }
  }
}
