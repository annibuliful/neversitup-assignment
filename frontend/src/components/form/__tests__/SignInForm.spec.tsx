import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SignInForm, SignInFormProps } from '../SignInForm';

describe('SignInForm', () => {
  const setup = (props: Partial<SignInFormProps> = {}) => {
    const onSubmit = jest.fn();
    render(
      <SignInForm
        onSubmit={onSubmit}
        isLoading={false}
        errorMessage={null}
        {...props}
      />
    );
    return { onSubmit };
  };

  test('renders all inputs and button', () => {
    setup();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test('shows validation errors on submit if fields are empty', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('shows password length error if too short', async () => {
    setup();
    fireEvent.input(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Password must be at least 8 characters')
      ).toBeInTheDocument();
    });
  });

  test('disables submit button when isLoading is true', () => {
    setup({ isLoading: true });
    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeDisabled();
  });

  test('shows error message when errorMessage is provided', () => {
    setup({ errorMessage: 'Invalid credentials' });
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
