import { TypedBody, TypedException, TypedParam, TypedRoute } from '@nestia/core';
import { ConflictException, Controller, ForbiddenException, UnauthorizedException, UseFilters, UseGuards } from '@nestjs/common';
import { CurrentAdmin } from 'src/auth/decorators/current-admin.decorator';
import { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';
import { AdminPermission } from 'src/auth/domain/models/admin-permission.enum';
import { AdminSignInService, RenewTokenService, UpdateAdminPermissionsService, ViewAdminPermissionsService } from 'src/auth/domain/services';
import { AdminPermissionDeniedExceptionFilter } from 'src/auth/filters/admin-permission-denied-exception.filter';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { SignInAdminRequestDto, UpdateAdminPermissionsRequestDto } from './dto';
import { AdminSignInExceptionFilter } from './filters';
import { UpdateAdminPermissionsExceptionFilter } from './filters/update-admin-permissions-exception.filter';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly adminSignInService: AdminSignInService,
    private readonly renewTokenService: RenewTokenService,
    private readonly viewAdminPermissionsService: ViewAdminPermissionsService,
    private readonly updateAdminPermissionsService: UpdateAdminPermissionsService,
  ) {}

  /**
   * 관리자 로그인.
   * 
   * @tag 인증
   */
  @TypedRoute.Post('/admin/sign-in')
  @UseFilters(AdminSignInExceptionFilter)
  @TypedException<UnauthorizedException>(401, '로그인 실패')
  adminSignIn(@TypedBody() body: SignInAdminRequestDto): Promise<string> {
    return this.adminSignInService.execute(body.signInId, body.password);
  }

  /**
   * 관리자 토큰 갱신.
   * 
   * @tag 인증
   * @security admin
   */
  @TypedRoute.Post('/admin/renew-token')
  @UseGuards(AdminGuard)
  @TypedException<UnauthorizedException>(401, '로그인되지 않음')
  renewAdminToken(@CurrentAdmin() adminAuthorization: AdminAuthorization): Promise<string> {
    return this.renewTokenService.execute(adminAuthorization);
  }

  /**
   * 특정 관리자 권한 조회.
   * 
   * @tag 인증
   * @security admin
   */
  @TypedRoute.Get('/admin/:id/permissions')
  @UseGuards(AdminGuard)
  @TypedException<UnauthorizedException>(401, '로그인되지 않음')
  viewAdminPermissions(@TypedParam('id') id: string): Promise<AdminPermission[]> {
    return this.viewAdminPermissionsService.execute(id);
  }

  /**
   * 특정 관리자 권한 변경.
   * 
   * @tag 인증
   * @security admin
   */
  @TypedRoute.Put('/admin/:id/permissions')
  @UseGuards(AdminGuard)
  @UseFilters(UpdateAdminPermissionsExceptionFilter, AdminPermissionDeniedExceptionFilter)
  @TypedException<UnauthorizedException>(401, '로그인되지 않음')
  @TypedException<ForbiddenException>(403, '권한 없음')
  @TypedException<ConflictException>(409, '본인의 권한 변경 불가')
  updateAdminPermissions(
    @CurrentAdmin() auth: AdminAuthorization,
    @TypedParam('id') id: string,
    @TypedBody() body: UpdateAdminPermissionsRequestDto,
  ): Promise<void> {
    return this.updateAdminPermissionsService.execute(auth, id, body.permissions);
  }
}