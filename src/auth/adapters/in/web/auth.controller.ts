import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminPermission } from 'src/auth/domain/models/admin-permission';
import { AdminRenewTokenService, AdminSignInService, TableParingService, UpdateAdminPermissionsService, ViewAdminPermissionsService } from 'src/auth/domain/services';
import { CurrentAdmin } from 'src/auth/utils/decorators/current-admin.decorator';
import { UseAdminGuard } from 'src/auth/utils/decorators/use-admin-guard.decorator';
import { UseAdminPermissionDeniedExceptionFilter } from 'src/auth/utils/filters/admin-permission-denied-exception.filter';
import typia from 'typia';
import { SignInAdminRequestDto, SignInAdminResponseDto, UpdateAdminPermissionsRequestDto } from './dto';
import { UseAdminSignInExceptionFilter } from './filters';
import { UseParingTableExceptionFilter } from './filters/paring-table-exception.filter';
import { UseUpdateAdminPermissionsExceptionFilter } from './filters/update-admin-permissions-exception.filter';
import { RenewTokenRequestDto, RenewTokenResponseDto } from './dto/renew-token.dto';
import { UseAdminRenewTokenExceptionFilter } from './filters/admin-renew-token-exception.filter';

@Controller({path: 'auth', version: 'api'})
export class AuthController {
  constructor(
    private readonly adminSignInService: AdminSignInService,
    private readonly renewTokenService: AdminRenewTokenService,
    private readonly viewAdminPermissionsService: ViewAdminPermissionsService,
    private readonly updateAdminPermissionsService: UpdateAdminPermissionsService,
    private readonly tableParingService: TableParingService,
  ) {}

  /**
   * 관리자 로그인.
   * 
   * @tag 인증
   */
  @TypedRoute.Post('/admin/sign-in')
  @UseAdminSignInExceptionFilter()
  adminSignIn(@TypedBody() body: SignInAdminRequestDto): Promise<SignInAdminResponseDto> {
    return this.adminSignInService.execute(body.signInId, body.password);
  }

  /**
   * 관리자 토큰 갱신.
   * 
   * @tag 인증
   */
  @TypedRoute.Post('/admin/renew-token')
  @UseAdminRenewTokenExceptionFilter()
  adminRenewToken(@TypedQuery() query: RenewTokenRequestDto): Promise<RenewTokenResponseDto> {
    return this.renewTokenService.execute(query.refreshToken);
  }

  /**
   * 특정 관리자 권한 조회.
   * 
   * @tag 인증
   * @security admin
   */
  @TypedRoute.Get('/admin/:id/permissions')
  @UseAdminGuard()
  viewAdminPermissions(@TypedParam('id') id: string): Promise<AdminPermission[]> {
    return this.viewAdminPermissionsService.execute(id);
  }

  /**
   * 특정 관리자 권한 변경.
   * - 관리자: 관리자 권한 변경 권한 필요
   * 
   * @tag 인증
   * @security admin
   */
  @TypedRoute.Put('/admin/:id/permissions')
  @UseAdminGuard()
  @UseUpdateAdminPermissionsExceptionFilter()
  @UseAdminPermissionDeniedExceptionFilter()
  updateAdminPermissions(
    @CurrentAdmin() authority: AdminAuthority,
    @TypedParam('id') id: string,
    @TypedBody() body: UpdateAdminPermissionsRequestDto,
  ): Promise<void> {
    return this.updateAdminPermissionsService.execute(authority, id, body.permissions);
  }

  /**
   * 테이블 페어링 코드 생성.
   * - 관리자: 테이블 페어링 권한 필요
   * 
   * @tag 인증
   * @security admin
   */
  @TypedRoute.Post('/table/:id/pairing-code')
  @UseAdminGuard()
  @UseAdminPermissionDeniedExceptionFilter()
  generateTablePairingCode(@CurrentAdmin() authority: AdminAuthority, @TypedParam('id') id: string): Promise<string & typia.tags.MinLength<6> & typia.tags.MaxLength<6>> {
    return this.tableParingService.generateParingCode(authority, id);
  }

  /**
   * 테이블 페어링.
   * 
   * @tag 인증
   * @response 201 {string} 테이블 access token
   */
  @TypedRoute.Post('/table/pairing')
  @UseParingTableExceptionFilter()
  paringTable(@TypedBody() body: {paringCode: string & typia.tags.MinLength<6> & typia.tags.MaxLength<6>}): Promise<string> {
    return this.tableParingService.paring(body.paringCode);
  }
}