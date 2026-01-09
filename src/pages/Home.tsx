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
  imageUrl: string;
};

export default function Home() {
  const navigate = useNavigate();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = async () => {
    setLoading(true); // Pastikan loading dimulai setiap fetch
    try {
      const res = await dataAPI.get("/characters");
      
      // PERBAIKAN: Pastikan data yang dimasukkan ke state adalah Array
      // Jika backend membungkus datanya (misal res.data.data), sesuaikan di sini
      const responseData = Array.isArray(res.data) ? res.data : (res.data.data || []);
      setCharacters(responseData);
      
    } catch (err) {
      console.error("Fetch characters failed:", err);
      // Jika error 401 (Unauthorized), arahkan ke signin
      alert("Gagal mengambil data atau session habis");
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
  if (!confirm("Yakin hapus karakter ini?")) return;

  try {
    await dataAPI.delete(`/characters/delete/${id}`);
    fetchCharacters(); // refresh data
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Gagal menghapus karakter");
  }
};

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
  console.log("CHARACTERS:", characters);
}, [characters]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <p className="text-xl animate-pulse">Loading data characters...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-black via-zinc-950 to-zinc-800 p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Verence Genshin Collection Character</h1>
          <div className="flex gap-3">
            <button
              onClick={() => { setSelected(null); setShowModal(true); }}
              className="px-4 py-2 bg-white text-purple-700 rounded-lg font-semibold hover:bg-gray-100"
            >
              + Add Character
            </button>
            {/* <button className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600">
              Logout
            </button> */}
          </div>
        </div>

        {characters.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl opacity-70">Belum ada karakter yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters.map((char) => (
              <CharacterCard
                key={char.id}
                data={char}
                onEdit={() => { setSelected(char); setShowModal(true); }}
                onDelete={() => handleDelete(char.id)}
              />
            ))}
          </div>
        )}

        {showModal && (
          <CharacterModal
            character={selected}
            onClose={() => setShowModal(false)}
            onSuccess={() => { setShowModal(false); fetchCharacters(); }}
          />
        )}
      </div>
    </div>
  );
}
