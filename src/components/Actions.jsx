import { useContext } from "react"
import { toast } from "sonner"
import Store from "../context"

const Actions = () => {
    const { uploadedImage } = useContext(Store)
    
    const share = async () => {
        await navigator.clipboard.writeText(location.href)
        toast.success("Copied to clipboard")    
    }
    const download = () => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}download/${uploadedImage.image.filename}`
        toast.success("File saved to your device")
    }

    return (
        <div className="actions mt-6 flex items-center justify-center gap-4">
            <button className="bg-primary p-2 px-4 text-white hover:bg-primary-light" onClick={share}>
                <img className="w-4" src="/images/Link.svg" alt="Share Icon" />
                <span>Share</span>
            </button>
            <button className="bg-primary p-2 px-4 text-white hover:bg-primary-light" onClick={download}>
                <img className="w-4" src="/images/download.svg" alt="Download Icon" />
                <span>Download</span>
            </button>
        </div>
    )
}

export default Actions