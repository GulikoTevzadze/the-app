"use client";
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import UserActions from "@/components/UserActions.jsx";
import UsersTableView from "@/components/UsersTableView.jsx";
import { fetchUsers, deleteUsers, updateUsersStatus } from "./userService.js";
import { useUserSelection } from "./useUserSelection.js";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const {
    selectedRows,
    selectAll,
    selectedCount,
    handleRowCheckboxChange,
    handleSelectAllChange,
    resetSelection
  } = useUserSelection(users);

  const hasSelectedRows = selectedCount > 0;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
    try {
      await deleteUsers(selectedIds);
      await loadUsers();
      resetSelection();
    } catch (error) {

    }
  };

  const handleBlock = async () => {
    const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
    try {
      await updateUsersStatus(selectedIds, "BLOCKED");
      await loadUsers();
      resetSelection();
    } catch (error) {

    }
  };

  const handleUnblock = async () => {
    const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
    try {
      await updateUsersStatus(selectedIds, "ACTIVE");
      await loadUsers();
      resetSelection();
    } catch (error) {
    }
  };
  return (
    <>
      <Toaster />
      <UserActions
        hasSelectedRows={hasSelectedRows}
        selectedCount={selectedCount}
        onDelete={handleDelete}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
      />
      <UsersTableView
        users={users}
        selectedRows={selectedRows}
        selectAll={selectAll}
        onRowCheckboxChange={handleRowCheckboxChange}
        onSelectAllChange={handleSelectAllChange}
      />
    </>
  );
}