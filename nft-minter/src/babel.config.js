presets: [
    isTestEnv && [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    (isProductionEnv || isDevelopmentEnv) && [
      '@babel/preset-env',
      {
        forceAllTransforms: true,
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false,
        exclude: ['transform-typeof-symbol']
      }
    ]
  ].filter(Boolean)