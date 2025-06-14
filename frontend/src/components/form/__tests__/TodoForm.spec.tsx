import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TodoForm } from '../TodoForm';
import '@testing-library/jest-dom';

describe('TodoForm', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    mockOnAdd.mockReset();
  });

  it('renders input fields and submit button', () => {
    render(<TodoForm onAdd={mockOnAdd} loading={false} />);

    expect(
      screen.getByPlaceholderText(/add new task title/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/add task description/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /\+ add task/i })
    ).toBeInTheDocument();
  });

  it('shows validation error if title is empty', async () => {
    render(<TodoForm onAdd={mockOnAdd} loading={false} />);
    fireEvent.submit(screen.getByRole('button'));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('shows error for title shorter than 3 characters', async () => {
    render(<TodoForm onAdd={mockOnAdd} loading={false} />);
    fireEvent.change(screen.getByPlaceholderText(/add new task title/i), {
      target: { value: 'Hi' },
    });
    fireEvent.submit(screen.getByRole('button'));

    expect(
      await screen.findByText(/at least 3 characters/i)
    ).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('calls onAdd with correct values and resets form', async () => {
    render(<TodoForm onAdd={mockOnAdd} loading={false} />);
    const titleInput = screen.getByPlaceholderText(/add new task title/i);
    const descriptionInput =
      screen.getByPlaceholderText(/add task description/i);

    fireEvent.change(titleInput, { target: { value: 'My Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Details here' } });

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith('My Task', 'Details here');
    });

    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
  });

  it('disables inputs and button when loading is true', () => {
    render(<TodoForm onAdd={mockOnAdd} loading={true} />);

    expect(screen.getByPlaceholderText(/add new task title/i)).toBeDisabled();
    expect(screen.getByPlaceholderText(/add task description/i)).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent(/adding/i);
  });
});
