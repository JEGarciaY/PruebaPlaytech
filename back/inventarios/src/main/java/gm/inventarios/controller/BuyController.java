package gm.inventarios.controller;

import gm.inventarios.entity.Buy;
import gm.inventarios.services.BuyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/buys")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class BuyController {

    @Autowired
    private BuyService buyService;

    @GetMapping("/allBuys")
    public ResponseEntity<List<Buy>> listAllBuys() {
        List<Buy> buysList = buyService.listAllBuys();
        return ResponseEntity.ok().body(buysList);
    }

    @PostMapping("/saveBuy")
    public ResponseEntity<Map<String, Object>> saveBuy(@RequestParam Integer idProduct, @RequestParam Integer quantity) {
        String response = buyService.saveBuy(idProduct, quantity);
        return ResponseEntity.ok(Map.of("message", response, "ok", true));
    }
}
