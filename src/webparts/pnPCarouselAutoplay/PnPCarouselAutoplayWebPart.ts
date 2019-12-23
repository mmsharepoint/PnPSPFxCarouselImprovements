import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneToggle,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'PnPCarouselAutoplayWebPartStrings';
import PnPCarouselAutoplay from './components/PnPCarouselAutoplay';
import { IPnPCarouselAutoplayProps } from './components/IPnPCarouselAutoplayProps';

export interface IPnPCarouselAutoplayWebPartProps {
  autoLoad: boolean;
  autoLoadInterval: number;
  dotNav: boolean;
}

export default class PnPCarouselAutoplayWebPart extends BaseClientSideWebPart<IPnPCarouselAutoplayWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPCarouselAutoplayProps > = React.createElement(
      PnPCarouselAutoplay,
      {
        autoLoad: this.properties.autoLoad,
        autoLoadInterval: this.properties.autoLoadInterval,
        dotNav: this.properties.dotNav
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('autoLoad', {
                  label: strings.AutoLoadFieldLabel
                }),
                PropertyPaneSlider('autoLoadInterval', {
                  label: strings.AutoLoadIntervalFieldLabel,
                  min: 4,
                  max: 20
                }),
                PropertyPaneToggle('dotNav', {
                  label: strings.DotNavFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
