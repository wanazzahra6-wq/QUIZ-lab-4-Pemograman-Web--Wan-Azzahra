import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2, Plus } from "lucide-react";
import TodoModal from "../components/TodoModal";

const statusBadgeStyle = {
  "to-do": "bg-slate-100 text-slate-600 border-slate-200",
  "in progress": "bg-sky-50 text-sky-600 border-sky-200",
  done: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

const priorityBadgeStyle = {
  low: "bg-teal-50 text-teal-600 border-teal-200",
  medium: "bg-amber-50 text-amber-600 border-amber-200",
  high: "bg-rose-50 text-rose-600 border-rose-200",
};

export default function TodoList({ todos, onAddTodo, onDeleteTodo }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Todo List
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola daftar tugas dan jadwal pengerjaanmu dengan rapi
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 active:scale-[0.99]"
        >
          <Plus size={18} />
          Tambah Todo
        </button>
      </div>

      {/* Card Tabel Daftar Tugas */}
      <div className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-rose-100 bg-rose-50/60 text-gray-700">
                <th className="px-5 py-4 font-bold">Judul</th>
                <th className="px-5 py-4 font-bold">Status</th>
                <th className="px-5 py-4 font-bold">Prioritas</th>
                <th className="px-5 py-4 font-bold">Deadline</th>
                <th className="px-5 py-4 text-center font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {todos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-400">
                    Belum ada daftar tugas. Klik &quot;Tambah Todo&quot; untuk membuat tugas baru.
                  </td>
                </tr>
              ) : (
                todos.map((todo) => (
                  <tr
                    key={todo.id}
                    className="transition-colors hover:bg-rose-50/30"
                  >
                    <td
                      className="max-w-[230px] truncate px-5 py-4 font-semibold text-gray-800"
                      title={todo.title}
                    >
                      {todo.title}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
                          statusBadgeStyle[todo.status] ||
                          "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        {todo.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
                          priorityBadgeStyle[todo.priority] ||
                          "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        {todo.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-600">
                      {todo.deadline}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/todo/${todo.id}`)}
                          title="Lihat Detail"
                          className="rounded-lg bg-sky-500 p-2 text-white shadow-xs transition hover:bg-sky-600"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteTodo(todo.id)}
                          title="Hapus Tugas"
                          className="rounded-lg bg-rose-500 p-2 text-white shadow-xs transition hover:bg-rose-600"
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