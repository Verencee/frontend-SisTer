import type { Character } from "../pages/Home";

type Props = {
  data: Character;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CharacterCard({ data, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white/10 rounded-xl overflow-hidden backdrop-blur-xl border border-white/20">
      <img
        src={data.image}
        alt={data.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4 space-y-1">
        <h2 className="text-lg font-bold">{data.name}</h2>
        <p>Element: {data.element}</p>
        <p>Region: {data.region}</p>
        <p>Weapon: {data.weapon}</p>

        <div className="flex gap-2 mt-3">
          <button
            onClick={onEdit}
            className="flex-1 bg-yellow-400 text-black rounded-md py-1"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-500 rounded-md py-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
