import { AdminAlreadyExistsError } from 'src/admin/domain/errors/admin-already-exists.error';
import { Admin } from 'src/admin/domain/models/admin.model';
import { SignUpAdminService } from 'src/admin/domain/services/sign-up-admin.service';

describe('SignUpAdminService', () => {
  let service = new SignUpAdminService({} as any);

  it('동일한 아이디로 이미 가입된 관리자가 있으면 에러가 발생해야 함', async () => {
    service = new SignUpAdminService({
      findBySignInId: async () => new Admin('1', 'admin', 'password', '관리자1'),
    } as any);

    const signInId = 'admin';
    const password = 'password';
    const name = '관리자2';

    const resultPromise = service.execute(signInId, password, name);

    await expect(resultPromise).rejects.toThrow(AdminAlreadyExistsError);
  });
});