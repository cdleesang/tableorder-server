import { AdminNotFoundError } from 'src/admin/domain/errors/admin-not-found.error';
import { IncorrectPasswordError } from 'src/admin/domain/errors/incorrect-password.error';
import { Admin } from 'src/admin/domain/models/admin.model';
import { UpdateAdminOwnPasswordService } from 'src/admin/domain/services/update-admin-own-password.service';
import { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';

describe('UpdateAdminOwnPasswordService', () => {
  const repository = {findById: () => {}} as any;
  const service = new UpdateAdminOwnPasswordService(repository);

  it('대상 관리자가 없으면 에러가 발생해야 함', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(undefined);

    const authorization = new AdminAuthorization('1', []);
    const currentPassword = 'password';
    const newPassword = 'new-password';

    const resultPromise = service.execute(authorization, currentPassword, newPassword);

    await expect(resultPromise).rejects.toThrow(AdminNotFoundError);
  });

  it('기존의 비밀번호가 일치하지 않으면 에러가 발생해야 함', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(new Admin('1', 'admin', 'password', '관리자'));

    const authorization = new AdminAuthorization('1', []);
    const currentPassword = 'wrong-password';
    const newPassword = 'new-password';

    const resultPromise = service.execute(authorization, currentPassword, newPassword);

    await expect(resultPromise).rejects.toThrow(IncorrectPasswordError);
  });
});