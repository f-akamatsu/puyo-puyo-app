'use client';

import { graphql } from '@/gql/__generated__';
import { useFileUpload } from '@chakra-ui/react';
import { PuyoImagePresenter } from './presenter';
import { useClient } from 'urql';
import axios from 'axios';

const GetPuyoImageUploadUrlQuery = graphql(/* GraphQL */ `
  query GetPuyoImageUploadUrl($fileName: String!) {
    getPuyoImageUploadUrl(fileName: $fileName) {
      fileId
      uploadUrl
    }
  }
`);

export default function PuyoImage() {
  const gqlClient = useClient();

  const fileUpload = useFileUpload({
    maxFiles: 1,
    accept: ['image/png', 'image/jpeg'],
  });

  const handleSubmit = async () => {
    if (!fileUpload.acceptedFiles.length) return;
    const file = fileUpload.acceptedFiles[0];

    // アップロードURLを取得
    const fileName = file.name;
    const { data } = await gqlClient.query(GetPuyoImageUploadUrlQuery, {
      fileName,
    });
    if (!data) return;

    // URLにファイルアップロード
    await axios.put(data?.getPuyoImageUploadUrl.uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    // 変換結果を取得
  };

  return <PuyoImagePresenter fileUpload={fileUpload} onSubmit={handleSubmit} />;
}
