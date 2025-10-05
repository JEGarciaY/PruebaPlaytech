package gm.inventarios.services;


import gm.inventarios.entity.User;
import gm.inventarios.exception.NotFoundRecurse;
import gm.inventarios.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> listAllUsers() {
        List<User> userList = userRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        if (userList.isEmpty()) {
            throw new NotFoundRecurse("No existen usuarios");
        }
        return userList;
    }

    @Override
    public User selectUserById(Integer idUser) {
        User user = userRepository.findUserById(idUser);
        if (user == null) {
            throw new NotFoundRecurse("No existe el usuario con id: " + idUser);
        }
        return user;
    }

    @Override
    public User saveUser(User user) {
        User userDB = userRepository.findByUserName(user.getUserName());
        if(userDB != null) {
            if (userDB.getUserName().equals(user.getUserName())) {
                throw new NotFoundRecurse("Usuario " + user.getUserName() + " ya registrado");
            }
        }
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Integer id, User user) {
        User userUpdated = userRepository.findUserById(id);
        if (userUpdated == null) {
            throw new NotFoundRecurse("No existe el usuario con id: " + id);
        }
        userUpdated.setId(user.getId());
        userUpdated.setUserName(user.getUserName());
        userUpdated.setPassword(user.getPassword());
        userUpdated.setRole(user.getRole());
        return userRepository.save(userUpdated);
    }

    @Override
    public void deleteUser(Integer idUser) {
        User user = userRepository.findUserById(idUser);
        if (user == null) {
            throw new NotFoundRecurse("No existe el usuario con id: " + idUser);
        }
        userRepository.delete(user);
    }
}
