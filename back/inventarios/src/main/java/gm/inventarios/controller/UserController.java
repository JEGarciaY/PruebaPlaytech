package gm.inventarios.controller;

import gm.inventarios.entity.User;
import gm.inventarios.services.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
@Log4j2
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> listAllUsers() {
        List<User> userList = userService.listAllUsers();
        return ResponseEntity.ok().body(userList);
    }

    @GetMapping("/selectUserById/{idUser}")
    public ResponseEntity<User> selectUserById(@PathVariable Integer idUser) {
        User user = userService.selectUserById(idUser);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/saveUser")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User userSaved = userService.saveUser(user);
        return ResponseEntity.ok().body(userSaved);
    }

    @PutMapping("/updateUser/{idUser}")
    public ResponseEntity<User> updateUser(@PathVariable Integer idUser, @RequestBody User user) {
        User userUpdated = userService.updateUser(idUser, user);
        return ResponseEntity.ok().body(userUpdated);
    }

    @DeleteMapping("/deleteUser/{idUser}")
    public ResponseEntity<Map<String,Boolean>> deleteUser(@PathVariable Integer idUser) {
        userService.deleteUser(idUser);
        Map<String,Boolean> response = new HashMap<>();
        response.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok().body(response);
    }
}
