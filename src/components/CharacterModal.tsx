import { dataAPI } from "../api/axios";
import type { Character } from "../pages/Home";

type Props = {
  character: Character | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function CharacterModal({ character, onClose, onSuccess }: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      element: (form.elements.namedItem("element") as HTMLInputElement).value,
      region: (form.elements.namedItem("region") as HTMLInputElement).value,
      weapon: (form.elements.namedItem("weapon") as HTMLInputElement).value,
      image: (form.elements.namedItem("image") as HTMLInputElement).value,
    };

    try {
      if (character) {
        await dataAPI.put(`/characters/edit/${character.id}`, payload);
      } else {
        await dataAPI.post("/characters/post", payload);
      }

      onSuccess();
    } catch (err) {
      alert("Gagal menyimpan character");
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
          <input name="name" defaultValue={character?.name ?? ""} placeholder="Name" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" />
          <input name="element" defaultValue={character?.element ?? ""} placeholder="Element" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" />
          <input name="region" defaultValue={character?.region ?? ""} placeholder="Region" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" />
          <input name="weapon" defaultValue={character?.weapon ?? ""} placeholder="Weapon" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" />
          <input name="image" defaultValue={character?.imageUrl ?? ""} placeholder="Image URL" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" />

          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-purple-600 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-400 text-black py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
