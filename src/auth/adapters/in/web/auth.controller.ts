import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminPermission } from 'src/auth/domain/models/admin-permission';
import { AdminRenewTokenService, AdminSignInService, AdminSignOutAllService, AdminSignOutService, TableParingService, UpdateAdminPermissionsService, ViewAdminPermissionsService } from 'src/auth/domain/services';
import { CurrentAdmin, UseAdminGuard, UseAdminPermissionDeniedExceptionFilter } from 'src/auth/utils';
import typia from 'typia';
import { AdminSignInRequestDto, AdminSignInResponseDto, AdminSignOutRequestDto, RenewTokenRequestDto, RenewTokenResponseDto, UpdateAdminPermissionsRequestDto } from './dto';
import { UseAdminRenewTokenExceptionFilter, UseAdminSignInExceptionFilter, UseParingTableExceptionFilter, UseUpdateAdminPermissionsExceptionFilter } from './filters';

@Controller({path: 'auth', version: 'api'})
export class AuthController {
  constructor(
    private readonly adminSignInService: AdminSignInService,
    private readonly renewTokenService: AdminRenewTokenService,
    private readonly adminSignOutService: AdminSignOutService,
    private readonly adminSignOutAllService: AdminSignOutAllService,
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
  adminSignIn(@TypedBody() body: AdminSignInRequestDto): Promise<AdminSignInResponseDto> {
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
   * 관리자 로그아웃.
   * 
   * @tag 인증
   * @security admin
   */
  @TypedRoute.Post('/admin/sign-out')
  @UseAdminGuard()
  adminSignOut(@CurrentAdmin() authority: AdminAuthority, @TypedBody() body: AdminSignOutRequestDto): Promise<void> {
    return this.adminSignOutService.execute(authority, body.refreshToken);
  }

  /**
   * 관리자 모든 디바이스 로그아웃.
   * 
   * @tag 인증
   * @security admin
   */
  @TypedRoute.Post('/admin/sign-out/all')
  @UseAdminGuard()
  adminSignOutAll(@CurrentAdmin() authority: AdminAuthority): Promise<void> {
    return this.adminSignOutAllService.execute(authority);
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