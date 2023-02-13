# WebSockets Messages

Messages delivered by the scraper WebSockets server have two attributes:

- `type` (describing the payload to be expected)
- `data` (the actual payload data)

### type: `transactions`

Here the `data` payload will be an array of `TransactionBody` items, hence you can expect the payload to be of type `TransactionBody[]`.
