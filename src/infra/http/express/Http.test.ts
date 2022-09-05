import axios from 'axios';
import nock from 'nock';
import { ShortenerInterface } from '@/domain/shortener.entity';
import { createShortener, getShorteners } from '../service/shortener.service';

const httpHost = process.env.URL || 'http://localhost:3000/';
axios.defaults.baseURL = httpHost;
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Test the API Http methods', () => {
  it('should be able to test API with HTTP GET', async () => {
    const response = await axios({
      url: `${httpHost}shortener`,
      method: 'GET'
    });
    expect(response.status).toBe(200);
    const shorteners = response.data;
    expect(shorteners[0]).toHaveProperty('id');
    expect(shorteners[0]).toHaveProperty('url');
    expect(shorteners[0]).toHaveProperty('shortURL');
    expect(shorteners[0]).toHaveProperty('createdAt');
  });

  it('should be able to create a new HTTP POST', async () => {
    const response = await axios.post(`${httpHost}shortener`, {
      url: 'https://www.google.com'
    });

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('shortURL');
  });
});

// describe('Mock test the API Http methods with nock', () => {
//   afterEach(() => {
//     nock.cleanAll();
//   });
//
//   const mockDataList: any[] = [];
//   for (let i = 0; i < 5; i++) {
//     mockDataList.push({
//       id: `00000000-0000-0000-0000-00000000000${i}`,
//       url: `https://www.mymockurl.com/rota${i}`,
//       shortURL: `${process.env.URL}0000000${i}`,
//       createdAt: `2022-0${i + 1}-01T03:00:00.000Z`
//     });
//   }
//
//   const mockData = {
//     id: '34541fac-93f5-4e8e-9ca0-cad2f5826aaa',
//     url: 'https://www.mymockurl.com',
//     shortURL: 'http://localhost:3000/ffsrliaa',
//     createdAt: '2022-08-31T03:00:00.000Z'
//   };
//
//   it('should be able to create a new shortener', async () => {
//     nock(httpHost).post('/shortener').reply(200, mockData);
//     const result = await createShortener(mockData.url);
//
//     expect(result).toStrictEqual(mockData);
//   });
//   it('should be able to get all shorteners', async () => {
//     nock(httpHost).get('/shortener').reply(200, mockDataList);
//     const result = await getShorteners();
//
//     expect(result).toMatchObject(mockDataList);
//   });
// });
