import { FileWithPath } from '@mantine/dropzone'
import { useFetcher } from '@remix-run/react'
import { Thumbnail, DropZone } from '@shopify/polaris'
import { NoteIcon } from '@shopify/polaris-icons'
import { useState, useCallback, useEffect } from 'react'

export default function PolarisDropzone() {
  const [files, setFiles] = useState<String[] | any>([])
  const [tempFiles, setTempFiles] = useState([])
  const [openFileDialog, setOpenFileDialog] = useState(false)
  const [listFiles, setListFiles] = useState<FileWithPath[]>([]);
  const fetcher = useFetcher()
  const stagedUploadsCreate: any = useFetcher()
  const fileCreate = useFetcher()

  const handleDropZoneDrop = useCallback(
    (dropFiles, _acceptedFiles, _rejectedFiles) => {
      let sendFiles: String[] | any = []
      dropFiles.map((file: any) => {
        sendFiles.push({
          resource: 'IMAGE',
          filename: file.name,
          mimeType: file.type,
          fileSize: file.size.toString(),
          httpMethod: 'POST',
        })
      })
      const addAlt = dropFiles.map((file, index) => {
        file['alt'] = ''
        return file
      })
      setTempFiles(addAlt)
      stagedUploadsCreate.submit(
        { files: JSON.stringify(sendFiles) },
        {
          method: 'POST',
          action: '/api/create-staged-uploads',
        },
      )
    },
    [],
  )

  useEffect(() => {
    if (stagedUploadsCreate.data) {
      const addResourceUrl: any = tempFiles.map((file: any, index) => {
        const stagedTarget =
          stagedUploadsCreate?.data?.data?.stagedUploadsCreate?.stagedTargets[index]
        file['resourceUrl'] = stagedTarget.resourceUrl
        file['url'] = stagedTarget.url
        file['parameters'] = stagedTarget.parameters
        fileUploadStaged(stagedTarget.url, stagedTarget.parameters, file)
        return file
      })
      setFiles(addResourceUrl)
      setTempFiles([])
    }
  }, [stagedUploadsCreate.data])

  const fileUploadStaged = async (url, parameters, file) => {
    const formData = new FormData()
    parameters.forEach(({ name, value }) => {
      formData.append(name, value)
    })
    formData.append('file', file)
    formData.append('url', url)
    const request = await fetch('/api/file-post', {
      method: 'POST',
      body: formData,
    })
  }

  const toggleOpenFileDialog = useCallback(
    () => setOpenFileDialog((openFileDialog) => !openFileDialog),
    [],
  )

  /*
  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      setListFiles(true)
      fetcher.load('/api/getFiles')
    } else {
      console.log(fetcher.data)
    }
  }, [listFiles, fetcher])
*/
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']

  useEffect(() => {
    if (fileCreate.data) {
      console.log('file create', fileCreate.data)
    }
  }, [fileCreate.data])

  const UploadedFiles = () => {
    return (
      <div className='flex flex-col gap-4 mx-4 sm:mx-0 p-4'>
        <fileCreate.Form method='post' action='/api/create-files'>
          {files.map((file, index) => (
            <div className='flex flex-row justify-left items-center gap-4 p-4 text-md' key={index}>
              <Thumbnail
                size='large'
                alt={file.name}
                source={
                  validImageTypes.indexOf(file.type) > -1
                    ? window.URL.createObjectURL(file)
                    : NoteIcon
                }
              />
              <div>{file.name}</div>

              <input type='hidden' name='resourceUrl' value={file.resourceUrl} />
              <input type='text' placeholder='Alt Text' name='alt' className='w-full' />
            </div>
          ))}
          <div className='flex justify-end '>
            <button
              type='submit'
              className='w-48 hover:no-underline bg-slate-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-500'
            >
              Upload Image
            </button>
          </div>
        </fileCreate.Form>
      </div>
    )
  }

  return (
    <div className='flex flex-col bg-white border shadow-md gap-4 mx-4 sm:mx-0 p-4'>
      <DropZone
        openFileDialog={openFileDialog}
        onDrop={handleDropZoneDrop}
        onFileDialogClose={toggleOpenFileDialog}
        allowMultiple={false}
      >
        <DropZone.FileUpload actionHint='Drag and drop or click the button.  Accepts .gif, .jpg, and .png' />
      </DropZone>
      {files.length > 0 && <UploadedFiles />}
    </div>
  )
}
