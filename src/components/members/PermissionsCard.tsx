import { useTranslation } from 'react-i18next';
import { FaRegCircleCheck } from 'react-icons/fa6'

export default function PermissionsCard() {
    const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-center bg-gray-100 px-2 py-3 rounded-lg">
    <FaRegCircleCheck size={24} color="#22BEEF" />
    <p>{t("permission")}</p>
  </div>
  )
}
