import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from 'src/admin/admin.module';
import { ConfigModule } from 'src/config/config.module';
import { TableModule } from 'src/table/table.module';
import { AuthController } from './adapters/in/web/auth.controller';
import { AdminAuthorityRepositoryImpl } from './adapters/out/admin-authority-repository-impl';
import { ParingCodeRepositoryImpl } from './adapters/out/paring-code-repository-impl';
import { AdminRenewTokenService, AdminSignInService, CanAdminAccessService, TokenService, UpdateAdminPermissionsService, ViewAdminPermissionsService } from './domain/services';
import { TableParingService } from './domain/services/table-paring.service';
import { AdminAuthorityRepository } from './ports/out/admin-authority-repository';
import { ParingCodeRepository } from './ports/out/paring-code-repository';
import { AdminGuard } from './utils/guards/admin.guard';
import { AdminRefreshTokenRepository } from './ports/out/admin-refresh-token-repository';
import { AdminRefreshTokenRepositoryImpl } from './adapters/out/admin-refresh-token-repository-impl';
import { AdminSignOutService } from './domain/services/admin-sign-out.service';
import { AdminSignOutAllService } from './domain/services/admin-sign-out-all.service';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule,
    forwardRef(() => AdminModule),
    forwardRef(() => TableModule),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AdminGuard,
    TokenService,
    AdminRenewTokenService,
    AdminSignInService,
    AdminSignOutService,
    AdminSignOutAllService,
    CanAdminAccessService,
    ViewAdminPermissionsService,
    UpdateAdminPermissionsService,
    TableParingService,
    {provide: AdminAuthorityRepository, useClass: AdminAuthorityRepositoryImpl},
    {provide: AdminRefreshTokenRepository, useClass: AdminRefreshTokenRepositoryImpl},
    {provide: ParingCodeRepository, useClass: ParingCodeRepositoryImpl},
  ],
  exports: [
    AdminGuard,
    TokenService,
    CanAdminAccessService,
  ],
})
export class AuthModule {}