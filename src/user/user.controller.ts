import { Controller, Get, Header, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('/:id')
    async getUser(@Req() req: Request, @Res() res: Response) {
        const result = await this.userService.getUser(req.params?.id)
        if (result) {
            return res.status(200).json(result)
        }
        return res.status(404).json()
    }
}
