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

const webpack = require('webpack');

/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-webpack5-compiler-babel'
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['./public'],
  webpackFinal: async config => {
    config.devtool = false;
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback.fs = false;
    config.module.rules.forEach(rule => {
      if ("a.tsx".match(rule.test)) {
        //console.log(rule.use);
        rule.use = [{
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            // Or 'ts' if you don't need tsx
            target: 'es2015'
          }
        }];
      }
    });
    config.plugins.push(new webpack.SourceMapDevToolPlugin({
      append: '\n//# sourceMappingURL=[url]',
      fileContext: './',
      filename: '[file].map'
    }));
    return config;
  },

};

export default config;
