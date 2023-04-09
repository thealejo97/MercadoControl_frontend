export const fetchData = async () => {
    try {
      const response = await fetch('https://mercadocontrolback.fly.dev/api/users/');
      //const response = await fetch('https://primerocalivalleadelante.com/prueba.php');
      const data = await response.json();console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };