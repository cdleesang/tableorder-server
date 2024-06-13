import { type DynamicModule, type ModuleMetadata } from '@nestjs/common';
import { OPTION_INJECT_KEY } from './constants/option-inject-key.constant';
import { FirebirdService } from './firebird.service';
import type { FireBirdOptions } from './types/fire-bird-options.type';

export class FirebirdModule {
  static forRoot(options: FireBirdOptions): DynamicModule {
    return {
      module: FirebirdModule,
      providers: [
        FirebirdService,
        {provide: OPTION_INJECT_KEY, useValue: options},
      ],
      exports: [FirebirdService],
    };
  }

  static forRootAsync(options: {
    imports?: ModuleMetadata['imports'],
    useFactory: (...args: any[]) => FireBirdOptions,
    inject?: any[],
  }): DynamicModule {
    return {
      module: FirebirdModule,
      imports: options.imports,
      providers: [
        FirebirdService,
        {
          provide: OPTION_INJECT_KEY,
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ],
      exports: [FirebirdService],
    };
  }
}