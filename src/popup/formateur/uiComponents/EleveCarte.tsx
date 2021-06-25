type EleveCarteprops = {
  portrait?: string;
  prenom: string;
  nom: string;
};
const EleveCarte = ({ portrait, prenom, nom }: EleveCarteprops) => {
  return (
    <div data-testid='VueFormateurMain-Classe-Groupe-EleveCarte'>
      <img
        data-testid='VueFormateurMain-Classe-Groupe-EleveCarte-portrait'
        src={portrait}
      />
      <p data-testid='VueFormateurMain-Classe-Groupe-EleveCarte-prenom'>
        {prenom}
      </p>
      <p data-testid='VueFormateurMain-Classe-Groupe-EleveCarte-nom'>{nom}</p>
    </div>
  );
};

export default EleveCarte;
