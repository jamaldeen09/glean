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
import { buttonVariants } from "../ui/button"
import { TrashIcon } from "lucide-react"

export default function DeleteCaseConfirmation({ caseId }: {
    caseId: string;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger className={buttonVariants({
                variant: "ghost",
                size: "icon-xs",
                className: "text-primary hover:text-primary bg-muted hover:brightness-95"
            })}>
                <TrashIcon className="size-3.5"/>
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
                <AlertDialogFooter className="bg-transparent">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction >
                        Delete case
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}