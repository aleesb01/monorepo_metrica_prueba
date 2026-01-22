import {
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicantService } from './user-list.service';
import { Applicant } from './user-list.entity';

@Controller('applicants')
export class ApplicantController {
    constructor(private readonly service: ApplicantService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadExcel(@UploadedFile() file: Express.Multer.File) {
        const data = await this.service.processExcel(file.buffer);

        return {
            message: 'Excel processed successfully',
            data,
        };
    }

    @Get('users')
    async findAll(): Promise<Applicant[]> {
        return await this.service.findAll();
    }

    @Delete('delete/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.service.delete(id);
        return {
            message: `Usuario con ID ${id} eliminado correctamente`,
        };
    }
}
