export interface FileSelectionContract {
    inputReference: React.RefObject<HTMLInputElement>,
    onFileSelection: (file: File) => void
}