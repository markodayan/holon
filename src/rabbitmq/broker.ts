import rascal from 'rascal';
import { config as CONFIG } from './config';
import { asyncRetry } from 'src/utils/index.utils';
import { CustomError } from 'src/error/index.error';

class Broker {
  public broker: rascal.BrokerAsPromised;

  public constructor() {}

  public async init() {
    this.broker = await asyncRetry<any>(async () => await this.connect(), {
      delay_time: 3000,
      retries: 5,
    });
  }

  private async connect() {
    try {
      return await rascal.BrokerAsPromised.create(CONFIG);
    } catch (error: any) {
      throw new CustomError(error.syscall, error.code, error.errno);
    }
  }
}

export default Broker;
