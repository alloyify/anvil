import { NpmDependency } from './interfaces';

export const ALLOYIFY_NPM_DEPS: Record<string, NpmDependency> = {
  COMMON: {
    name: '@alloyify/common',
    version: '0.1.1',
  },
  CONFIG: {
    name: '@alloyify/config',
    version: '0.5.1',
  },
  HTTP_SDK: {
    name: '@alloyify/http-sdk',
    version: '0.1.1',
  },
  MICROSERVICES: {
    name: '@alloyify/microservices',
    version: '0.4.0',
  },
  NATS_SDK: {
    name: '@alloyify/nats-sdk',
    version: '0.1.0',
  },
  UTILS: {
    name: '@alloyify/utils',
    version: '0.2.0',
  },
};

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
};
