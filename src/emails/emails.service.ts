import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class EmailsService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {

  }

  async create() {
    await this.emailQueue.add('send-email', {
      assetName: 'hamrohaat',
      assetType: 'Webproject'
    }, {
      attempts: 3,
      backoff: 5000
    })
    return { queued: true };
  }

  findAll() {
    return `This action returns all emails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  async update() {
    try {
      await this.emailQueue.add('update-todo', {
        id: 5,
        title: 'hamrohaat updated 2'
      })

      return {
        updatedQueue: true
      }
    } catch (e) {
      throw new Error(e)
    }

  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
