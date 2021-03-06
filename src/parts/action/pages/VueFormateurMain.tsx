import TimerZone from '../compUi/TimerZone';
import Classe from '../compUi/Classe';
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
