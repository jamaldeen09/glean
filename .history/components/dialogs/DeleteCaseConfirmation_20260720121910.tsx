"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"

export default function DeleteCaseConfirmation({ docketId, children }: { 
    docketId: string;
    children: React.ReactNode
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger className={}>
            <TrashIcon />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this case?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this case and everything in it —
                        every exhibit, page, party, note and chat history.
                        This cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete case
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}