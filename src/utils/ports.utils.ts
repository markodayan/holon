import { check } from 'tcp-port-used';
import ip from 'ip';

async function isReady(port_num: number, host: string) {
  try {
    const inUse = await check(port_num, host);
    return inUse;
  } catch (err) {
    console.error(err);
    throw new Error('unexpected error');
  }
}

function timeout(ms: number, label: string) {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(`[${label}] ${ms} ms elapsed`);
      resolve(true);
    }, ms)
  );
}

/**
 * Poll until a process is running on the supplied port number (it is important to know what host we are referring to here! -> see HOST_IP_ADDR for inter-container communication)
 * @param {number} port_num - port number of running process
 */
async function waitForPort(port_num: number, host: string) {
  const PORT_LABEL_MAP: IPortMap = {
    5672: 'RabbitMQ',
    5000: 'scraper',
    5001: 'core',
    5002: 'api',
  };

  while (!(await isReady(port_num, host))) {
    await timeout(1000, PORT_LABEL_MAP[port_num]);
  }
}

interface IPortMap {
  [key: number]: string;
}

export { waitForPort };
