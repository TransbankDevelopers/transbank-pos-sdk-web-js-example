import "./ProductCard.css";

interface ProductCardProps {
  price: number;
  imagePath: string;
  children: React.ReactNode;
  alt?: string;
}

const ProductCard = (props: ProductCardProps) => {
  const { price, imagePath, children, alt } = props;
  return (
    <div className="card">
      <div className="product-img">
        <img src={imagePath} alt={alt} />
      </div>
      <div className="product-data">
        <span className="card-title pl-4">Alimento</span>
        <span className="card-product pl-4">{children}</span>
        <button className="button">
          <span className="button-text">${price}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
