"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getMembers, createMember, updateMember, deleteMember } from "@/lib/members-api";
import type { ApiMember } from "@/types/member";
import type { MemberFormPayload } from "@/lib/member-form-data";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Pencil, Trash2, LogOut } from "lucide-react";
import { MemberFormDialog } from "@/components/admin/MemberFormDialog";

const AdminPage = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<ApiMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<ApiMember | null>(null);
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 400);

  const fetchMembers = () => {
    setLoading(true);
    setError(null);
    getMembers(debouncedSearch)
      .then(setMembers)
      .catch((err) => {
        setError(err.message || "Failed to load members");
        setMembers([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMembers();
  }, [debouncedSearch]);

  const handleAddSubmit = async (payload: MemberFormPayload) => {
    try {
      await createMember(payload);
      toast({ title: "Member created successfully." });
      setAddDialogOpen(false);
      fetchMembers();
    } catch (err: unknown) {
      toast({
        title: "Failed to create member",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
      throw err;
    }
  };

  const handleEditSubmit = async (
    payload: MemberFormPayload,
    options?: { existingUrlsToKeep?: string[] }
  ) => {
    if (!editingMember) return;
    try {
      const existingUrls =
        options?.existingUrlsToKeep ?? editingMember.imageUrls ?? null;
      await updateMember(editingMember.id, payload, existingUrls);
      toast({ title: "Member updated successfully." });
      setEditingMember(null);
      fetchMembers();
    } catch (err: unknown) {
      toast({
        title: "Failed to update member",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
      throw err;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteMemberId) return;
    setDeleteLoading(true);
    try {
      await deleteMember(deleteMemberId);
      toast({ title: "Member deleted." });
      setDeleteMemberId(null);
      fetchMembers();
    } catch (err: unknown) {
      toast({
        title: "Failed to delete member",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Admin – Members
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage members. Search by company name.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Site</Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => logout()}>
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add new member
          </Button>
        </div>
      </div>

      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by company name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">
            Loading members...
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Membership #</TableHead>
                <TableHead className="max-w-[200px]">Address</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                    No members found.
                  </TableCell>
                </TableRow>
              ) : (
                members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.companyName}</TableCell>
                    <TableCell>{member.owner || "—"}</TableCell>
                    <TableCell>{member.membershipNumber || "—"}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {member.address || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setEditingMember(member)}
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => setDeleteMemberId(member.id)}
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <MemberFormDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        mode="add"
        onSubmit={handleAddSubmit}
      />

      <MemberFormDialog
        open={!!editingMember}
        onOpenChange={(open) => !open && setEditingMember(null)}
        mode="edit"
        member={editingMember ?? undefined}
        onSubmit={handleEditSubmit}
      />

      <AlertDialog open={!!deleteMemberId} onOpenChange={(open) => !open && setDeleteMemberId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete member?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the member.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeleteConfirm();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export { AdminPage };
