import { useState } from "react";

export function useWhatsApp() {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = ["+573113666417","+573205283754","+573009766163", "+573144907336" ];
  const seller = [ 'ANTOTEX', 'RAMON', 'ANDRES', 'DANIEL']

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const generateWhatsAppLink = (phoneNumber, message) => {
    const url = `https://wa.me/${phoneNumber}`;
    const encodedMessage = encodeURIComponent(message);
    return `${url}?text=${encodedMessage}`;
  };

  return {
    items,
    seller,
    selectedItem,
    handleItemClick,
    generateWhatsAppLink,
  };
}
