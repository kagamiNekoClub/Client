import _noop from 'lodash/noop';

// 用于处理原生模块的mock
jest.mock('react-native-fs', () => 'react-native-fs');
jest.mock('react-native-image-zoom-viewer', () => 'ImageViewer');
jest.mock('react-native-progress/Circle', () => null);
jest.mock('../src/components/Link', () => 'Link');
