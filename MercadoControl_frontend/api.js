export const fetchData = async () => {
    try {
      const response = await fetch('https://mercadocontrolback.fly.dev/api/users/');
      const data = await response;console.log(data);
      return data.json();
    } catch (error) {
      console.error(error);
    }
  };