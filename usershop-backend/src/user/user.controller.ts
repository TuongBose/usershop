import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { MyJwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import type { User } from '@prisma/client';

@Controller('users')
export class UserController {
    // @UseGuards(AuthGuard('jwt'))
    // @Get('me')
    // me(){
    //     return 'This is me';
    // }

    // @UseGuards(AuthGuard('jwt'))
    // @Get('me')
    // me(@Req() request: Request) {
    //     return request.user;
    // }

    // @UseGuards(MyJwtGuard)
    // @Get('me')
    // me(@Req() request: Request) {
    //     return request.user;
    // }

    @UseGuards(MyJwtGuard)
    @Get('me')
    me(@GetUser() user: User) {
        return user;
    }
}
