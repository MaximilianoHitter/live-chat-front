import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
export default function NotRoute() {
    return (
        <div className="w-full flex justify-center">
        <Alert className="w-[700px] my-3 text-center">
            <AlertTitle>Página no encontrada</AlertTitle>
            <AlertDescription>
                La página o ruta a la cual está intentando acceder no fue encontrada.
            </AlertDescription>
        </Alert>
        </div>
    )
}