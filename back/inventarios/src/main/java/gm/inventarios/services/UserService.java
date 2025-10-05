package gm.inventarios.services;


import gm.inventarios.entity.User;

import java.util.List;

public interface UserService {
    List<User> listAllUsers();
    User selectUserById(Integer idUser);
    User saveUser(User user);
    User updateUser(Integer id, User user);
    void deleteUser(Integer idProduct);
}
