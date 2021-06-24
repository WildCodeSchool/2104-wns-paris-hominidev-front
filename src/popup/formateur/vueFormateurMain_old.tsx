import Timer from './Timer';
import Classe from './Classe';
import logo from '../../../assets/logo/logo.svg';

const VueFormateurMain = () => {
  return (
    <div data-testid="vueFormateurMain">
      <img data-testid="vueFormateurMain-logo" src={logo} />
      <Timer />
      <Classe />
    </div>
  );
};

export default VueFormateurMain;
