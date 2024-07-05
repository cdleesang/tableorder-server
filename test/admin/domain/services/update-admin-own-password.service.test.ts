import { Test } from '@nestjs/testing';
import { AdminNotFoundError } from 'src/admin/domain/errors/admin-not-found.error';
import { IncorrectPasswordError } from 'src/admin/domain/errors/incorrect-password.error';
import { Admin } from 'src/admin/domain/models/admin.model';
import { UpdateAdminOwnPasswordService } from 'src/admin/domain/services/update-admin-own-password.service';
import { AdminRepository } from 'src/admin/ports/out/admin-repository.port';
import { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';
import { AdminRepositoryMock } from 'test/admin/__mocks__/admin-repository.mock';

describe('UpdateAdminOwnPasswordService', () => {
  let service: UpdateAdminOwnPasswordService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateAdminOwnPasswordService,
        {
          provide: AdminRepository,
          useValue: AdminRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(UpdateAdminOwnPasswordService);

    jest.clearAllMocks();
  });

  it('대상 관리자가 없으면 에러가 발생해야 함', async () => {
    AdminRepositoryMock.findById.mockResolvedValue(undefined);

    const authorization = new AdminAuthorization('1', []);
    const currentPassword = 'password';
    const newPassword = 'new-password';

    const resultPromise = service.execute(authorization, currentPassword, newPassword);

    await expect(resultPromise).rejects.toThrow(AdminNotFoundError);
  });

  it('기존의 비밀번호가 일치하지 않으면 에러가 발생해야 함', async () => {
    AdminRepositoryMock.findById.mockResolvedValue(new Admin('1', 'admin', 'password', '관리자'));

    const authorization = new AdminAuthorization('1', []);
    const currentPassword = 'wrong-password';
    const newPassword = 'new-password';

    const resultPromise = service.execute(authorization, currentPassword, newPassword);

    await expect(resultPromise).rejects.toThrow(IncorrectPasswordError);
  });
});