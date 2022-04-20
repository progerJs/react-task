import {useState} from 'react';

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)
  
    const onChange = (e) => {
      const re = /^[A-Za-z0-9\b]+$/;
  
      if (e.target.value === '' || re.test(e.target.value)) {
        setValue(e.target.value)
      }else {
        alert('Only Latin and numbers are allowed')
      }
  }
  
    return {
      bind: {
        value,
        onChange,
      },
      clear: () => setValue(''),
      value: () => value
    }
  }

  export default useInputValue;