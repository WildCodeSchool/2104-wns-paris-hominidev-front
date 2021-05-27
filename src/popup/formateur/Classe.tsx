const Classe = () => {
  return (
    <div data-testid='vueFormateurMain-classe'>
      <form data-testid='vueFormateurMain-classe-form'>
        <label
          data-testid='vueFormateurMain-classe-form-label'
          htmlFor='group-select'
        >
          CLASSE
        </label>
        <select
          data-testid='vueFormateurMain-classe-form-select'
          id='group-select'
        ></select>
      </form>
      <div>
        <input
          data-testid='vueFormateurMain-classe-checkbox'
          type='checkbox'
          id='orderByResources'
        />
        <p>ordonner par ressources visitées</p>
      </div>
    </div>
  );
};

export default Classe;
