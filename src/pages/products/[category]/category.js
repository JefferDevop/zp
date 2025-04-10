import { Listproducts, Footer, NotFound, Redes, FooterApp, FooterAppFloat } from "@/components";
import { BasicLayout } from "@/layouts";
import { Products } from "@/api/products";
import { useCategories } from "@/contexts/CategoryContext";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const productCtrl = new Products();

export default function CategoryPage() {
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { query } = useRouter();
  const { category: slug } = query;
  

  // Encontrar la categoría por slug
  const result = categories?.find((cat) => cat.slug === slug);

  const categoryId = result?.id;


  // Obtener los productos usando el ID de la categoría encontrada
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => productCtrl.getProductsByCategory(categoryId),
    enabled: !!categoryId, // Solo ejecutar si existe el ID
    staleTime: 1000 * 60 * 1, // 1 minuto
    cacheTime: 1000 * 60 * 1, // 1 minuto
  });

  if (!result) {
    return <NotFound title="Categoría no encontrada" />;
  }

  return (
    <BasicLayout>
   <Redes/>

      <Listproducts
        products={products}
        title={result.name}
        isLoadingProducts={isLoadingProducts}
        isLoadingCategories={isLoadingCategories}
      />
      <FooterAppFloat/>
      <FooterApp/>  
    </BasicLayout>
  );
}
