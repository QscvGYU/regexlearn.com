import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import * as styles from './LanguageSwitch.module.css';
import Icon from 'src/components/Icon';

import langs, { defaultLocale, langNames } from 'src/localization';
import { Context } from 'src/contexts/LanguageContext';
import getIntlPath from 'src/utils/getIntlPath';

const langList = Object.keys(langs).map(langKey => ({
  value: langKey,
  label: langNames[langKey],
}));

const LanguageSwitch = () => {
  const { lang } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const {
    pathname,
    query: { lang: queryLang, ...queries },
  } = useRouter();

  let path = pathname;

  Object.keys(queries).forEach(key => {
    path = path.replace(`[${key}]`, queries[key]);
  });

  const toggleLanguageList = () => {
    setIsOpen(!isOpen);
  };

  const closeLanguageList = () => {
    setIsOpen(false);
  };

  const getAvailableList = () => langList.filter(({ value }) => lang !== value);

  return (
    <div className={styles.LanguageSwitch}>
      <div
        className={styles.LanguageSwitchCurrent}
        role="button"
        tabIndex="0"
        onClick={toggleLanguageList}
      >
        <span>{langNames[lang]}</span>
        <Icon icon="earth" className={styles.LanguageSwitchCurrentIcon} size={16} />
      </div>
      <div
        className={styles.LanguageSwitchList}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      >
        {getAvailableList().map(({ label, value }) => (
          <Link href={getIntlPath(path, value)} key={value}>
            <a onClick={closeLanguageList} className={styles.LanguageSwitchListItem}>
              <span>{label}</span>
              <Icon icon="arrow-left" className={styles.LanguageSwitchListItemIcon} size={16} removeInlineStyle />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitch;
