import { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import { AdminPermission } from 'src/auth/domain/models/admin-permission';
import { AdminRenewTokenService, AdminSignInService, AdminSignOutAllService, AdminSignOutService, TableParingService, UpdateAdminPermissionsService, ViewAdminPermissionsService } from 'src/auth/domain/services';
import typia from 'typia';
import { AdminSignInRequestDto, AdminSignInResponseDto, AdminSignOutRequestDto, RenewTokenRequestDto, RenewTokenResponseDto, UpdateAdminPermissionsRequestDto } from './dto';
export declare class AuthController {
    private readonly adminSignInService;
    private readonly renewTokenService;
    private readonly adminSignOutService;
    private readonly adminSignOutAllService;
    private readonly viewAdminPermissionsService;
    private readonly updateAdminPermissionsService;
    private readonly tableParingService;
    constructor(adminSignInService: AdminSignInService, renewTokenService: AdminRenewTokenService, adminSignOutService: AdminSignOutService, adminSignOutAllService: AdminSignOutAllService, viewAdminPermissionsService: ViewAdminPermissionsService, updateAdminPermissionsService: UpdateAdminPermissionsService, tableParingService: TableParingService);
    adminSignIn(body: AdminSignInRequestDto): Promise<AdminSignInResponseDto>;
    adminRenewToken(query: RenewTokenRequestDto): Promise<RenewTokenResponseDto>;
    adminSignOut(authority: AdminAuthority, body: AdminSignOutRequestDto): Promise<void>;
    adminSignOutAll(authority: AdminAuthority): Promise<void>;
    viewAdminPermissions(id: string): Promise<AdminPermission[]>;
    updateAdminPermissions(authority: AdminAuthority, id: string, body: UpdateAdminPermissionsRequestDto): Promise<void>;
    generateTablePairingCode(authority: AdminAuthority, id: string): Promise<string & typia.tags.MinLength<6> & typia.tags.MaxLength<6>>;
    paringTable(body: {
        paringCode: string & typia.tags.MinLength<6> & typia.tags.MaxLength<6>;
    }): Promise<string>;
}
