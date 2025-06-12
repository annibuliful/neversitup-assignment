import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoForm } from '../TodoForm';

describe('TodoForm', () => {
  const setup = (props = { loading: false }) => {
    const onAdd = jest.fn();
    render(<TodoForm onAdd={onAdd} {...props} />);
    return { onAdd };
  };

  test('renders input fields and submit button', () => {
    setup();
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

  test('does not call onAdd if title is empty', () => {
    const { onAdd } = setup();
    fireEvent.click(screen.getByRole('button', { name: /\+ add task/i }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  test('calls onAdd with title and description', () => {
    const { onAdd } = setup();
    fireEvent.change(screen.getByPlaceholderText(/add new task title/i), {
      target: { value: 'Test task' },
    });
    fireEvent.change(screen.getByPlaceholderText(/add task description/i), {
      target: { value: 'Test description' },
    });

    fireEvent.click(screen.getByRole('button', { name: /\+ add task/i }));

    expect(onAdd).toHaveBeenCalledWith('Test task', 'Test description');
  });

  test('clears inputs after successful submission', () => {
    const { onAdd } = setup();
    const titleInput = screen.getByPlaceholderText(
      /add new task title/i
    ) as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      /add task description/i
    ) as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Desc' } });
    fireEvent.click(screen.getByRole('button', { name: /\+ add task/i }));

    expect(onAdd).toHaveBeenCalledWith('Task', 'Desc');
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  test('disables inputs and button when loading is true', () => {
    setup({ loading: true });

    expect(screen.getByPlaceholderText(/add new task title/i)).toBeDisabled();
    expect(screen.getByPlaceholderText(/add task description/i)).toBeDisabled();

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Adding...');
  });
});
