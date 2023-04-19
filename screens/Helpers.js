const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    });
    return formatter.format(value);
  };
  
  export default formatCurrency;