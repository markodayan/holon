import { CustomError } from '@error/index.error';

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

declare type AsyncToWrap = (...args: any[]) => Promise<any>;
interface RetryOptions {
  retries?: number;
  delay_time?: number;
}

const asyncRetry = async <T extends AsyncToWrap>(fn: T, options: RetryOptions = {}): Promise<T> => {
  let { retries = 3, delay_time = 2000 } = options;

  try {
    console.log(`[${process.env.SERVICE_NAME}] retries left: ${retries}`);
    return await fn();
  } catch (err: any) {
    if (err.syscall === 'connect' && err.code === -111) {
      console.error(`[${process.env.SERVICE_NAME}] RabbitMQ server not ready yet`);
    }
    if (retries === 0) {
      throw new Error('Retries exhausted');
    }

    await delay(delay_time);
    return await asyncRetry(fn, { retries: retries - 1, delay_time });
  }
};

export { delay, asyncRetry };
