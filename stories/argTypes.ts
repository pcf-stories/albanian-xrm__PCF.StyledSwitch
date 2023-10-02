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

import type { ArgTypes } from '@storybook/html';
import type { StoryArgs } from './StoryArgs';
import { getFromResource } from './getFromResource';

export const argTypes: Partial<ArgTypes<StoryArgs>> = {
  isDisabled: {
    name: 'Disabled',
    control: 'boolean',
    table: {
      category: 'Mode',
      defaultValue: { summary: 'false' },
    },
  },
  isVisible: {
    name: 'Visible',
    control: 'boolean',
    table: {
      category: 'Mode',
      defaultValue: { summary: 'true' },
    },
  },
  Value:{
      name: getFromResource('Property_Display_Key'),
      description: getFromResource('Property_Desc_Key'),
      control: 'boolean',
      table: {
        category: 'Parameters'
      },
    },
  FalseHandleFill: {
      name: getFromResource('False_Handle_Fill_Display_Key'),
      description: getFromResource('False_Handle_Fill_Desc_Key'),
      control: { type: 'color' },
      table: {
        category: 'Parameters',
      },
    },
  FalseHandleImage: {
    name: getFromResource('False_Handle_Image_Display_Key'),
    description: getFromResource('False_Handle_Image_Desc_Key'),
    control: { type: 'text' },
    table: {
      category: 'Parameters',
    },
  },
  FalseTrackFill:{
    name: getFromResource('False_Track_Fill_Display_Key'),
    description: getFromResource('False_Track_Fill_Desc_Key'),
    control: { type: 'color' },
    table: {
      category: 'Parameters',
    },
  },
  TrueHandleFill: {
    name: getFromResource('True_Handle_Fill_Display_Key'),
    description: getFromResource('True_Handle_Fill_Desc_Key'),
    control: { type: 'color' },
    table: {
      category: 'Parameters',
    },
  },
  TrueHandleImage: {
    name: getFromResource('True_Handle_Image_Display_Key'),
    description: getFromResource('True_Handle_Image_Desc_Key'),
    control: { type: 'text' },
    table: {
      category: 'Parameters',
    },
  },
  TrueTrackFill: {
    name: getFromResource('True_Track_Fill_Display_Key'),
    description: getFromResource('True_Track_Fill_Desc_Key'),
    control: { type: 'color' },
    table: {
      category: 'Parameters',
    },
  }
};
