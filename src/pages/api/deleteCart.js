export default async function handler(req, res) {
    if (req.method === "POST") {
      console.log("Solicitud recibida para borrar el carrito en 10 minutos...");
  
      setTimeout(async () => {
        try {
          const shouldDeleteCart = async () => {
            return Math.random() > 0.5; // Simulación
          };
  
          const shouldDelete = await shouldDeleteCart(); 
  
          if (shouldDelete) {
            console.log("Eliminando carrito...");
            await deleteAllCart(); // Debes definir esta función
          } else {
            console.log("No se eliminó el carrito.");
          }
        } catch (error) {
          console.error("Error al procesar la eliminación del carrito:", error);
        }
      }, 600000); // 10 minutos
  
      return res.status(200).json({ message: "Eliminación programada en 10 minutos" });
    }
  
    return res.status(405).json({ error: "Método no permitido" });
  }