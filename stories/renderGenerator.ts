/*
   Copyright 2022 Betim Beja, AlbanianXrm

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import type { IInputs, IOutputs } from '../StyledSwitch/generated/ManifestTypes';
import type { StoryArgs } from './StoryArgs';

import { useArgs } from '@storybook/client-api';
import {
  ComponentFrameworkMockGenerator,
  StringPropertyMock,
  TwoOptionsPropertyMock,
} from '@shko.online/componentframework-mock';


import { StyledSwitch as Component } from '../StyledSwitch';

const renderGenerator = () => {
  let container: HTMLDivElement;
  let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;

  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    if (!container) {
      container = document.createElement('div');
      container.style.height = '100%';
      container.style.width = '100%';
      mockGenerator = new ComponentFrameworkMockGenerator(
        Component,
        {
          Value: TwoOptionsPropertyMock,
          FalseHandleFill: StringPropertyMock,
          FalseHandleImage: StringPropertyMock,
          FalseTrackFill: StringPropertyMock,
          TrueHandleFill: StringPropertyMock,
          TrueHandleImage: StringPropertyMock,
          TrueTrackFill: StringPropertyMock,
        },
        container,
      );

      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context._SetCanvasItems({
        Value: args.Value,
        FalseHandleFill: args.FalseHandleFill,
        FalseHandleImage: args.FalseHandleImage,
        FalseTrackFill: args.FalseTrackFill,
        TrueHandleFill: args.TrueHandleFill,
        TrueHandleImage: args.TrueHandleImage,
        TrueTrackFill: args.TrueTrackFill,
      });

      mockGenerator.onOutputChanged.callsFake(() => {
        mockGenerator.context._parameters.Value._Refresh();
        updateArgs({ Value: mockGenerator.context._parameters.Value.raw });
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context._parameters.Value._SetValue(args.Value);
      mockGenerator.context._parameters.FalseHandleFill._SetValue(args.FalseHandleFill);
      mockGenerator.context._parameters.FalseHandleImage._SetValue(args.FalseHandleImage);
      mockGenerator.context._parameters.FalseTrackFill._SetValue(args.FalseTrackFill);
      mockGenerator.context._parameters.TrueHandleFill._SetValue(args.TrueHandleFill);
      mockGenerator.context._parameters.TrueHandleImage._SetValue(args.TrueHandleImage);
      mockGenerator.context._parameters.TrueTrackFill._SetValue(args.TrueTrackFill);
    
      mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};

export default renderGenerator;

