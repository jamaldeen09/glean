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
import { Button, buttonVariants } from "../ui/button"
import { Trash2, TrashIcon } from "lucide-react"

export default function DeleteCaseConfirmation({ docketId }: {
    docketId: string;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }} className={buttonVariants({
                variant: "ghost",
                size: "icon-xs",
                className: "text-primary hover:text-primary bg-muted hover:brightness-95"
            })}>
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
                    <AlertDialogCancel onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation();
                    }}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete case
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}