import {
    Alert,
    AlertDescription
  } from "@/components/ui/alert"
  
  export function Success({text} : any) {
    return (
      <Alert variant="default" className="border-green-700">
        <AlertDescription className="text-green-700">
          {text}
        </AlertDescription>
      </Alert>
    )
  }
  