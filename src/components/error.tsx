import {
  Alert,
  AlertDescription
} from "@/components/ui/alert"

export function ErrorInput({text} : any) {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        {text}
      </AlertDescription>
    </Alert>
  )
}
