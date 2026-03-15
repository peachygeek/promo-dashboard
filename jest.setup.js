// RN 0.76 Switch component has a broken jest mock that causes
// @testing-library/react-native host-component detection to fail.
jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
  const { forwardRef, createElement } = require('react');
  const { View } = require('react-native');
  return forwardRef(function MockSwitch(props, ref) {
    return createElement(View, { ref, ...props });
  });
});
