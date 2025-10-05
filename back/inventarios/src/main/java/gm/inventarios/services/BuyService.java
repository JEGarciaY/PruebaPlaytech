package gm.inventarios.services;

import gm.inventarios.entity.Buy;
import java.util.List;

public interface BuyService {
    List<Buy> listAllBuys();
    String saveBuy(Integer idProduct, Integer quantity);
}
