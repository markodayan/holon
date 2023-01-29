# Database-related thoughts

- A view entity for combining transaction bodies and their corresponding receipts could be a good option.

```typescript
import { ViewEntity, ViewColumn, DataSource } from "typeorm"

@ViewEntity({
    expression: (dataSource: DataSource) =>
        dataSource
            .createQueryBuilder()
            .select("receipt.contractAddress", "contractAddress")
            .addSelect("receipt.cumulativeGasUsed", "cumulativeGasUsed")
            .addSelect("receipt.effectiveGasPrice", "effectiveGasPrice")
            .addSelect("receipt.gasUsed", "gasUsed")
            .addSelect("receipt.logs", "logs")
            .addSelect("receipt.logsBloom", "logsBloom")
            .addSelect("receipt.status", "status")
            .from(Receipt, "receipt")
            .leftJoin(Transaction, "transaction", "transaction.hash = receipt.transactionHash"),
})
export class FullTransactionView {
    @ViewColumn()
    // property

    // ...
}
```
