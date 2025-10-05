package gm.inventarios.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NotFoundRecurse extends RuntimeException{
        public NotFoundRecurse(String message) {
            super(message);
        }
}

//TODO: Este es el metodo que se usa para el manejo de excepciones
