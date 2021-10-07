import React, { useState } from 'react';

const useInput = (initialState: any) => {
   const [value, setValue] = useState(initialState);
   console.log(value);

   return {
      value,
      setValue,
      reset: () => setValue(''),
      bind: {
         value,
         onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
         },
      },
   };
};

export default useInput;
