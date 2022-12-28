
Provides manual commit implementation for kafkajs.

[![npm](https://img.shields.io/npm/v/@zvs001/kafka-helpers)](https://www.npmjs.com/package/@zvs001/kafka-helpers)

## Install

``yarn add @zvs001/kafka-helpers``

or 

```npm i -S @zvs001/kafka-helpers```


## Usage

Code example:

```tsx
import { setupConsumer } from '@zvs001/kafka-helpers'

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
