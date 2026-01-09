// src/pages/CharacterDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dataAPI } from "../api/axios";
import type { Character } from "./Home";
import { IoArrowBack } from "react-icons/io5";

export default function CharacterDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState<Character | null>(null);
    console.log("ini isi karakter by id:", character)
    console.log("ini isi imageUrl by id:", character?.imageUrl)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await dataAPI.get(`/characters/get/${id}`);
                setCharacter(res.data.data);
            } catch (err) {
                console.error("Gagal mengambil detail:", err);
                alert("Karakter tidak ditemukan");
                navigate("/home");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id, navigate]);

    if (loading) return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
            <p className="animate-pulse">Loading detail...</p>
        </div>
    );

    if (!character) return null;

    return (
        <div className="min-h-screen bg-linear-to-r from-black via-zinc-950 to-zinc-800 p-6 text-white">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-6 hover:text-purple-400 transition-colors"
                >
                    <IoArrowBack size={24} /> Back to Home
                </button>

                <div className="bg-white/10 rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img
                            src={character.imageUrl}
                            alt={character.name}
                            className="w-full h-full object-cover min-h-100"
                        />
                    </div>

                    <div className="p-8 md:w-1/2 space-y-6 flex flex-col justify-center">
                        <div>
                            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-purple-400">
                                {character.name}
                            </h1>
                            <p className="text-xl opacity-60 italic mt-2">{character.region} Region</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <p className="text-sm opacity-50 uppercase tracking-widest">Element</p>
                                <p className="text-xl font-semibold text-purple-300">{character.element}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <p className="text-sm opacity-50 uppercase tracking-widest">Weapon Type</p>
                                <p className="text-xl font-semibold text-purple-300">{character.weapon}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}