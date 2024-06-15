import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './adapters/in/web/admin.controller';
import { AdminRepositoryImpl } from './adapters/out/admin-repository-impl.adapter';
import { CredentialVerificationService, DeleteAdminService, SearchAdminsService, SignUpAdminService, UpdateAdminOwnPasswordService, UpdateAdminOwnProfileService, ViewAdminOwnProfileService } from './domain/services';
import { AdminRepository } from './ports/out/admin-repository.port';
import { IsAdminActiveService } from './domain/services/is-admin-active.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
  ],
  controllers: [
    AdminController,
  ],
  providers: [
    DeleteAdminService,
    SignUpAdminService,
    SearchAdminsService,
    UpdateAdminOwnPasswordService,
    UpdateAdminOwnProfileService,
    ViewAdminOwnProfileService,
    CredentialVerificationService,
    IsAdminActiveService,
    {provide: AdminRepository, useClass: AdminRepositoryImpl},
  ],
  exports: [
    CredentialVerificationService,
    IsAdminActiveService,
  ],
})
export class AdminModule {}