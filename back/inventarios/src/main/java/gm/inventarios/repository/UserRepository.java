package gm.inventarios.repository;

import gm.inventarios.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserName(String userName);

    User findUserById(Integer idUser);
}
