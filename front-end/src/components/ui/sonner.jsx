import {
  CheckCircle2,
  InfoIcon,
  Loader2,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  return (
    <Sonner
  position="top-center"
  toastOptions={{
    classNames: {
      toast: "custom-toast"
    }
  }}
      icons={{
        success: <CheckCircle2 className="h-5 w-5 text-[#f9a602]" />,
        info: <InfoIcon className="h-5 w-5 text-[#f9a602]" />,
        warning: <AlertTriangle className="h-5 w-5 text-[#f9a602]" />,
        error: <XCircle className="h-5 w-5 text-red-600" />,
        loading: <Loader2 className="h-5 w-5 animate-spin text-white" />,
      }}
      {...props}
    />
  )
}

export { Toaster }