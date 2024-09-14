import { useEffect, useRef } from 'react';

export const DivFocus =() => {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={divRef}
      tabIndex={-1} // Necessário para a div ser "focável"
      className='border-none'
    >
    </div>
  );
}
