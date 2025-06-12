import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../../@types/todo';

const mockTodo: Todo = {
  id: '1',
  title: 'test',
  description: 'testing description',
  completed: false,
};

describe('TodoItem', () => {
  const onToggle = jest.fn();
  const onDelete = jest.fn();
  const onEdit = jest.fn();

  const renderComponent = (overrides: Partial<Todo> = {}) =>
    render(
      <TodoItem
        todo={{ ...mockTodo, ...overrides }}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders title and description', () => {
    renderComponent();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('testing description')).toBeInTheDocument();
  });

  test('checkbox toggles completed', () => {
    renderComponent();
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  test('clicking edit enables input fields', () => {
    renderComponent();
    const editButton = screen.getByTitle('Edit');
    fireEvent.click(editButton);
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('testing description')).toBeInTheDocument();
  });

  test('changing title and saving calls onEdit', () => {
    renderComponent();
    fireEvent.click(screen.getByTitle('Edit'));
    const titleInput = screen.getByDisplayValue('test');
    const descriptionInput = screen.getByDisplayValue('testing description');

    fireEvent.change(titleInput, { target: { value: 'updated title' } });
    fireEvent.change(descriptionInput, { target: { value: 'updated desc' } });

    fireEvent.click(screen.getByTitle('Save'));

    expect(onEdit).toHaveBeenCalledWith({
      id: '1',
      title: 'updated title',
      description: 'updated desc',
    });
  });

  test('clicking delete calls onDelete', () => {
    renderComponent();
    fireEvent.click(screen.getByTitle('Delete'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  test('does not call onEdit if title is empty', () => {
    renderComponent();
    fireEvent.click(screen.getByTitle('Edit'));
    const titleInput = screen.getByDisplayValue('test');
    fireEvent.change(titleInput, { target: { value: '   ' } });
    fireEvent.click(screen.getByTitle('Save'));
    expect(onEdit).not.toHaveBeenCalled();
  });
});
