import { Controller, Get } from '@nestjs/common';

@Controller('cities')
export class CitiesController {
    @Get()
    async getCities() {
        const response = await new Promise((resolve, reject) => {
            try {
                setTimeout(() => resolve(['Kapan']), 1000)
            } catch (e) {
                reject(e)
            }
        })
        return response
    }
}
