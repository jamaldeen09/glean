"use client"
import { useEffect, useMemo, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Search } from "lucide-react"
import debounce from "lodash/debounce"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function CaseSearchInput() {
  const [value, setValue] = useState("")
  const queryClient = useQueryClient()

  // Stable across re-renders — created once, not recreated every keystroke,
  // otherwise debouncing would never actually delay anything.
  const debouncedSetSearch = useMemo(
    () =>
      debounce((val: string) => {
        queryClient.setQueryData(["docketSearch"], val)
      }, 300),
    [queryClient]
  )

  // Cancel any pending debounced call if the component unmounts mid-wait.
  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel()
    }
  }, [debouncedSetSearch])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    debouncedSetSearch(e.target.value)
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