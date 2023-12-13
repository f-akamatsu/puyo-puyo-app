'use client';

import { useState } from 'react';
import { SelectPuyo } from '../../components/features/SelectPuyo/SelectPuyo';

export default function Edit() {
  const [selectedPColor, setSelectedPColor] = useState<number>(1);

  return <SelectPuyo selectedPColor={selectedPColor} setSelectedPColor={setSelectedPColor} />;
}
