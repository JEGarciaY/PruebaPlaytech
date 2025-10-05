package gm.inventarios.services;

import gm.inventarios.entity.User;

public interface AuthService {
    User login(String userName, String password);
}
