import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
          className="rounded-xl bg-rose-500 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-600"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-rose-100 bg-white p-7 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Kolom Kiri: Judul & Deskripsi */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Judul
              </h2>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {todo.title}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Deskripsi
              </h2>
              <div className="mt-2 min-h-[115px] whitespace-pre-line rounded-xl border border-rose-100 bg-rose-50/30 p-3.5 text-sm leading-relaxed text-gray-700">
                {todo.description || "-"}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Status, Prioritas, Deadline & Tombol */}
          <div className="flex flex-col justify-between border-t border-rose-50 pt-4 md:col-span-1 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <div className="space-y-4">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Status
                </h2>
                <span
                  className={`mt-1 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
                    statusBadgeStyle[todo.status] ||
                    "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {todo.status}
                </span>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Prioritas
                </h2>
                <span
                  className={`mt-1 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
                    priorityBadgeStyle[todo.priority] ||
                    "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {todo.priority}
                </span>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Deadline
                </h2>
                <p className="mt-1 text-sm font-semibold text-gray-700">
                  {todo.deadline}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => navigate("/")}
                className="w-full rounded-xl bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Kembali
              </button>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="w-full rounded-xl bg-rose-500 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-rose-600"
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