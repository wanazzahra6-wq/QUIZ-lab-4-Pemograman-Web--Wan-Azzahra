import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import TodoModal from "../components/TodoModal";

export default function TodoList({ todos, onAddTodo, onDeleteTodo }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Tambah Todo
        </button>
      </div>

      {/* Tabel Daftar Tugas */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-800">
          <thead>
            <tr className="text-gray-900">
              <th className="px-4 py-3 font-bold">Judul</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold">Prioritas</th>
              <th className="px-4 py-3 font-bold">Deadline</th>
              <th className="px-4 py-3 text-center font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 border border-gray-200 bg-white">
            {todos.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  Belum ada daftar tugas. Klik "Tambah Todo" untuk membuat tugas baru.
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id} className="hover:bg-gray-50">
                  <td
                    className="max-w-[210px] truncate px-4 py-3.5"
                    title={todo.title}
                  >
                    {todo.title}
                  </td>
                  <td className="px-4 py-3.5">{todo.status}</td>
                  <td className="px-4 py-3.5">{todo.priority}</td>
                  <td className="px-4 py-3.5">{todo.deadline}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => navigate(`/todo/${todo.id}`)}
                        title="Lihat Detail"
                        className="rounded bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteTodo(todo.id)}
                        title="Hapus Tugas"
                        className="rounded bg-red-600 p-2 text-white transition hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Todo */}
      <TodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={onAddTodo}
      />
    </div>
  );
}