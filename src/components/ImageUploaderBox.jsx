import Loader from "./Loader"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useContext, useEffect, useState } from "react"
import Actions from "./Actions"
import Store from "../context"
import { useSearchParams } from "react-router"
import { useDropzone } from 'react-dropzone'


const ImageUploaderBox = () => {
    const { uploadedImage, setUploadedImage } = useContext(Store)
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const { getRootProps, isDragActive } = useDropzone({
        onDrop: (acceptFile) => {
            setValue("image", acceptFile[0])
            onSubmit()
        }
    });

    const validationSchema = yup.object({
        image: yup
            .mixed()
            .required("File can't be empty")
            .test("image size", "file size can't be more than 2MB", value => value && value.size <= (1024 * 1024 * 2)),
    })

    const { handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            image: null
        }
    })



    const onSubmit = handleSubmit(async (data) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("image", data.image)
            
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}upload`, {
                method: "POST",
                body: formData,
            })

            const imageData = await response.json()

            if (imageData) {
                setLoading(false)
                setUploadedImage(imageData)
                setSearchParams({ "image": imageData._id })
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        } finally {
            setLoading(false)
        }
    })


    const uploadImage = (e) => {
        setValue("image", e.target.files[0])
        onSubmit()
    }
    

    const getImage = async () => {
        const imageID = searchParams.get("image")

        if (!imageID) return setUploadedImage(null)
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}images/${imageID}`, {
                method: "GET"
            })
            const data = await response.json()
            setUploadedImage(data || null)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getImage()
    }, [searchParams])



    return (
        <div className="container min-h-screen grid place-items-center py-12">
            <div className="wrapper">
                <div className="outer p-2 shadow-lg rounded-xl bg-white dark:bg-surface-dark w-[725px] max-md:w-full">
                    {
                        loading
                            ?
                            <Loader />
                            :
                            uploadedImage
                                ?
                                <div className="image-preview">
                                    <img className="rounded-lg  w-full h-full" src={uploadedImage.path} alt={uploadedImage.image.filename} />
                                </div>
                                :
                                <label {...getRootProps()} className={`inner rounded-lg border-2 border-dashed transition-all ease-out hover:border-primary p-8 py-32 flex flex-col gap-2 items-center text-center cursor-pointer ${isDragActive ? 'border-primary bg-primary-light/50' : 'border-border dark:border-text-muted'}`}>
                                    <input className="hidden" name="image" type="file" accept=".jpg, .png, .gif" onChange={uploadImage} />
                                    <img className="w-10" src="/images/exit.svg" alt="Small Logo Icon" />
                                    <h1 className="font-semibold text-lg mt-4">
                                        Drag & drop a file or <span className="hover:underline text-primary">browse files</span>
                                    </h1>
                                    <span className="font-light text-sm">JPG, PNG or GIF - Max file size 2MB</span>
                                    {errors.image && <span className="italic text-red-400 font-light text-xs">{errors.image.message}</span>}
                                </label>
                    }
                </div>
                {uploadedImage && <Actions />}
            </div>
        </div>
    )
}

export default ImageUploaderBox