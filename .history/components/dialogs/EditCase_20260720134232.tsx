"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { Spinner } from "../ui/spinner"
import { caseSchema } from "@/lib/schemas/case-schema"
import z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { PencilIcon } from "lucide-react"

const editCaseSchema = (caseSchema.partial()).merge(z.object({
    status: z.enum(["active", "closed"])
}).partial());

export default function EditCase({ caseData }: { caseData: z.infer<typeof editCaseSchema> & { id: string; } }) {
    const form = useForm<z.infer<typeof editCaseSchema>>({
        resolver: zodResolver(editCaseSchema),
        defaultValues: {
            status: caseData.status,
            title: caseData.title,
            client: caseData.client,
            court: caseData.court,
            number: caseData.number ?? "",
            description: caseData.description ?? "",
        },
    })

    const isPending = form.formState.isSubmitting

    function onSubmit(data: any) {
        // TODO: wire up update mutation
    }

    return (
        <Dialog>
            <DialogTrigger className={buttonVariants({
                variant: "ghost",
                size: "icon-xs",
                className: "text-primary hover:text-primary bg-muted hover:brightness-95"
            })}>
                <PencilIcon className="size-3.5" />
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit case</DialogTitle>
                    <DialogDescription>
                        Update this case's details or change its status.
                    </DialogDescription>
                </DialogHeader>
                <form id="form-edit-case" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="status"
                            control={form.control}
                            disabled={isPending}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-case-status">Status</FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={field.disabled}
                                    >
                                        <SelectTrigger
                                            id="edit-case-status"
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent 
                                            side="bottom"
                                            sideOffset={0}
                                            align="end"
                                            alignItemWithTrigger
                                        >
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="title"
                            control={form.control}
                            disabled={isPending}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-case-title">
                                        Case title
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="edit-case-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="State v. Marcus Webb"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="client"
                            control={form.control}
                            disabled={isPending}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-case-client">Client</FieldLabel>
                                    <Input
                                        {...field}
                                        id="edit-case-client"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Marcus Webb"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="court"
                            control={form.control}
                            disabled={isPending}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-case-court">Court</FieldLabel>
                                    <Input
                                        {...field}
                                        id="edit-case-court"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Supreme Court, New York County"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="number"
                            control={form.control}
                            disabled={isPending}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-case-number">
                                        Case number (optional)
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="edit-case-number"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="2026-CV-04471"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="description"
                            control={form.control}
                            disabled={isPending}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-case-description">
                                        Description (optional)
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="edit-case-description"
                                            placeholder="Brief summary of the case..."
                                            rows={4}
                                            className="min-h-20 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {(field.value ?? "").length}/1000 characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
                <DialogFooter className="bg-transparent!">
                    <DialogClose render={(
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    )} />

                    <Button type="submit" form="form-edit-case" disabled={isPending}>
                        {isPending ? <Spinner /> : "Save changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}