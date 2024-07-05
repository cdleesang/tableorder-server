import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { DeleteAdminService, SearchAdminsService, SignUpAdminService, UpdateAdminOwnPasswordService, UpdateAdminOwnProfileService, ViewAdminOwnProfileService } from 'src/admin/domain/services';
import type { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { CurrentAdmin } from 'src/auth/utils/decorators/current-admin.decorator';
import { UseAdminGuard } from 'src/auth/utils/decorators/use-admin-guard.decorator';
import { UseAdminPermissionDeniedExceptionFilter } from 'src/auth/utils/filters/admin-permission-denied-exception.filter';
import type { SearchRequestDto, SearchResponseDto, SignUpRequestDto, UpdateOwnPasswordRequestDto, UpdateOwnProfileRequestDto, ViewOwnProfileResponseDto } from './dto';
import { UseSignUpExceptionFilter, UseUpdateOwnPasswordExceptionFilter, UseUpdateOwnProfileExceptionFilter, UseViewOwnProfileExceptionFilter } from './filters';

@Controller({path: 'admin', version: 'api'})
export class AdminController {
  constructor(
    private readonly signUpAdminService: SignUpAdminService,
    private readonly searchAdminsService: SearchAdminsService,
    private readonly viewAdminOwnProfileService: ViewAdminOwnProfileService,
    private readonly updateAdminOwnProfileService: UpdateAdminOwnProfileService,
    private readonly updateAdminOwnPasswordService: UpdateAdminOwnPasswordService,
    private readonly deleteAdminService: DeleteAdminService,
  ) {}

  /**
   * 관리자 회원가입.
   * 
   * @tag 관리자
   */
  @TypedRoute.Post('/sign-up')
  @UseSignUpExceptionFilter()
  signUp(@TypedBody() body: SignUpRequestDto): Promise<void> {
    return this.signUpAdminService.execute(body.signInId, body.password, body.name);
  }

  /**
   * 관리자 조회.
   * 
   * @tag 관리자
   * @security admin
   */
  @TypedRoute.Get('/')
  @UseAdminGuard()
  search(@TypedQuery() query: SearchRequestDto): Promise<SearchResponseDto> {
    return this.searchAdminsService.execute(query.page, query.size);
  }

  /**
   * 관리자 본인 프로필 조회.
   * 
   * @tag 관리자
   * @security admin
   */
  @TypedRoute.Get('/self')
  @UseAdminGuard()
  @UseViewOwnProfileExceptionFilter()
  viewOwnProfile(@CurrentAdmin() authority: AdminAuthority): Promise<ViewOwnProfileResponseDto> {
    return this.viewAdminOwnProfileService.execute(authority);
  }

  /**
   * 관리자 본인 프로필 수정.
   * 
   * @tag 관리자
   * @security admin
   */
  @TypedRoute.Patch('/self')
  @UseAdminGuard()
  @UseUpdateOwnProfileExceptionFilter()
  updateOwnProfile(@CurrentAdmin() authority: AdminAuthority, @TypedBody() body: UpdateOwnProfileRequestDto): Promise<void> {
    return this.updateAdminOwnProfileService.execute(authority, body);
  }

  /**
   * 관리자 본인 비밀번호 수정.
   * 
   * @tag 관리자
   * @security admin
   */
  @TypedRoute.Patch('/self/password')
  @UseAdminGuard()
  @UseUpdateOwnPasswordExceptionFilter()
  updateOwnPassword(@CurrentAdmin() authority: AdminAuthority, @TypedBody() body: UpdateOwnPasswordRequestDto): Promise<void> {
    return this.updateAdminOwnPasswordService.execute(authority, body.currentPassword, body.newPassword);
  }

  /**
   * 관리자 삭제.
   * - 관리자: 관리자 삭제 권한 필요
   * 
   * @tag 관리자
   * @security admin
   */
  @TypedRoute.Delete('/:id')
  @UseAdminGuard()
  @UseAdminPermissionDeniedExceptionFilter()
  delete(@CurrentAdmin() authority: AdminAuthority, @TypedParam('id') id: string): Promise<void> {
    return this.deleteAdminService.execute(authority, id);
  }
}