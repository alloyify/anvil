import { NpmDependency } from './interfaces';

export const NPM_DEPS: Record<string, NpmDependency> = {
  NESTJS_COMMON: {
    name: '@nestjs/common',
    version: '9.0.3',
  },
  NESTJS_CORE: {
    name: '@nestjs/core',
    version: '9.0.3',
  },
  NESTJS_PATFORM_EXPRESS: {
    name: '@nestjs/platform-express',
    version: '9.0.3',
  },
  NESTJS_MICROSERVICES: {
    name: '@nestjs/microservices',
    version: '9.0.3',
  },
  NESTJS_CONFIG: {
    name: '@nestjs/config',
    version: '2.2.0',
  },
  REFLECT_METADATA: {
    name: 'reflect-metadata',
    version: '0.1.13',
  },
  RXJS: {
    name: 'rxjs',
    version: '7.5.5',
  },
  NATS: {
    name: 'nats',
    version: '2.7.1',
  },

  ALLOYIFY_CONFIG: {
    name: '@alloyify/config',
    version: '0.4.3',
  },
  ALLOYIFY_MICROSERVICES: {
    name: '@alloyify/microservices',
    version: '0.2.3',
  },
};
