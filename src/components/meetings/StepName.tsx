import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export default function MeetingStepName({icon,status,text}:{icon:ReactNode,status:string,text:string}) {
    const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between">
    <div className="w-full">
      <div className="flex items-center w-full">
        <p className="bg-gray-50 rounded-full inline-block outline-secondary p-2">
          {icon}
        </p>

        <div className="mx-2 w-full flex flex-col">
          <span>{t(status)}</span>
          <span className="text-gray-400 my-1">
            {t(text)}
          </span>
        </div>
      </div>
    </div>
  </div>
  )
}
