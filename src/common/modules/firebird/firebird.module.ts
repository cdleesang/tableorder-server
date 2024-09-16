import { type DynamicModule, type ModuleMetadata } from '@nestjs/common';
import { OPTION_INJECT_KEY } from './constants';
import { FirebirdService } from './firebird.service';
import type { FireBirdOptions } from './types';

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