import React from "react";
import { Carousel } from "react-responsive-carousel";
import { map } from "lodash";
import { BASE_NAME } from "@/config/constants";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./ImageCarousel.module.scss";
import { CardImg } from "reactstrap";

export function ImageCarousel(props) {
  const { images } = props;

  const scale = "c_scale,f_auto,q_30,w_800/";
  const upload = "image/upload/";

  const handleDownload = (imageUrl) => {

    // Lógica para activar la descarga de la imagen
    // Puedes usar la lógica existente o implementar una nueva aquí
    // Por ejemplo, puedes abrir la imagen en una nueva ventana y permitir que los usuarios la descarguen desde allí
   if(imageUrl.image)   {
      window.open(BASE_NAME + imageUrl.image, "_blank");
    }else if (imageUrl.image_alterna){
      window.open(imageUrl.image_alterna, "_blank");
    }else{
      return
    }
    
  };

  return (
    <>
      <Carousel
        infiniteLoop={true}
        showThumbs={false}
        preventMovementUntilSwipeScrollTolerance={true}
      >
        {map(images, (image, index) => (
          <div
            onClick={() => handleDownload(image)}
            className={styles.carousel}
            key={index}
          >
            {image.image ? (
              <CardImg alt={`Slide ${index}`} src={BASE_NAME + upload + scale + image.image?.split(upload)[1]} />
            ) : (
              <CardImg alt={`Slide ${index}`} src={image.image_alterna} />
            )}
          </div>
        ))}
      </Carousel>
    </>
  );
}
