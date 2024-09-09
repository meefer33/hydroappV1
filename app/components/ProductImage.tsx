import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function ProductImage({
  image,
}: {
  image: ProductVariantFragment['image'];
}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image">
      <Image
        alt={image.altText || 'Product Image'}
        //aspectRatio="2/5"
        width="550"
        height="600"
        //crop="center"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
        //style={{objectFit:"cover",width:"550px",height:"600px"}}
      />
    </div>
  );
}
