import {CONVERSION_FIELD as FIELD, GASES, STORAGE} from '@constants';
import {
  generateUniqueId,
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from '@utils';

export async function saveConversionInStorage({
  conversion,
  activeField,
  gas,
  favorite = false,
}) {
  const {source, target} = conversion;

  if (!Number(source.value) && !Number(target.value)) {
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
    favorite,
  };

  const allHistory =
    (await getItemFromLocalStorage(STORAGE.CONVERSION_HISTORY)) || [];

  if (
    allHistory.length > 0 &&
    isEqual(history, allHistory[0], ['id', 'favorite'])
  ) {
    return;
  }

  allHistory.unshift(history);
  await setItemInLocalStorage(STORAGE.CONVERSION_HISTORY, allHistory);
}

export async function removeConversionFromStorage(id) {
  const allHistory =
    (await getItemFromLocalStorage(STORAGE.CONVERSION_HISTORY)) || [];

  const history = allHistory.filter(item => item.id !== id);
  await setItemInLocalStorage(STORAGE.CONVERSION_HISTORY, history);
}

export async function addRemoveFavorite(id) {
  const allHistory =
    (await getItemFromLocalStorage(STORAGE.CONVERSION_HISTORY)) || [];

  const history = allHistory.map(item => {
    if (item.id === id) {
      item.favorite = !item.favorite;
    }
    return item;
  });

  await setItemInLocalStorage(STORAGE.CONVERSION_HISTORY, history);
}

function omit(obj, fields) {
  const newObj = {...obj};
  fields.forEach(field => delete newObj[field]);
  return newObj;
}

function isEqual(obj1, obj2, fieldsToIgnore) {
  const cleanedObj1 = omit(obj1, fieldsToIgnore);
  const cleanedObj2 = omit(obj2, fieldsToIgnore);
  return JSON.stringify(cleanedObj1) === JSON.stringify(cleanedObj2);
}
