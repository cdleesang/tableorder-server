import { TypedBody, TypedException, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, UseFilters, UseGuards, type ConflictException, type ForbiddenException, type NotFoundException, type UnauthorizedException } from '@nestjs/common';
import { DeleteAdminService, SearchAdminsService, SignUpAdminService, UpdateAdminOwnPasswordService, UpdateAdminOwnProfileService, ViewAdminOwnProfileService } from 'src/admin/domain/services';
import { CurrentAdmin } from 'src/auth/decorators/current-admin.decorator';
import type { AdminAuthorization } from 'src/auth/domain/models/admin-authorization.model';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import type { SearchRequestDto, SearchResponseDto, SignUpRequestDto, UpdateOwnPasswordRequestDto, UpdateOwnProfileRequestDto, ViewOwnProfileResponseDto } from './dto';
import { DeleteExceptionFilter, SignUpExceptionFilter, UpdateOwnPasswordExceptionFilter, UpdateOwnProfileExceptionFilter, ViewOwnProfileExceptionFilter } from './filters';

@Controller('/admin')
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
  @TypedException<ConflictException>(409, '이미 존재하는 아이디')
  @UseFilters(SignUpExceptionFilter)
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
  @UseGuards(AdminGuard)
  @TypedException<UnauthorizedException>(401, '로그인되지 않음')
  search(@TypedQuery() query: SearchRequestDto): Promise<SearchResponseDto> {
    return this.searchAdminsService.execute(query.page, query.size);
  }

  /**
   * 관리자 본인 프로필 조회.
   * 
   * @tag 관리자
   * @security admin
   */
  @TypedRoute.Get('/:id')
  @UseGuards(AdminGuard)
  @UseFilters(ViewOwnProfileExceptionFilter)
  @TypedException<UnauthorizedException>(401, '로그인되지 않음')
  @TypedException<NotFoundException>(404, '관리자를 찾을 수 없음')
  viewOwnProfile(@CurrentAdmin() adminAuthorization: AdminAuthorization): Promise<ViewOwnProfileResponseDto> {
    return this.viewAdminOwnProfileService.execute(adminAuthorization);
  }

  /**
   * 관리자 본인 프로필 수정.
   * 
   * @tag 관리자
   * @security admin
   */
  @TypedRoute.Patch('/:id')
  @UseGuards(AdminGuard)
  @UseFilters(UpdateOwnProfileExceptionFilter)
  @TypedException<UnauthorizedException>(401, '로그인되지 않음')
  @TypedException<NotFoundException>(404, '관리자를 찾을 수 없음')
  updateOwnProfile(@CurrentAdmin() adminAuthorization: AdminAuthorization, @TypedBody() body: UpdateOwnProfileRequestDto): Promise<void> {
    return this.updateAdminOwnProfileService.execute(adminAuthorization, body);
  }

  /**
   * 관리자 본인 비밀번호 수정.
   * 
   * @tag 관리자
   * @security admin
   */
  @TypedRoute.Patch('/:id/password')
  @UseGuards(AdminGuard)
  @UseFilters(UpdateOwnPasswordExceptionFilter)
  @TypedException<UnauthorizedException>(401, '로그인되지 않음')
  @TypedException<NotFoundException>(404, '관리자를 찾을 수 없음')
  @TypedException<ConflictException>(409, '현재 비밀번호가 일치하지 않음')
  updateOwnPassword(@CurrentAdmin() adminAuthorization: AdminAuthorization, @TypedBody() body: UpdateOwnPasswordRequestDto): Promise<void> {
    return this.updateAdminOwnPasswordService.execute(adminAuthorization, body.currentPassword, body.newPassword);
  }

  /**
   * 관리자 삭제.
   * 
   * @tag 관리자
   * @security admin
   */
  @TypedRoute.Delete('/:id')
  @UseGuards(AdminGuard)
  @UseFilters(DeleteExceptionFilter)
  @TypedException<UnauthorizedException>(401, '로그인되지 않음')
  @TypedException<ForbiddenException>(403, '권한 없음')
  delete(@CurrentAdmin() adminAuthorization: AdminAuthorization, @TypedParam('id') id: string): Promise<void> {
    return this.deleteAdminService.execute(adminAuthorization, id);
  }
}