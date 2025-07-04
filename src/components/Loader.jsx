const Loader = () => {
    return (
        <div className='flex flex-col gap-6 items-center p-12'>
            <p className='font-bold'>
                Uploading, <span className='font-light'>please wait...</span>
            </p>
            <div className='progress-bar relative w-3/4 h-2 rounded-4xl bg-border dark:bg-text-muted overflow-hidden'>
                <span className='progress absolute rounded-4xl h-full w-[75px] bg-primary animate-[loading_1s_ease-in-out_infinite]'></span>
            </div>
        </div>
    )
}

export default Loader