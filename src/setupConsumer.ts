import colors from 'colors'
import invariant from 'invariant'
import { Consumer } from 'kafkajs'
import Long from 'kafkajs/src/utils/long'
import moment from 'moment'

export interface ConsumerEachMessageParams<DataType> {
  topic: string
  partition:number
  data: DataType
}

async function setupConsumer<DataType = any>(consumer: Consumer, params: {
  eachMessage(message: ConsumerEachMessageParams<DataType>)
}): Promise<any> {
  // consumer must be subscribed and connected before it
  await consumer.run({
    autoCommit: false, // must be disabled!!!
    eachMessage: async ({ topic, partition, message }) => {
      const startMoment = moment()
      console.log('*********************************')
      console.log('timestamp:', startMoment.toISOString())
      invariant(message, 'message is empty. WTF?')
      const { value, offset } = message
      const msgPrefix = `${colors.green(topic)} [${partition}](${offset})`

      try {
        const data = JSON.parse(value?.toString() || '')
        console.log(msgPrefix, data)

        await params.eachMessage({
          topic, partition, data,
        })

        const endMoment = moment()
        console.log(msgPrefix, `Done in ${endMoment.valueOf() - startMoment.valueOf()}ms`)

        // manage commits manually, because otherwise it commits events when they are errored
        const offsetNext = Long.fromValue(offset).add(1).toString()
        await consumer.commitOffsets([
          { topic, partition, offset: offsetNext },
        ])
      } catch (e) {
        console.error(e)
        throw e
      }
    },
  })
}

export default setupConsumer
