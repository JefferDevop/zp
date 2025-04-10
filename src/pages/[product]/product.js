import { BasicLayout } from "@/layouts";
import {
  DetailProduct,
  FooterApp,
  FooterAppFloat,
  Redes,
  Separator,
} from "@/components";

export default function ProductPage(props) {
  const { product, relate } = props;

  return (
    <div>
      <BasicLayout>
        <Redes />
        <DetailProduct product={product} relate={relate} />
        
        <FooterAppFloat />
        <FooterApp />
        <Separator />
      </BasicLayout>
    </div>
  );
}
