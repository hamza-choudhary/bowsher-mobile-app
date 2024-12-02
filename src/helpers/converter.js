import {CONVERSION_FIELD as FIELD, GASES, STORAGE} from '@constants';
import {
  generateUniqueId,
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from '@utils';

export async function saveConversionInStorage(conversion, activeField, gas) {
  const {source, target} = conversion;

  //TODO: create a unique id

  if (!Number(source.value) || !Number(target.value)) {
    return;
  }

  const isSourceActive = activeField === FIELD.SOURCE;

  const history = {
    id: generateUniqueId(),
    type: GASES[gas].name,
    sourceUnit: isSourceActive ? source.unit : target.unit,
    sourceValue: isSourceActive ? source.value : target.value,
    targetUnit: isSourceActive ? target.unit : source.unit,
    targetValue: isSourceActive ? target.value : source.value,
  };

  const allHistory =
    (await getItemFromLocalStorage(STORAGE.CONVERSION_HISTORY)) || [];

  allHistory.unshift(history);
  await setItemInLocalStorage(STORAGE.CONVERSION_HISTORY, allHistory);
}

export async function removeConversionFromStorage(id) {
  const allHistory =
    (await getItemFromLocalStorage(STORAGE.CONVERSION_HISTORY)) || [];

  const history = allHistory.filter(item => item.id !== id);

  await setItemInLocalStorage(STORAGE.CONVERSION_HISTORY, history);
}
