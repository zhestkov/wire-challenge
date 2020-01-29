import * as React from 'react'

interface IHeaderProps {
  title: string;
}

interface IHeaderState {
  sticky: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    sticky: false
  };

  render() {
    return <div>My Header</div>;
  }
}
