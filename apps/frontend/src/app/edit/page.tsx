'use client';

import { FieldCoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { FieldService } from '@/logic/service/field.service';
import { useState } from 'react';
import { EditPresenter } from './presenter';

export default function Edit() {
  const fieldServie = new FieldService();

  const [selectedPuyoColor, setSelectedPuyoColor] = useState<number>(1);
  const [fieldPuyos, setFieldPuyos] = useState<FieldPuyoInterface[]>([]);
  const [score, setScore] = useState<number>(0);

  /**
   * フィールドがクリックされたとき
   */
  const handleClickFieldCell = (fieldCoord: FieldCoordInterface) => {
    if (selectedPuyoColor === 0) {
      removeFieldPuyo(fieldCoord);
    } else {
      setFieldPuyo(fieldCoord);
    }
  };

  /**
   * 連鎖開始がクリックされたとき
   */
  const handleClickStartChain = () => {
    const result = fieldServie.dropAndChain(fieldPuyos);
    setFieldPuyos(result.fieldPuyos);
    setScore(result.score.total);
  };

  /**
   * フィールドのぷよを消す
   */
  const removeFieldPuyo = (fieldCoord: FieldCoordInterface) => {
    const newFieldPuyos = fieldServie.removeFieldPuyo(fieldPuyos, fieldCoord);
    setFieldPuyos(newFieldPuyos);
  };

  /**
   * フィールドにぷよを置く
   */
  const setFieldPuyo = (fieldCoord: FieldCoordInterface) => {
    const newFieldPuyo: FieldPuyoInterface = {
      puyoColor: selectedPuyoColor,
      fieldCoord: fieldCoord,
      connect: { above: false, right: false, below: false, left: false },
    };
    const newFieldPuyos = fieldServie.setFieldPuyo(fieldPuyos, newFieldPuyo);
    setFieldPuyos(newFieldPuyos);
  };

  return (
    <EditPresenter
      selectedPuyoColor={selectedPuyoColor}
      fieldPuyos={fieldPuyos}
      score={score}
      onClickSelectPuyo={setSelectedPuyoColor}
      onClickFieldCell={handleClickFieldCell}
      onClickStartChain={handleClickStartChain}
    />
  );
}
