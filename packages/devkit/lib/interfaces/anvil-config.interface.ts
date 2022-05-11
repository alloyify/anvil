export interface AnvilConfig {
  generators?: AnvilConfigGenerators;
}

export interface AnvilConfigGenerators {
  package?: AnvilConfigGeneratorsPackage;
}

export interface AnvilConfigGeneratorsPackage {
  scope?: string;
  access?: 'public' | 'restricted';
  license?: string;
  author?: {
    name?: string;
    email?: string;
  };
}
