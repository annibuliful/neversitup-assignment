import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthTabs } from '../AuthTabs';

describe('AuthTabs', () => {
  test('renders both Sign In and Sign Up tabs', () => {
    render(<AuthTabs isSignIn={true} onTabChange={jest.fn()} />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('highlights Sign In tab when isSignIn is true', () => {
    render(<AuthTabs isSignIn={true} onTabChange={jest.fn()} />);
    const signInButton = screen.getByText('Sign In');
    const signUpButton = screen.getByText('Sign Up');

    expect(signInButton).toHaveClass('text-brand-700');
    expect(signUpButton).toHaveClass('text-gray-400');
  });

  test('highlights Sign Up tab when isSignIn is false', () => {
    render(<AuthTabs isSignIn={false} onTabChange={jest.fn()} />);
    const signInButton = screen.getByText('Sign In');
    const signUpButton = screen.getByText('Sign Up');

    expect(signInButton).toHaveClass('text-gray-400');
    expect(signUpButton).toHaveClass('text-brand-700');
  });

  test('calls onTabChange(true) when Sign In clicked', () => {
    const onTabChange = jest.fn();
    render(<AuthTabs isSignIn={false} onTabChange={onTabChange} />);
    fireEvent.click(screen.getByText('Sign In'));
    expect(onTabChange).toHaveBeenCalledWith(true);
  });

  test('calls onTabChange(false) when Sign Up clicked', () => {
    const onTabChange = jest.fn();
    render(<AuthTabs isSignIn={true} onTabChange={onTabChange} />);
    fireEvent.click(screen.getByText('Sign Up'));
    expect(onTabChange).toHaveBeenCalledWith(false);
  });
});
