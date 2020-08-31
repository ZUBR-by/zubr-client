module.exports = {
  name: 'zubr-web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/zubr-web',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
