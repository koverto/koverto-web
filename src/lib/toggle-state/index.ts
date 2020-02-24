import { Dispatch, SetStateAction } from "react"

export const toggleState = (
  setter: Dispatch<SetStateAction<boolean>>
) => (): void => setter(e => !e)
