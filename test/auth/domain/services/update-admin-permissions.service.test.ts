import { Test } from '@nestjs/testing';
import { AdminPermissionDeniedError } from 'src/auth/domain/errors/admin-permission-denied.error';
import { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';
import { AdminPermission } from 'src/auth/domain/models/admin-permission.enum';
import { UpdateAdminPermissionsService } from 'src/auth/domain/services';
import { AdminAuthorizationRepository } from 'src/auth/ports/out/admin-authorization-repository.port';
import { AdminAuthorizationRepositoryMock } from 'test/auth/__mocks__/admin-authorization-repository.mock';

describe('UpdateAdminPermissionsService', () => {
  let service: UpdateAdminPermissionsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateAdminPermissionsService,
        {
          provide: AdminAuthorizationRepository,
          useValue: AdminAuthorizationRepositoryMock,
        },
      ],
    }).compile();
    
    service = module.get(UpdateAdminPermissionsService);

    AdminAuthorizationRepositoryMock.findByAdminId.mockReset();
    AdminAuthorizationRepositoryMock.save.mockReset();
  });

  it('본인의 권한을 변경하려고 하면 거부되어야 함', async () => {
    const authorization = new AdminAuthorization('1', []);
    const targetId = '1';
    const newPermissions = [AdminPermission.MANAGE_ADMIN_PERMISSION];

    const resultPromise = service.execute(authorization, targetId, newPermissions);

    await expect(resultPromise).rejects.toThrow(AdminPermissionDeniedError);
  });

  it('로그인된 관리자가 권한이 없으면 거부되어야 함', async () => {
    const authorization = new AdminAuthorization('1', []);
    const targetId = '2';
    const newPermissions = [AdminPermission.MANAGE_ADMIN_PERMISSION];

    const resultPromise = service.execute(authorization, targetId, newPermissions);

    await expect(resultPromise).rejects.toThrow(AdminPermissionDeniedError);
  });
});