import * as React from 'react'

interface ISidebarProps {
  list?: any[];
}

interface ISidebarState {
  opened: boolean;
}

export default class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  state: ISidebarState = {
    opened: true
  };

  render() {
    return <div>Sidebar here we go</div>;
  }
}
