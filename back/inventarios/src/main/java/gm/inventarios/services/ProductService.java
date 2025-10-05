package gm.inventarios.services;

import gm.inventarios.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> listAllProducts();
    Product selectOneById(Integer idProduct);
    Product saveProduct(Product product);
    Product updateProduct(Integer id, Product product);
    void deleteProduct(Integer idProduct);
}
