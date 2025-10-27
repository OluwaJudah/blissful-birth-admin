import { X } from "lucide-react";

export const SelectableCancelButton = ({
  name,
  addToList,
}: {
  name: string;
  addToList: () => void;
}) => {
  return (
    <button
      onClick={addToList}
      className="flex flex-row gap-2 items-center bg-gray-500 shadow-md hover:bg-gray-600 text-white rounded-full px-3 h-[33px]"
    >
      <span>{name}</span>
      <X className="text-torquoise-900" size={23} strokeWidth={2} />
    </button>
  );
};

export const SelectableButton = ({
  name,
  addToCancelList,
}: {
  name: string;
  addToCancelList: () => void;
}) => {
  return (
    <button
      onClick={addToCancelList}
      className="bg-gray-50 shadow-md hover:bg-gray-500 hover:text-white text-gray-900 rounded-full px-4 h-[33px]"
    >
      {name}
    </button>
  );
};
