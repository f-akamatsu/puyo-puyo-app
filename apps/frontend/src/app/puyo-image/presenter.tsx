import { FileUploadDropzone, FileUploadList } from '@/components/ui/file-upload';
import {
  Button,
  FileUploadHiddenInput,
  FileUploadRootProvider,
  Flex,
  UseFileUploadReturn,
} from '@chakra-ui/react';

export interface PuyoImagePresenterProps {
  fileUpload: UseFileUploadReturn;
  onSubmit: () => void;
}

export function PuyoImagePresenter({ fileUpload, onSubmit }: PuyoImagePresenterProps) {
  return (
    <Flex flexDir='column' gap={4}>
      <FileUploadRootProvider value={fileUpload} maxW='xl' alignItems='stretch'>
        <FileUploadHiddenInput />
        <FileUploadDropzone label='ぷよぷよの画像を選択してください' minH='3xs' />
        <FileUploadList clearable />
      </FileUploadRootProvider>

      <Button onClick={onSubmit} w='fit-content'>
        送信
      </Button>
    </Flex>
  );
}
