import { defaultLocale } from 'src/localization';
import HomePage from './[lang]/index';

export default HomePage;

export async function getStaticProps(context) {
  return {
    props: {
      lang: defaultLocale,
    },
  };
}
