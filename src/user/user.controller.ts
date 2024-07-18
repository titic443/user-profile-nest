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

    @Get('/image/:filename')
    async downloadFile(@Req() req: Request, @Res() res: Response) {
        const buffer = await this.userService.downloadFile(req.params['filename'])
        const base64Image = buffer.toString('base64');
        const base64Response = `data:image/jpeg;base64,${base64Image}`;
        res.send(base64Response);
        // res.setHeader('Content-Type', 'image/jpeg');
        // res.send(buffer);

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
            console.log(result)
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
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: any, @Res() res: Response) {

        if (files.length > 0) {
            const transform = plainToInstance(BodyRequestDTO, body)
            const id = await this.userService.createUser(transform)
            for (let i = 0; i < files.length; i++) {
                this.userService.receivefile(files[i].buffer, id, files[i].fieldname, files[i].originalname)
            }
            return res.status(201).json({ message: "create user success" })
        }
        const transform = plainToInstance(BodyRequestDTO, body)
        await this.userService.createUser(transform)
        return res.status(201).json({ message: "create user success" })
    }
}
