import { useEffect, useState } from "react";
import { dataAPI } from "../api/axios";
import { useNavigate } from "react-router-dom";

import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";

export type Character = {
  id: number;
  name: string;
  element: string;
  region: string;
  weapon: string;
  image: string;
};

export default function Home() {
  const navigate = useNavigate();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 GET ALL CHARACTER (ANTI WHITE SCREEN)
  const fetchCharacters = async () => {
    try {
      const res = await dataAPI.get("/characters");
      setCharacters(res.data);
    } catch (err) {
      console.error("Fetch characters failed:", err);
      alert("Session habis, silakan login ulang");
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  // 🔹 DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus karakter ini?")) return;

    try {
      await dataAPI.delete(`/characters/${id}`);
      fetchCharacters();
    } catch (err) {
      alert("Gagal menghapus karakter");
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-purple-900 to-blue-900 p-6 text-white">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Genshin Characters</h1>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setSelected(null);
                setShowModal(true);
              }}
              className="px-4 py-2 bg-white text-purple-700 rounded-lg font-semibold"
            >
              + Add Character
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* CARD LIST */}
        {characters.length === 0 ? (
          <p className="text-center opacity-70">Belum ada karakter</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {characters.map((char) => (
              <CharacterCard
                key={char.id}
                data={char}
                onEdit={() => {
                  setSelected(char);
                  setShowModal(true);
                }}
                onDelete={() => handleDelete(char.id)}
              />
            ))}
          </div>
        )}

        {/* MODAL (SAFE) */}
        {showModal && (
          <CharacterModal
            character={selected}
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              setShowModal(false);
              fetchCharacters();
            }}
          />
        )}
      </div>
    </div>
  );
}
