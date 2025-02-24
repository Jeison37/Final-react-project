const NotFound = () => {
  const styles = {
    div: "w-full h-screen flex justify-center items-center bg-gray-400",
    h1: "text-4xl font-bold text-white",
  };
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Error 404: pagina no encontrada </h1>
    </div>
  );
};

export default NotFound;
