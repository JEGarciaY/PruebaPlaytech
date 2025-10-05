package gm.inventarios.services;

import gm.inventarios.entity.User;
import gm.inventarios.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User login(String userName, String password) {
        User user  = userRepository.findByUserName(userName);
        if (!user.getPassword().equals(password) || !user.getUserName().equals(userName)) {
              throw new RuntimeException("Credenciales inválidas");
        }
        return user;
    }
}
