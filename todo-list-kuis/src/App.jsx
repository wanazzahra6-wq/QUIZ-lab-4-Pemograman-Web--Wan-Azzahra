import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { dummyTodos } from "./data/dummyTodos";
import TodoList from "./pages/TodoList";
import TodoDetail from "./pages/TodoDetail";

export default function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Tambah tugas baru
  const handleAddTodo = (newTodoData) => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map((item) => item.id)) + 1 : 1;

    const newTodo = {
      id: nextId,
      ...newTodoData,
    };

    setTodos((prev) => [...prev, newTodo]);
    showToast("Tugas berhasil ditambahkan!");
  };

  // Perbarui tugas yang ada
  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === updatedTodo.id ? updatedTodo : item))
    );
    showToast("Tugas berhasil diperbarui!");
  };

  // Hapus tugas dengan konfirmasi pengguna
  const handleDeleteTodo = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus tugas ini?"
    );
    if (!isConfirmed) return;

    setTodos((prev) => prev.filter((item) => item.id !== id));
    showToast("Tugas berhasil dihapus!");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Notifikasi Umpan Balik */}
      {toastMessage && (
        <div className="fixed right-5 top-5 z-50 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          {toastMessage}
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <TodoList
              todos={todos}
              onAddTodo={handleAddTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={
            <TodoDetail todos={todos} onUpdateTodo={handleUpdateTodo} />
          }
        />
      </Routes>
    </div>
  );
}