import { render } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  window.matchMedia = window.matchMedia || function() {
    return { matches: false, addEventListener: () => {}, removeEventListener: () => {} };
  };
});

test('renders without crashing', () => {
  render(<App />);
});
