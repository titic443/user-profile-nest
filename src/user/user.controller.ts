import { Body, Controller, Get, Header, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { BodyRequestDTO } from 'src/interface/BodyRequest.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }


    @Get('/position')
    async getPosition(@Req() req: Request, @Res() res: Response) {
        const result = await this.userService.getPosition()
        if (result) {
            return res.status(200).json(result)
        }
        return res.status(404).json()
    }

    @Get('/location')
    async getLocation(@Req() req: Request, @Res() res: Response) {
        const result = await this.userService.getLocation()
        if (result) {
            return res.status(200).json(result)
        }
        return res.status(404).json()
    }

    @Get('/:id')
    async getUser(@Req() req: Request, @Res() res: Response) {
        const result = await this.userService.getUser(req.params?.id)
        if (result) {
            return res.status(200).json(result)
        }
        return res.status(404).json()
    }

    @Post()
    async createUser(@Req() req: Request) {
        await this.userService.createUser(req.body)
    }

    @Post('upload')
    @UseInterceptors(AnyFilesInterceptor())
    @UsePipes(new ValidationPipe({ transform: true }))
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: any,) {
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                this.userService.receivefile(files[i].buffer, files[i].originalname)
            }
        }
        const transform = plainToInstance(BodyRequestDTO, body)
        await this.userService.createUser(transform)
    }
}
