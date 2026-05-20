import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { NoteService } from './note.service';
import { GetUser } from '../auth/decorator';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';

@UseGuards(MyJwtGuard)
@Controller('notes')
export class NoteController {
    constructor(private noteService: NoteService) { }
    @Get()
    getNotes(@GetUser('id') userId: number) {
        return this.noteService.getNotes(userId);
    }

    @Get(':id')
    getNoteById(@Param('id') noteId: number) {
        return this.noteService.getNoteById(noteId);
    }

    @Post()
    insertNote(
        @GetUser('id') userId: number,
        @Body() insertNoteDTO: InsertNoteDTO
    ) {
        console.log('insertNote')
        console.log(`userId: ${userId}`, `insertNoteDTO: ${JSON.stringify(insertNoteDTO)}`)
        return this.noteService.insertNote(userId, insertNoteDTO);
    }

    @Patch(':id')
    updateNoteById(
        @Param('id', ParseIntPipe) noteId: number,
        @Body() updateNoteDTO: UpdateNoteDTO
    ) {
        return this.noteService.updateNoteById(noteId, updateNoteDTO);
    }

    @Delete(':id')
    deleteNoteById(@Param('id', ParseIntPipe) noteId: number) {
        return this.noteService.deleteNoteById(noteId);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete()
    deleteNoteById_Query(@Query('id', ParseIntPipe) noteId: number) {
        return this.noteService.deleteNoteById(noteId);
    }
}

