import { type DynamicModule, type ModuleMetadata } from '@nestjs/common';
import type { FireBirdOptions } from './types/fire-bird-options.type';
export declare class FirebirdModule {
    static forRoot(options: FireBirdOptions): DynamicModule;
    static forRootAsync(options: {
        imports?: ModuleMetadata['imports'];
        useFactory: (...args: any[]) => FireBirdOptions;
        inject?: any[];
    }): DynamicModule;
}
