"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { DocketFormValues, docketSchema } from "@/lib/schemas/docket-schema";
import { toast } from "sonner"
import { useCreateDocket } from "@/hooks/case/use-create-docket"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { Spinner } from "../ui/spinner"

export default function OpenCase({ open, onOpenChange }: {
    open: boolean
    onOpenChange: (value: boolean) => void
}) {
    const { mutate, isPending } = useCreateDocket();
    const { push } = useRouter();
    const form = useForm<DocketFormValues>({
        resolver: zodResolver(docketSchema),
        defaultValues: {
            client: "",
            court: "",
            title: "",
            description: "",
            number: "",
        },
    });

    const onSubmit = useCallback(async (data: DocketFormValues) => {
        mutate(data, {
            onSuccess: (data) => {
                toast.success("Case opened");
                form.reset();
                onOpenChange(false);

                if (data?.docketId)
                    push(`/case/${data.docketId}/exhibits`)
            }
        });
    }, [mutate]);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Open a new case</DialogTitle>
                    <DialogDescription>
                        Start a case file. You can add exhibits and parties after.
                    </DialogDescription>
                </DialogHeader>

                <form
                    id="form-open-case"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FieldGroup>
                        <Controller
                            name="title"
                            control={form.control}
                            disabled={isPending}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="open-case-title">
                                        Case title
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="open-case-title"
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
                                    <FieldLabel htmlFor="open-case-client">
                                        Client
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="open-case-client"
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
                                    <FieldLabel htmlFor="open-case-court">
                                        Court
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="open-case-court"
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
                                    <FieldLabel htmlFor="open-case-number">
                                        Case number (optional)
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="open-case-number"
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
                                    <FieldLabel htmlFor="open-case-description">
                                        Description (optional)
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="open-case-description"
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
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="form-open-case"
                        disabled={isPending}
                    >
                        {isPending ? (<Spinner />) : "Open case"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}