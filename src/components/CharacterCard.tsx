import { useNavigate } from "react-router-dom";
import type { Character } from "../pages/Home";

type Props = {
  data: Character;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CharacterCard({ data, onEdit, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white/10 rounded-xl overflow-hidden backdrop-blur-xl border border-white/20 group hover:border-purple-500/50 transition-all duration-300 shadow-lg">
      <div 
        className="cursor-pointer" 
        onClick={() => navigate(`/character/${data.id}`)}
      >
        <div className="overflow-hidden">
          <img
            src={data.imageUrl}
            alt={data.name}
            className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-4 space-y-1">
          <h2 className="text-lg font-bold group-hover:text-purple-400">{data.name}</h2>
          <p className="text-sm opacity-70">Element: {data.element}</p>
          <p className="text-sm opacity-70">Element: {data.region}</p>
           <p className="text-sm opacity-70">Element: {data.weapon}</p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="flex gap-2 mt-3">
          <button
            onClick={onEdit}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md py-1 font-medium transition-colors text-sm"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 rounded-md py-1 font-medium transition-colors text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}