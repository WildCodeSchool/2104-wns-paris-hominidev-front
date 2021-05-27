import TimerZone from './TimerZone';
import Classe from './Classe';
import logo from '../../../assets/logo/logo.svg';

const VueFormateurMain = () => {
  return (
    <div data-testid='VueFormateurMain'>
      <img data-testid='VueFormateurMain-logo' src={logo} />
      <TimerZone />
      <Classe />
    </div>
  );
};

export default VueFormateurMain;
