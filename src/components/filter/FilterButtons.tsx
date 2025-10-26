import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { FilterType, setFilter } from "../../features/filter/filterSlice";

const filters: { label: string; value: FilterType }[] = [
  { label: "すべて", value: FilterType.All },
  { label: "未完了", value: FilterType.Active },
  { label: "完了", value: FilterType.Completed },
];

export const FilterButtons = () => {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.filter.value);

  return (
    <div className="flex gap-2 mt-4">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => dispatch(setFilter(f.value))}
          className={`px-3 py-1 rounded ${
            current === f.value ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};
