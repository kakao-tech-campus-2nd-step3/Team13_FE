import { useState } from 'react'
import Modal from 'react-modal'
import * as S from './Modal.styles'
import Button from '../Button/Button'
import { IoCloudUploadOutline } from 'react-icons/io5'

interface FileUploadModalProps {
  isOpen: boolean
  onRequestClose: () => void
  // onUpload: (file: File) => void
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onRequestClose,
  // onUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      // onUpload(selectedFile)
      setSelectedFile(null)
      onRequestClose()
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

      <S.ButtonWrapper>
        <Button
          theme="light-outlined"
          width="120px"
          height="10px"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          업로드
        </Button>
        <Button theme="dark" width="120px" height="10px" onClick={handleClose}>
          취소
        </Button>
      </S.ButtonWrapper>
    </Modal>
  )
}
