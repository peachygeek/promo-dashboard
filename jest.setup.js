jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
  const React = jest.requireActual('react');
  const Component = class SwitchMock extends React.Component {
    render() {
      return React.createElement('RCTSwitch', this.props, this.props.children);
    }
  };
  Component.displayName = 'Switch';
  return {
    __esModule: true,
    default: Component,
  };
});

try {
  const { configureInternal } = require('@testing-library/react-native/build/config');

  configureInternal({
    hostComponentNames: {
      text: 'Text',
      textInput: 'TextInput',
      image: 'Image',
      switch: 'RCTSwitch',
      scrollView: 'RCTScrollView',
      modal: 'Modal',
    },
  });
} catch (_) {
}
