import React from 'react';
import { Building2, Mail, Phone, MapPinOff, FileText, Clock } from 'lucide-react';
import EditableField from './EditableField';

const SettingsWebData = ({ settings, handleChange, handleNestedChange, onSave }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EditableField icon={Building2} label="Restaurant Name" value={settings?.appName} onChange={(val) => handleChange('appName', val)} onSave={onSave} />
        <EditableField icon={Mail} label="Email Address" value={settings?.email} onChange={(val) => handleChange('email', val)} onSave={onSave} />
        <EditableField
          icon={Phone}
          label="Phone Number"
          value={settings?.phone}
          onChange={(val) => {
            const onlyNums = val.replace(/[^0-9]/g, '');
            if (onlyNums.length <= 10) {
              handleChange('phone', onlyNums);
            }
          }}
          onSave={onSave}
        />
        <EditableField icon={MapPinOff} label="Physical Address" value={settings?.type_address} onChange={(val) => handleChange('type_address', val)} onSave={onSave} />

        <div className="md:col-span-2">
          <EditableField
            icon={FileText}
            label="Footer Description"
            value={settings?.footerDescription}
            onChange={(val) => handleChange('footerDescription', val)}
            isTextArea={true}
            onSave={onSave}
          />
        </div>

        <EditableField
          icon={Clock}
          label="Weekday Hours (Mon-Sat)"
          value={settings?.workingHours?.weekdays}
          onChange={(val) => handleNestedChange('workingHours', 'weekdays', val)}
          onSave={onSave}
        />
        <EditableField
          icon={Clock}
          label="Sunday Hours"
          value={settings?.workingHours?.sunday}
          onChange={(val) => handleNestedChange('workingHours', 'sunday', val)}
          onSave={onSave}
        />
      </div>
    </div>
  );
};

export default SettingsWebData;