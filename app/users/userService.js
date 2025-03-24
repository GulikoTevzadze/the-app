import { toast } from "sonner";

export async function fetchUsers() {
  try {
    const response = await fetch("/api/users");
    if (response.redirected) {
      console.log('redirected')
      window.location.href = response.url;
    }
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    // console.error(error);
    toast.error("Failed to fetch users");
    return [];
  }
}

export async function deleteUsers(ids) {
  try {
    const response = await fetch(`/api/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) throw new Error("Failed to delete users");

    toast.success("User deleted successfully");
    return true;
  } catch (error) {
    console.error(error);
    toast.error("User deletion failed");
    throw error;
  }
}

export async function updateUsersStatus(ids, status) {
  try {
    const response = await fetch(`/api/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids, status }),
    });

    if (!response.ok) throw new Error(`Failed to ${status.toLowerCase()} users`);

    const action = status === "BLOCKED" ? "blocked" : "unblocked";
    toast.success(`User ${action} successfully`);
    return true;
  } catch (error) {
    console.error(error);
    const action = status === "BLOCKED" ? "block" : "unblock";
    toast.error(`User ${action} failed`);
    throw error;
  }
}