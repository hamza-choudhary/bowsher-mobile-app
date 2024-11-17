import {
  ErrorToaster,
  InfoToaster,
  SuccessToaster,
  WarningToaster,
} from '@common';

export const toastConfig = {
  success: ({props, text2}) => <SuccessToaster message={text2} />,
  error: ({props, text2}) => <ErrorToaster message={text2} />,
  info: ({props, text2}) => <InfoToaster message={text2} />,
  warn: ({props, text2}) => <WarningToaster message={text2} />,
};
