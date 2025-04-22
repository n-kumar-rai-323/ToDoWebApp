'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { XIcon } from 'lucide-react';
// import { CheckIcon, PencilIcon, TrashIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
// import { CheckIcon, PencilIcon, TrashIcon, XIcon } from '@radix-ui/react-icons';

const Todo = () => {
  const [adds, setAdd] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const addHandled = () => {
    if (inputText.trim() !== '') {
      setAdd([...adds, { id: Date.now(), text: inputText }]);
      setInputText('');
    }
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };

  const handleSave = (id) => {
    setAdd(
      adds.map((todo) =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const handleDelete = (id) => {
    setAdd(adds.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My ToDo List</h1>
      <div className="flex flex-row flex-nowrap space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={inputText}
          onChange={handleInputChange}
          className="flex-grow"
        />
        <Button onClick={addHandled} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md">
          Add
        </Button>
      </div>
      <ul className="space-y-2">
        {adds.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-100 rounded-md p-3"
          >
            {editId === todo.id ? (
              <div className="flex items-center space-x-2 flex-grow">
                <Input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                  className="flex-grow rounded-md"
                />
                <Button
                  size="sm"
                  onClick={() => handleSave(todo.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
                >
                  <CheckIcon  className="h-4 w-4" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-md"
                >
                  <XIcon className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <span className="text-gray-700 flex-grow">{todo.text}</span>
                <div className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                  >
                    <Pencil1Icon className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {adds.length === 0 && (
        <p className="text-gray-500 mt-4 text-center">No tasks yet. Add something to do!</p>
      )}
    </div>
  );
};

export default Todo;