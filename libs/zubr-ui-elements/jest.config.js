module.exports = {
  name: 'zubr-ui-elements',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/zubr-ui-elements',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
