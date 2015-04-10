/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CardDeckHand;

/**
 *
 * @author justi_000
 */
public class BadCardCreationException extends Exception {

    private String message;

    public BadCardCreationException(String message) {
        this.message = message;
    }

}
