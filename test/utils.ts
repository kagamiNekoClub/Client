import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import configureStore from '@redux/configureStore';

/**
 * JavaScript 中的 sleep 函数
 * 参考 https://github.com/sqren/await-sleep/blob/master/index.js
 * @param milliseconds 阻塞毫秒
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/**
 * 测试用的 Redux 容器
 */
export const TestReduxContainer: React.FC = (props) => {
  const store = useMemo(() => {
    return configureStore();
  }, []);

  return React.createElement(
    Provider,
    {
      store,
    },
    props.children
  );
};
