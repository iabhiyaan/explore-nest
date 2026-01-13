// email.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TodosService } from 'src/todos/todos.service';

@Processor('email')
export class EmailConsumer extends WorkerHost {
    constructor(private readonly todosService: TodosService) {
        super()
    }

    async process(job: Job) {
        if (job.name === 'send-email') {
            await new Promise(resolve => {
                setTimeout(resolve, 10000);
            })
            await this.todosService.create({
                title: job.data.assetName
            })
            return { success: true };
        }

        if (job.name === 'update-todo') {
            try {
                console.log('update queue');
                await new Promise(resolve => {
                    setTimeout(resolve, 10000);
                })
                await this.todosService.update(job.data.id.toString(), job.data)
                console.log('updated queue .. :)');
                return {
                    success: true
                }
            } catch {
                throw new Error('Error')
            }

        }
    }
}
