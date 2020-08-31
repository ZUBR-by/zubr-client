module.exports = {
  name: 'zubr-components',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/zubr-components',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
