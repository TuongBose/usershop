import { Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { NoteService } from './note.service';
import { GetUser } from '../auth/decorator';

@UseGuards(MyJwtGuard)
@Controller('note')
export class NoteController {
    constructor(private noteService:NoteService){}
    @Get()
    getNotes(@GetUser('id') userId:number){

    }

    @Get(':id')
    getNoteById(@Param('id') noteId:number){

    }

    @Post()
    insertNote(){

    }

    @Patch()
    updateNoteById(){

    }

    @Delete()
    deleteNoteById(){

    }
}
