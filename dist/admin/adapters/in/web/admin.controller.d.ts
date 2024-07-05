import { DeleteAdminService, SearchAdminsService, SignUpAdminService, UpdateAdminOwnPasswordService, UpdateAdminOwnProfileService, ViewAdminOwnProfileService } from 'src/admin/domain/services';
import type { AdminAuthority } from 'src/auth/domain/models/admin-authority';
import type { SearchRequestDto, SearchResponseDto, SignUpRequestDto, UpdateOwnPasswordRequestDto, UpdateOwnProfileRequestDto, ViewOwnProfileResponseDto } from './dto';
export declare class AdminController {
    private readonly signUpAdminService;
    private readonly searchAdminsService;
    private readonly viewAdminOwnProfileService;
    private readonly updateAdminOwnProfileService;
    private readonly updateAdminOwnPasswordService;
    private readonly deleteAdminService;
    constructor(signUpAdminService: SignUpAdminService, searchAdminsService: SearchAdminsService, viewAdminOwnProfileService: ViewAdminOwnProfileService, updateAdminOwnProfileService: UpdateAdminOwnProfileService, updateAdminOwnPasswordService: UpdateAdminOwnPasswordService, deleteAdminService: DeleteAdminService);
    signUp(body: SignUpRequestDto): Promise<void>;
    search(query: SearchRequestDto): Promise<SearchResponseDto>;
    viewOwnProfile(authority: AdminAuthority): Promise<ViewOwnProfileResponseDto>;
    updateOwnProfile(authority: AdminAuthority, body: UpdateOwnProfileRequestDto): Promise<void>;
    updateOwnPassword(authority: AdminAuthority, body: UpdateOwnPasswordRequestDto): Promise<void>;
    delete(authority: AdminAuthority, id: string): Promise<void>;
}
