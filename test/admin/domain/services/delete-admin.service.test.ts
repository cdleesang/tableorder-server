import { AdminPermissionDeniedError } from 'src/admin/domain/errors/admin-permission-denied.error';
import { DeleteAdminService } from 'src/admin/domain/services/delete-admin.service';
import { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';

describe('DeleteAdminService', () => {
  const service = new DeleteAdminService({execute: () => false} as any, {} as any);

  it('로그인된 관리자가 권한이 없으면 거부되어야 함', async () => {
    const authorization = new AdminAuthorization('1', []);
    const targetId = '2';

    const resultPromise = service.execute(authorization, targetId);

    await expect(resultPromise).rejects.toThrow(AdminPermissionDeniedError);
  });
});