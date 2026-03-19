import React from 'react';
import { Instagram, Facebook, Twitter, MessageCircle, Share2 } from 'lucide-react';
import EditableField from './EditableField';

const SettingsSocial = ({ settings, handleNestedChange, onSave }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="text-xl font-black text-[#0A0A0A] flex items-center gap-3">
          <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
            <Share2 size={20} />
          </div>
          Social Media Links
        </h2>
        <p className="text-xs text-gray-500 mt-2 font-medium">
          Manage your external links. These appear in the website footer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <EditableField
          icon={Instagram}
          label="Instagram ID"
          value={settings?.socials?.instagram}
          onChange={(val) => handleNestedChange('socials', 'instagram', val)}
          onSave={onSave}
        />
        <EditableField
          icon={Facebook}
          label="Facebook ID"
          value={settings?.socials?.facebook}
          onChange={(val) => handleNestedChange('socials', 'facebook', val)}
          onSave={onSave}
        />
        <EditableField
          icon={Twitter}
          label="Twitter (X) ID"
          value={settings?.socials?.twitter}
          onChange={(val) => handleNestedChange('socials', 'twitter', val)}
          onSave={onSave}
        />
        <EditableField
          icon={MessageCircle}
          label="WhatsApp NO"
          value={settings?.socials?.whatsapp}
          onChange={(val) => {
            const onlyNums = val.replace(/[^0-9]/g, '');

            if (onlyNums.length <= 10) {
              handleNestedChange('socials', 'whatsapp', onlyNums);
            }
          }}
          onSave={onSave}
        />
      </div>
    </div>
  );
};

export default SettingsSocial;