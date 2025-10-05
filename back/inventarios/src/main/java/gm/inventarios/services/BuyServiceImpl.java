package gm.inventarios.services;

import gm.inventarios.entity.Buy;
import gm.inventarios.entity.Product;
import gm.inventarios.exception.NotFoundRecurse;
import gm.inventarios.repository.BuyRepository;
import gm.inventarios.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BuyServiceImpl implements BuyService {

    @Autowired
    private BuyRepository buyRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Buy> listAllBuys() {
        List<Buy> buysList = buyRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        if (buysList.isEmpty()) {
            throw new NotFoundRecurse("No existen compras");
        }
        return buysList;
    }

    @Override
    public String saveBuy(Integer idProduct, Integer quantity) {
        Product product = productRepository.findProductById(idProduct);
        if (product == null) {
            throw new NotFoundRecurse("No existe el producto con id: " + idProduct);
        }
        if (product.getStock() < quantity) {
            throw new NotFoundRecurse("No hay suficiente stock para el producto con id: " + idProduct);
        }
        Double totalPrice = product.getPrice() * quantity;
        LocalDate date = LocalDate.now();

        Buy buy = new Buy();
        buy.setIdProduct(idProduct);
        buy.setNameProduct(product.getName());
        buy.setQuantity(quantity);
        buy.setDate(date);
        buy.setUnitPrice(product.getPrice());
        buy.setTotalPrice(totalPrice);

        buyRepository.save(buy);

        productRepository.updateStock(product.getId(), product.getStock() - quantity);
        return "Producto comprado con id: " + idProduct + " y cantidad: " + quantity;
    }
}
