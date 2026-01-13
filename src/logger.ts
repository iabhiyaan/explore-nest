import pino from 'pino';
import { join } from 'path';

const isDev = process.env.NODE_ENV !== 'production';

export const logger = pino({
  level: isDev ? 'debug' : 'info',
  transport: {
    targets: [
      // Always pretty print to console
      { target: 'pino-pretty', options: { colorize: true }, level: 'debug' },
      // Always write JSON to file (for Grafana/Loki)
      { target: 'pino/file', options: { destination: join(process.cwd(), 'logs', 'app.log'), mkdir: true }, level: 'debug' },
    ],
  },
});
