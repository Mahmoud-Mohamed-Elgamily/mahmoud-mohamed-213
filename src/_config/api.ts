import axios from 'axios';
import { logger } from './logger';

export async function fetchEvents(): Promise<{ order; event; kind }[]> {
  try {
    logger.info('fetching events');
    const response = await axios.get(
      `https://api.reservoir.tools/events/asks/v3?limit=${
        process.env.RECORDS_LIMIT || 1000
      }`,
    );
    logger.info(`fetched: ${response.data.events.length} event`);
    return response.data.events;
  } catch (error) {
    logger.error(`Error fetching events: ${error.errno} - ${error.message}`);
    // for debugging
    // add other logging service to send stacktrace ( datadog for example )
    return [];
  }
}
