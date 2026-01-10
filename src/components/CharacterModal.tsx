import { useState } from "react"; 
import { dataAPI } from "../api/axios";
import type { Character } from "../pages/Home";
import toast from "react-hot-toast";

type Props = {
  character: Character | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function CharacterModal({ character, onClose, onSuccess }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData();
    formData.append("name", (form.elements.namedItem("name") as HTMLInputElement).value);
    formData.append("element", (form.elements.namedItem("element") as HTMLInputElement).value);
    formData.append("region", (form.elements.namedItem("region") as HTMLInputElement).value);
    formData.append("weapon", (form.elements.namedItem("weapon") as HTMLInputElement).value);

    const fileInput = form.elements.namedItem("image") as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      formData.append("image", fileInput.files[0]);
    }

    try {
      if (character) {
        await dataAPI.patch(`/characters/edit/${character.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Data karakter diperbarui!");
      } else {
        await dataAPI.post("/characters/post", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Karakter baru ditambahkan!");
      }

      onSuccess();
    } catch (err) {
      alert("Gagal menyimpan character. Pastikan backend mendukung upload file.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">
          {character ? "Edit Character" : "Add Character"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" defaultValue={character?.name ?? ""} placeholder="Name" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" required />
          <input name="element" defaultValue={character?.element ?? ""} placeholder="Element" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" required />
          <input name="region" defaultValue={character?.region ?? ""} placeholder="Region" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" required />
          <input name="weapon" defaultValue={character?.weapon ?? ""} placeholder="Weapon" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" required />
          
          <div className="space-y-1">
            <label className="text-sm opacity-70">Character Image</label>
            <input 
              name="image" 
              type="file" 
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm" 
              required={!character} 
            />
          </div>

          {selectedFile && (
            <p className="text-xs text-green-400 italic">File terpilih: {selectedFile.name}</p>
          )}

          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded font-bold">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}