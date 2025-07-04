import { useState } from "react"
import Header from "./components/Header"
import Store from "./context"
import ImageUploaderBox from "./components/ImageUploaderBox"
import { Toaster } from 'sonner'

function App() {
  const [themeMode, setThemeMode] = useState("light")
  const [uploadedImage, setUploadedImage] = useState(null)

  return (
    <Store value={{ themeMode, setThemeMode, uploadedImage, setUploadedImage }}>
      <Toaster richColors />
      <main className='min-h-screen'>
        <Header />
        <ImageUploaderBox />
      </main>
    </Store>
  )
}

export default App
