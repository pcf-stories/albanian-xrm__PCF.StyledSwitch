import React from 'react';

import { IAppProps } from '@albanian-xrm/styled-switch/App.types';
import useAppController from '@albanian-xrm/styled-switch/App.controller';
import UISwitch from '@albanian-xrm/styled-switch/UISwitch';
import StyleContext from './StyleContext';

const App = (props: IAppProps) => {
  const { context, disabled, onChecked, value } = useAppController(props);
  return (
    <StyleContext.Provider value={context}>
      <UISwitch checked={value} disabled={disabled} onChange={(event, checked) => onChecked(checked)} />
    </StyleContext.Provider>
  );
};

export default App;
