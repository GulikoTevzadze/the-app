import { useState, useEffect } from "react";

export function useUserSelection(users) {
  const [selectedRows, setSelectedRows] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const count = Object.values(selectedRows).filter(value => value).length;
    setSelectedCount(count);
  }, [selectedRows]);

  const handleRowCheckboxChange = (id) => {
    const newSelectedRows = { ...selectedRows };
    newSelectedRows[id] = !selectedRows[id];

    setSelectedRows(newSelectedRows);

    const allSelected = users.every((row) => newSelectedRows[row.id]);
    setSelectAll(allSelected);
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedRows = {};
    users.forEach((row) => {
      newSelectedRows[row.id] = newSelectAll;
    });

    setSelectedRows(newSelectedRows);
  };

  const resetSelection = () => {
    setSelectedRows({});
    setSelectAll(false);
    setSelectedCount(0);
  };

  return {
    selectedRows,
    selectAll,
    selectedCount,
    handleRowCheckboxChange,
    handleSelectAllChange,
    resetSelection
  };
}