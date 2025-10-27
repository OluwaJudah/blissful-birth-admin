import { SelectableButton, SelectableCancelButton } from "./buttons";
export type SelectableType = { name: string; isAdded: boolean };

const Selectables = ({
  list,
  setList,
}: {
  list: SelectableType[];
  setList: (conditions: SelectableType[]) => void;
}) => {
  const addToList = (index: number) => {
    const newList = [...list];
    newList[index].isAdded = false;
    setList(newList);
  };

  const addToCancelList = (index: number) => {
    const newList = [...list];
    newList[index].isAdded = true;
    setList(newList);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 my-3">
        {list.map((c: SelectableType, index: number) => {
          if (!c.isAdded) return <div className="hidden" key={index}></div>;

          return (
            <SelectableCancelButton
              addToList={() => addToList(index)}
              key={index}
              name={c.name}
            />
          );
        })}

        {list.map((c: SelectableType, index: number) => {
          if (c.isAdded) return <div className="hidden" key={index}></div>;
          return (
            <SelectableButton
              addToCancelList={() => addToCancelList(index)}
              key={index}
              name={c.name}
            />
          );
        })}
      </div>
    </>
  );
};

export default Selectables;
