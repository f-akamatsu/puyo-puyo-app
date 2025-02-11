import { FileUploadDropzone, FileUploadList } from '@/components/ui/file-upload';
import {
  FileUploadHiddenInput,
  FileUploadRootProvider,
  UseFileUploadReturn,
} from '@chakra-ui/react';

export interface PuyoImagePresenterProps {
  fileUpload: UseFileUploadReturn;
}

export function PuyoImagePresenter({ fileUpload }: PuyoImagePresenterProps) {
  return (
    <FileUploadRootProvider value={fileUpload} maxW='xl' alignItems='stretch'>
      <FileUploadHiddenInput />
      <FileUploadDropzone label='ぷよぷよの画像を選択してください' minH='3xs' />
      <FileUploadList clearable />
    </FileUploadRootProvider>
  );
}
