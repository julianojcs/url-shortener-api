import axios from 'axios';
import { ShortenerInterface } from '../../../domain/shortener.entity';
const httpHost = process.env.URL || 'http://localhost:3000/';

const createShortener = async (
  props: string
): Promise<ShortenerInterface | null> => {
  const url = { url: props };
  const response = await axios.post(`${httpHost}shortener`, { url });
  return response.data || null;
};

/**
 * Get all shorteners
 * @returns {Promise<ShortenerInterface[]>} Promise with all shorteners
 */
const getShorteners = async (): Promise<ShortenerInterface[]> => {
  const response = await axios.get(`${httpHost}shortener`);
  console.log(response.data);
  return response.data || [];
};

export { createShortener, getShorteners };
