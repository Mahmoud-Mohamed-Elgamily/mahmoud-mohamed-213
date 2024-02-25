import axios from 'axios';
import { logger } from './logger';

export async function fetchEvents(): Promise<any[]> {
  try {
    const response = await axios.get(
      'https://api.reservoir.tools/events/asks/v3?limit=1000',
    );
    return response.data;
  } catch (error) {
    logger.error('Error fetching events:', error);
    return [];
  }
}
