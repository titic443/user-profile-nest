import { Controller, Get, Header, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }


    @Get('/position')
    async getPosition(@Req() req: Request, @Res() res: Response) {
        console.log('position')
        const result = await this.userService.getPosition()
        if (result) {
            return res.status(200).json(result)
        }
        return res.status(404).json()
    }

    @Get('/location')
    async getLocation(@Req() req: Request, @Res() res: Response) {
        console.log('location')
        const result = await this.userService.getLocation()
        console.log(result)
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
        console.log(req.body)
        await this.userService.createUser(req.body)
    }

}
