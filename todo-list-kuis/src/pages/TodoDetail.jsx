import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoModal from "../components/TodoModal";

export default function TodoDetail({ todos, onUpdateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const todo = todos.find((item) => item.id === Number(id));

  if (!todo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-gray-600">Tugas tidak ditemukan.</p>
        <button
          onClick={() => navigate("/")}
          className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Kolom Kiri: Judul & Deskripsi */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <h2 className="text-base font-bold text-gray-900">Judul</h2>
              <p className="mt-1 text-sm text-gray-700">{todo.title}</p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900">Deskripsi</h2>
              <div className="mt-1 min-h-[100px] whitespace-pre-line rounded border border-gray-200 p-3 text-sm text-gray-700">
                {todo.description || "-"}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Status, Prioritas, Deadline & Tombol */}
          <div className="flex flex-col justify-between md:col-span-1">
            <div className="space-y-3">
              <div>
                <h2 className="text-base font-bold text-gray-900">Status</h2>
                <p className="text-sm text-gray-700">{todo.status}</p>
              </div>

              <div>
                <h2 className="text-base font-bold text-gray-900">Prioritas</h2>
                <p className="text-sm text-gray-700">{todo.priority}</p>
              </div>

              <div>
                <h2 className="text-base font-bold text-gray-900">Deadline</h2>
                <p className="text-sm text-gray-700">{todo.deadline}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate("/")}
                className="w-full rounded bg-red-600 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Kembali
              </button>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="w-full rounded bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Update Todo */}
      <TodoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={onUpdateTodo}
        initialData={todo}
      />
    </div>
  );
}