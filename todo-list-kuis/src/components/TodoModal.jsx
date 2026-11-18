import { useState, useEffect } from "react";

export default function TodoModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to-do");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "to-do");
      setPriority(initialData.priority || "low");
      setDeadline(initialData.deadline || "");
    } else {
      setTitle("");
      setDescription("");
      setStatus("to-do");
      setPriority("low");
      setDeadline("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) {
      alert("Judul dan Deadline wajib diisi!");
      return;
    }

    onSubmit({
      ...(initialData ? { id: initialData.id } : {}),
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      deadline,
    });

    onClose();
  };

  const isEditMode = Boolean(initialData);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-5 text-center text-xl font-bold text-gray-900">
          {isEditMode ? "Update Todo" : "Tambah Todo"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul */}
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-800">
              Judul
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul tugas"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-800">
              Deskripsi
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi tugas"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Status & Prioritas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-800">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-bold text-gray-800">
                Prioritas
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-800">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Tombol Aksi */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded bg-red-600 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-full rounded bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {isEditMode ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}