import TimerZone from '../uiComponents/TimerZone';
import Classe from '../uiComponents/Classe';
import logo from '../../../assets/logo/logo.svg';

const VueFormateurMain = ({ time }: { time: string }) => {
  return (
    <div data-testid="VueFormateurMain">
      <img data-testid="VueFormateurMain-logo" src={logo} />
      <TimerZone time={time} />
      <Classe />
    </div>
  );
};

export default VueFormateurMain;
