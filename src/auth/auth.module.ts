import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from 'src/admin/admin.module';
import { ConfigModule } from 'src/config/config.module';
import { AuthController } from './adapters/in/web/auth.controller';
import { AdminAuthorizationRepositoryImpl } from './adapters/out/admin-authorization-repository-impl.adapter';
import { AdminGuard } from './guards/admin.guard';
import { AdminAuthorizationRepository } from './ports/out/admin-authorization-repository.port';
import { TokenService, AdminSignInService, CanAdminAccessService, UpdateAdminPermissionsService, RenewTokenService, ViewAdminPermissionsService } from './domain/services';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule,
    forwardRef(() => AdminModule),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AdminGuard,
    TokenService,
    RenewTokenService,
    AdminSignInService,
    CanAdminAccessService,
    ViewAdminPermissionsService,
    UpdateAdminPermissionsService,
    {provide: AdminAuthorizationRepository, useClass: AdminAuthorizationRepositoryImpl},
  ],
  exports: [
    AdminGuard,
    TokenService,
    CanAdminAccessService,
  ],
})
export class AuthModule {}