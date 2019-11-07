import React from 'react';
import Base, { LayoutTypeContext } from './Base';
import { Tabs } from 'antd';
import { XMLElement } from '../parser/xml-parser';
import { TabsPosition } from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;

export default class TTabs extends Base {
  name = 'Tabs';

  getEditView({ tagName, attributes, elements, context }: LayoutTypeContext) {
    const position = (attributes.position as TabsPosition) || 'top';
    const childrens = (elements || [])
      .filter((el) => el.name === 'Tab')
      .map((el, index) => {
        const label = el.attributes.label || '';
        return (
          <TabPane tab={label} key={`${label}#${index}`}>
            {this.renderChildren(el.elements, context)}
          </TabPane>
        );
      });

    return (
      <Tabs key={attributes.key} tabPosition={position}>
        {childrens}
      </Tabs>
    );
  }
}