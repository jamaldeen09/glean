"use client"
import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import debounce from "lodash/debounce"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function CaseSearchInput({
  onSearch,
}: { onSearch: (value: string) => void
}) {
  const [value, setValue] = useState("")

  // Stable across re-renders — created once, not recreated every keystroke,
  // otherwise debouncing would never actually delay anything.
  const debouncedSearch = useMemo(
    () => debounce((val: string) => onSearch(val), 300),
    [onSearch]
  )

  // Cancel any pending debounced call if the component unmounts mid-wait —
  // avoids calling onSearch after this input is gone from the tree.
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    debouncedSearch(e.target.value)
  }
  return (
    <InputGroup className="max-w-md bg-background/60">
      <InputGroupAddon align="inline-start">
        <Search className="h-4 w-4 text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Search cases, case numbers, or clients…"
        value={value}
        onChange={handleChange}
      />
    </InputGroup>
  )
}