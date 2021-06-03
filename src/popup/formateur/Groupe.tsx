import EleveCarte from './EleveCarte';

const Groupe = () => {
  return (
    <div data-testid='VueFormateurMain-Groupe'>
      <button data-testid='VueFormateurMain-Classe-leftSliderButton' />
      <EleveCarte
        portrait='https://www.mediafire.com/view/keny0p2vcze6mlf/Fawn%252C_Bobby.jpg/file'
        prenom='Bobby'
        nom='Fawn'
      />
      <button data-testid='VueFormateurMain-Classe-rightSliderButton' />
    </div>
  );
};

export default Groupe;
