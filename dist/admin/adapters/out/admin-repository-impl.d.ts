import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { Admin } from '../../domain/models/admin';
import { AdminRepository } from '../../ports/out/admin-repository';
export declare class AdminRepositoryImpl implements AdminRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    save(admin: Admin): Promise<void>;
    findAll(options: {
        page?: number;
        limit?: number;
        order?: 'oldest';
    }): Promise<Admin[]>;
    findBySignInId(signInId: string): Promise<Admin | null>;
    findById(id: string): Promise<Admin | null>;
    deleteById(id: string): Promise<void>;
    private findOne;
    private mapToDomainModel;
}
