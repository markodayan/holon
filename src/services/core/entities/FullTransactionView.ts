import { ViewEntity, ViewColumn, DataSource } from 'typeorm';
import { Transaction, Receipt } from './index.entities';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('receipt.contractAddress', 'contractAddress')
      .addSelect('receipt.cumulativeGasUsed', 'cumulativeGasUsed')
      .addSelect('receipt.effectiveGasPrice', 'effectiveGasPrice')
      .addSelect('receipt.gasUsed', 'gasUsed')
      .addSelect('receipt.logs', 'logs')
      .addSelect('receipt.logsBloom', 'logsBloom')
      .addSelect('receipt.status', 'status')
      .from(Receipt, 'receipt')
      .leftJoin(Transaction, 'transaction', 'transaction.hash = receipt.transactionHash'),
})
class FullTransactionView {
  @ViewColumn()
  hash: string;
}

export default FullTransactionView;
