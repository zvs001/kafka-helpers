
Provides manual commit implementation for kafkajs.

[![npm](https://img.shields.io/npm/v/@zvsx001/kafka-helpers)](https://www.npmjs.com/package/@zvsx001/kafka-helpers)

## Install

``yarn add @zvsx001/kafka-helpers``

or 

```npm i -S @zvsx001/kafka-helpers```


## Usage

Code example:

```tsx
import { setupConsumer } from '@zvsx001/kafka-helpers'

const consumer = kafka.consumer({
  groupId: `group`,
})

await setupConsumer(consumer, {
  eachMessage(message: { topic: string; partition: number; data: any }) {
    const { topic, data } = message

    // ...
  },
})

```
