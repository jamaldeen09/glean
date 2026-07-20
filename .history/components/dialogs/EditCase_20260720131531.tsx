"use client"

const editCaseSchema = z.object({
  status: z.enum(["Active", "Closed"], { error: "Please select a status" }),

  title: z
    .string()
    .trim()
    .min(3, { error: "Title must be at least 3 characters" })
    .max(200, { error: "Title cannot exceed 200 characters" }),

  client: z
    .string()
    .trim()
    .min(2, { error: "Client name must be at least 2 characters" })
    .max(200, { error: "Client name cannot exceed 200 characters" }),

  court: z
    .string()
    .trim()
    .min(2, { error: "Court must be at least 2 characters" })
    .max(200, { error: "Court cannot exceed 200 characters" }),

  number: z.string().trim().max(50, { error: "Case number cannot exceed 50 characters" }).optional(),

  description: z.string().trim().max(1000, { error: "Description cannot exceed 1000 characters" }).optional(),
})

type EditCaseFormValues = z.infer<typeof editCaseSchema>

export default function EditCase({
  open,
  onOpenChange,
  caseFile,
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
  caseFile: {
    id: string
    status: "Active" | "Closed"
    title: string
    client: string
    court: string
    number?: string | null
    description?: string | null
  }
}) {
  const form = useForm<EditCaseFormValues>({
    resolver: zodResolver(editCaseSchema),
    defaultValues: {
      status: caseFile.status,
      title: caseFile.title,
      client: caseFile.client,
      court: caseFile.court,
      number: caseFile.number ?? "",
      description: caseFile.description ?? "",
    },
  })

  const isPending = form.formState.isSubmitting

  function onSubmit(data: EditCaseFormValues) {
    // TODO: wire up update mutation
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
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
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="form-edit-case" disabled={isPending}>
            {isPending ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}