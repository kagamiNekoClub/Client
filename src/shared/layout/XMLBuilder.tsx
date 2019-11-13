import React, { useEffect, useState, useReducer } from 'react';
import parser, { XMLElement } from './parser/xml-parser';
import * as processor from './processor';
import _clone from 'lodash/clone';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';
import './tags/__all__';
import Debug from 'debug';
const debug = Debug('trpg:XMLBuilder');
import styled from 'styled-components';
import { ILayoutTypeAttributes } from './tags/Base';
import { StateDataType, StateActionType } from './types';

export type DefinePropsType = {
  [name: string]: any;
};
interface DefineMap {
  [name: string]: (
    context: XMLBuilderContext,
    otherProps: DefinePropsType
  ) => React.FunctionComponentElement<ILayoutTypeAttributes>;
}

interface GlobalMap {
  [name: string]: StateDataType;
}

export interface DataMap {
  [name: string]: StateDataType;
}

export type LayoutType = 'edit' | 'detail';

export interface XMLBuilderState {
  defines: DefineMap;
  global: GlobalMap;
  data: DataMap;
}

export interface XMLBuilderAction {
  type: string;
  payload: { [name: string]: any };
  [others: string]: any;
}

export interface XMLBuilderContext {
  state: XMLBuilderState;
  dispatch: React.Dispatch<XMLBuilderAction>;
  layoutType: LayoutType;
}

type stateChangeHandler = (newState: XMLBuilderState) => void;

const XMLBuilderContainer = styled.div`
  text-align: left;

  pre {
    margin: 0;
  }
`;

const buildReducer = (onChange?: stateChangeHandler) => {
  const XMLBuilderReducer = (
    prevState: XMLBuilderState,
    action: XMLBuilderAction
  ): XMLBuilderState => {
    const type = action.type;
    const payload = action.payload;
    const newState = _clone(prevState);
    debug(`[Action] ${type}: %o`, payload);

    switch (type) {
      case StateActionType.UpdateData: {
        const scope = action.scope || 'data';
        newState[scope] = payload;
        break;
      }
      case StateActionType.AddDefine:
        newState.defines[payload.name] = payload.componentFn;
        break;
    }

    onChange && onChange(newState);

    return newState;
  };

  return XMLBuilderReducer;
};

interface Props {
  xml: string;
  layoutType?: LayoutType;
  initialData?: DataMap;
  onChange?: stateChangeHandler;
}
const XMLBuilder = (props: Props) => {
  const { xml = '', onChange, layoutType = 'edit' } = props;
  const [layout, setLayout] = useState({});

  const initialState: XMLBuilderState = {
    defines: {},
    global: {},
    data: props.initialData || {},
  };
  const [state, dispatch] = useReducer(buildReducer(onChange), initialState);

  useEffect(() => {
    const layout = parser(xml);
    layout.type = 'root';
    console.log('layout', layout);
    setLayout(layout);
  }, [xml]);

  if (_isEmpty(layout)) {
    return null;
  }

  return (
    <XMLBuilderContainer>
      {processor.render(layout, { state, dispatch, layoutType })}
    </XMLBuilderContainer>
  );
};

export default XMLBuilder;
