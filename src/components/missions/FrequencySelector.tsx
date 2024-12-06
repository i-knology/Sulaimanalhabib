import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FrequencySelector({ onChange, defaultValue }) {
  const [selected, setSelected] = useState(defaultValue || 'daily');
    const {t} = useTranslation()
  const frequencies = [
    { id: 'daily', label: t("daily") },
    { id: 'weekly', label: t("weekly")},
    { id: 'monthly', label: t("monthly") },
    { id: 'yearly', label: t("yearly") }
  ];

  const handleSelect = (value) => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-right mb-2 text-sm font-medium text-gray-700">{t("frequencySelector")}</h3>
      <div className="flex flex-row gap-2 justify-between w-full" dir="rtl">
        {frequencies.map((freq) => (
          <button
            key={freq.id}
            type="button"
            onClick={() => handleSelect(freq.id)}
            className={`
              flex-1 py-2 px-4 text-sm rounded-lg transition-colors
              ${selected === freq.id 
                ? "bg-blue-50 border border-blue-500 text-blue-700" 
                : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            {freq.label}
          </button>
        ))}
      </div>
    </div>
  );
};

