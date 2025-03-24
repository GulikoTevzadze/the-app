import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, LockKeyholeOpen, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import LogoutButton from "./LogoutButton";

export default function UserActions({ hasSelectedRows, selectedCount, onDelete, onBlock, onUnblock }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [isUnblockDialogOpen, setIsUnblockDialogOpen] = useState(false);

  return (
    <div className="w-3/4 m-auto mt-10 flex justify-between items-center">
      <div className="flex justify-start items-center gap-3">
        <AlertDialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="gost"
              className="active:bg-sky-400 bg-sky-600 text-white mt-2.5"
              disabled={!hasSelectedRows}
            >
              Block {hasSelectedRows && `${selectedCount}`} <Lock className="ml-2" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Block</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to block selected users? This action can be undone later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                onBlock();
                setIsBlockDialogOpen(false);
              }}>
                Block
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={isUnblockDialogOpen} onOpenChange={setIsUnblockDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="gost"
              className="active:bg-sky-400 bg-sky-600 text-white mt-2.5"
              disabled={!hasSelectedRows}
            >
              Unblock {hasSelectedRows && `${selectedCount}`} <LockKeyholeOpen className="ml-2" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Unblock</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to unblock selected users?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                onUnblock();
                setIsUnblockDialogOpen(false);
              }}>
                Unblock
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="gost"
              className="active:bg-red-400 bg-red-600 text-white mt-2.5"
              disabled={!hasSelectedRows}
            >
              Delete {hasSelectedRows && `${selectedCount}`} <Trash2 className="ml-2" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete selected users? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                onDelete();
                setIsDeleteDialogOpen(false);
              }}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <LogoutButton />
      </div>
    </div>
  );
}