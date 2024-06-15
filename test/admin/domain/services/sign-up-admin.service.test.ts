import { Test } from '@nestjs/testing';
import { AdminAlreadyExistsError } from 'src/admin/domain/errors/admin-already-exists.error';
import { Admin } from 'src/admin/domain/models/admin.model';
import { SignUpAdminService } from 'src/admin/domain/services/sign-up-admin.service';
import { AdminRepository } from 'src/admin/ports/out/admin-repository.port';
import { AdminRepositoryMock } from 'test/admin/__mocks__/admin-repository.mock';

describe('SignUpAdminService', () => {
  let service: SignUpAdminService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SignUpAdminService,
        {
          provide: AdminRepository,
          useValue: AdminRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(SignUpAdminService);
  });

  it('동일한 아이디로 이미 가입된 관리자가 있으면 에러가 발생해야 함', async () => {
    AdminRepositoryMock.findBySignInId.mockResolvedValue(new Admin('1', 'admin', 'password', '관리자1'));

    const signInId = 'admin';
    const password = 'password';
    const name = '관리자2';

    const resultPromise = service.execute(signInId, password, name);

    await expect(resultPromise).rejects.toThrow(AdminAlreadyExistsError);
  });
});