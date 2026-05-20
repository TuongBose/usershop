import { ForbiddenException, Injectable } from "@nestjs/common";
import { InsertNoteDTO, UpdateNoteDTO } from "./dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NoteService {
    constructor(private prismaService: PrismaService) { }
    getNotes(userId: number) {
        return this.prismaService.note.findMany({
            where: {
                userId: userId
            }
        })
    }

    getNoteById(noteId: number) {
        return this.prismaService.note.findUnique({
            where: {
                id: noteId
            }
        })
    }

    async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
        const note = await this.prismaService.note.create({
            data: {
                ...insertNoteDTO,
                userId: userId
            }
        })
        return note;
    }

    updateNoteById(noteId: number, updateNoteDTO: UpdateNoteDTO) {
        const note = this.prismaService.note.findUnique({
            where: {
                id: noteId
            }
        })
        if (!note) {
            throw new ForbiddenException('Cannot find Note to update')
        }
        return this.prismaService.note.update({
            where: {
                id: noteId
            },
            data: {
                ...updateNoteDTO
            }
        })
    }

    deleteNoteById(noteId: number) {
        const note = this.prismaService.note.findUnique({
            where: {
                id: noteId
            }
        })
        if (!note) {
            throw new ForbiddenException('Cannot find Note to delete')
        }
        return this.prismaService.note.delete({
            where: {
                id: noteId
            }
        })
    }
}