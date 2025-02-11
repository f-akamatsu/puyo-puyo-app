'use client';

import { useFileUpload } from '@chakra-ui/react';
import { PuyoImagePresenter } from './presenter';

export default function PuyoImage() {
  const fileUpload = useFileUpload({
    maxFiles: 1,
    accept: ['image/png', 'image/jpeg'],
  });

  return <PuyoImagePresenter fileUpload={fileUpload} />;
}
