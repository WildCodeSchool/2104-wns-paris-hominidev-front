const Classe = () => {
  return (
    <div data-testid='VueFormateurMain-Classe'>
      <form data-testid='VueFormateurMain-Classe-form'>
        <label
          data-testid='VueFormateurMain-Classe-form-label'
          htmlFor='group-select'
        >
          CLASSE
        </label>
        <select
          data-testid='VueFormateurMain-Classe-form-select'
          id='group-select'
        ></select>
      </form>
      <div>
        <input
          data-testid='VueFormateurMain-Classe-checkbox'
          type='checkbox'
          id='orderByResources'
        />
        <p>ordonner par ressources visitées</p>
      </div>
    </div>
  );
};

export default Classe;
