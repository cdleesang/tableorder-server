import { Test } from '@nestjs/testing';
import { AdminPermissionDeniedError } from 'src/auth/domain/errors/admin-permission-denied.error';
import { DeleteAdminService } from 'src/admin/domain/services/delete-admin.service';
import { AdminRepository } from 'src/admin/ports/out/admin-repository.port';
import { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';
import { CanAdminAccessService } from 'src/auth/domain/services';
import { AdminRepositoryMock } from 'test/admin/__mocks__/admin-repository.mock';

describe('DeleteAdminService', () => {
  let service: DeleteAdminService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteAdminService,
        {
          provide: AdminRepository,
          useValue: AdminRepositoryMock,
        },
        {
          provide: CanAdminAccessService,
          useValue: {execute: () => false},
        },
      ],
    }).compile();

    service = module.get(DeleteAdminService);
    
    jest.clearAllMocks();
  });

  it('로그인된 관리자가 권한이 없으면 거부되어야 함', async () => {
    const authorization = new AdminAuthorization('1', []);
    const targetId = '2';

    const resultPromise = service.execute(authorization, targetId);

    await expect(resultPromise).rejects.toThrow(AdminPermissionDeniedError);
  });

  it('본인을 삭제하려고 하면 권한이 없어도 허용되어야 함', async () => {
    AdminRepositoryMock.deleteById.mockResolvedValue(undefined);
    
    const authorization = new AdminAuthorization('1', []);
    const targetId = '1';

    const resultPromise = service.execute(authorization, targetId);

    await expect(resultPromise).resolves.toBeUndefined();
  });
});