package gm.inventarios.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends RuntimeException{

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<String> handleCustomException(CustomException customException) {
        return ResponseEntity.status(customException.getHttpStatus()).body(customException.getMessage());
    }
}

//TODO: Este es el controlador que se usa para el manejo de excepciones de la forma que usaba anteriormente