type TimerZoneProps = {
  time: string;
};
const TimerZone = ({ time }: TimerZoneProps) => {
  return (
    <textarea
      data-testid='vueFormateurMain-timerzone'
      name='timer'
      value={time}
    ></textarea>
  );
};

export default TimerZone;
