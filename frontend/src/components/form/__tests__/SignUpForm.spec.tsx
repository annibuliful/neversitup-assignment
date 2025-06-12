import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SignUpForm, SignUpFormProps } from '../SignUpForm';

describe('SignUpForm', () => {
  const setup = (props: Partial<SignUpFormProps> = {}) => {
    const onSubmit = jest.fn();
    render(
      <SignUpForm
        onSubmit={onSubmit}
        isLoading={false}
        errorMessage={null}
        {...props}
      />
    );
    return { onSubmit };
  };

  test('renders username and password fields with submit button', () => {
    setup();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test('shows validation errors on submit without input', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('shows password length error if password too short', async () => {
    setup();
    fireEvent.input(screen.getByLabelText(/username/i), {
      target: { value: 'tester' },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Password must be at least 8 characters')
      ).toBeInTheDocument();
    });
  });

  test('displays error message if provided', () => {
    setup({ errorMessage: 'Username already exists' });

    expect(screen.getByText('Username already exists')).toBeInTheDocument();
  });
});
