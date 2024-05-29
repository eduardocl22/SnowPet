export const limpiarObjeto = (objeto) => {
    const objetoLimpio = {};
    for (const [clave, valor] of Object.entries(objeto)) {
      if (typeof valor === 'string' && valor.trim() !== "" && valor !== null && valor !== undefined) {
        objetoLimpio[clave] = valor;
      } else if (typeof valor !== 'string' && valor !== null && valor !== undefined) {
        objetoLimpio[clave] = valor;
      }
    }
    return objetoLimpio;
  };
  