/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

/**
 *
 * @author Jiayu
 */
public class NoMoneyException extends Exception {

    private String message;

    public NoMoneyException(String message) {
        this.message = message;
    }

}
