import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import *as pactum from 'pactum'

const PORT = 3000
describe('App EndToEnd tests', () => {
  let app: INestApplication
  let prismaService: PrismaService
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = appModule.createNestApplication()
    app.useGlobalPipes(new ValidationPipe());
    await app.init()
    await app.listen(PORT)
    prismaService = app.get(PrismaService)
    await prismaService.cleanDatabase()
    pactum.request.setBaseUrl(`http://localhost:${PORT}`)
  })

  describe('Test Authentication', () => {
    describe('Register', () => {
      it('should show error if password is empty', () => {
        return pactum.spec()
          .post(`/auth/register`)
          .withBody({
            email: 'testemail01@gmail.com',
            password: ''
          })
          .expectStatus(400)
        // .inspect()
      })

      it('should show error with invalid email format', () => {
        return pactum.spec()
          .post(`/auth/register`)
          .withBody({
            email: 'testemail01@gmail',
            password: '123456'
          })
          .expectStatus(400)
        // .inspect()
      })

      it('should show error with empty email', () => {
        return pactum.spec()
          .post(`/auth/register`)
          .withBody({
            email: '',
            password: '123456'
          })
          .expectStatus(400)
        // .inspect()
      })

      it('should Register', () => {
        return pactum.spec()
          .post(`/auth/register`)
          .withBody({
            email: 'testemail01@gmail.com',
            password: '123456'
          })
          .expectStatus(201)
        // .inspect()
      })
    })
    describe('Login', () => {
      it('should Login', () => {
        return pactum.spec()
          .post(`/auth/login`)
          .withBody({
            email: 'testemail01@gmail.com',
            password: '123456'
          })
          .expectStatus(201)
          // .inspect()
          .stores('accessToken', "accessToken")
      })
    })

    describe('User', () => {
      describe('Get Detail User', () => {
        it('should get detail user', () => {
          return pactum.spec()
            .get(`/users/me`)
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}'
            })
            .expectStatus(200)
            .inspect()
        })
      })
    })

    describe('Note', () => {
      describe('Insert Note', () => {
        it('insert first note', () => {
          return pactum.spec()
            .post(`/notes`)
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}'
            })
            .withBody({
              title: 'Note 01',
              url: 'https://www.youtube.com/watch?v=GHTA143_b-s',
              description: 'This is a note about NestJS'
            })
            .expectStatus(201)
            .stores('noteId01', 'id')
            .inspect()
        })
        it('insert second note', () => {
          return pactum.spec()
            .post(`/notes`)
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}'
            })
            .withBody({
              title: 'Note 02',
              url: 'https://www.youtube.com/watch?v=GHTA143_b-s',
              description: 'This is a note about NestJS'
            })
            .expectStatus(201)
            .stores('noteId02', 'id')
            .inspect()
        })
        it('get Note by id', () => {
          return pactum.spec()
            .get(`/notes`)
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}'
            })
            .withPathParams('id', '$S{noteId01}')
            .expectStatus(200)
        })
        it('get All Notes', () => {
          return pactum.spec()
            .get(`/notes`)
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}'
            })
            .inspect()
            .expectStatus(200)
        })
        it('delete Note by id', () => {
          return pactum.spec()
            .delete(`/notes/{id}`)
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}'
            })
            .withPathParams('id', '$S{noteId01}')
            .expectStatus(200)
        })
      })
    })

    afterAll(async () => {
      app.close()
    })
    it.todo('should PASS');
  })
})
