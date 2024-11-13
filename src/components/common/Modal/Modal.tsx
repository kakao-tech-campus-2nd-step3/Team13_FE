import { useState } from 'react'
import Modal from 'react-modal'
import * as S from './Modal.styles'
import Button from '../Button/Button'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { useExcelDownload } from '@/api/hooks/common/useExcelDownload'
import { useExcelUpload } from '@/api/hooks/common/useExcelUpload'

interface FileUploadModalProps {
  isOpen: boolean
  onRequestClose: () => void
  downloadUrl?: string
  uploadUrl?: string
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onRequestClose,
  downloadUrl,
  uploadUrl,
}) => {
  const { refetch: downloadExcel, isFetching: isDownloading } = useExcelDownload(downloadUrl || '')
  const { uploadExcel, isLoading: isUploading } = useExcelUpload(uploadUrl || '')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      uploadExcel(selectedFile, {
        onSuccess: () => {
          setSelectedFile(null)
          onRequestClose()
          window.location.reload()
        },
      })
    } else {
      alert('업로드할 파일을 선택하세요.')
    }
  }

  const handleClose = () => {
    setSelectedFile(null)
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
      style={S.customModalStyles}
    >
      <label htmlFor="file-upload">
        <S.SquareWrapper>
          {selectedFile ? (
            <S.FileListWrapper>
              <S.FileList>{selectedFile.name}</S.FileList>
            </S.FileListWrapper>
          ) : (
            <>
              <IoCloudUploadOutline size="30" />
              파일 선택
            </>
          )}
        </S.SquareWrapper>
      </label>

      {!selectedFile && (
        <S.FileInput id="file-upload" type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
      )}

      <Button
        theme="light-outlined"
        width="250px"
        height="10px"
        margin="12px 0 4px 0"
        onClick={downloadExcel}
        disabled={isDownloading}
      >
        {isDownloading ? '다운로드 중...' : '템플릿 다운로드'}
      </Button>
      <Button
        theme="dark"
        width="250px"
        height="10px"
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? '업로드 중...' : '엑셀 업로드'}
      </Button>
    </Modal>
  )
}
