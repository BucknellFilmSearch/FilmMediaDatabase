/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

/**
 *
 * @author huangjiayu
 */
public class CallMoreException extends Exception {

    private String message;

    public CallMoreException(String message) {
        this.message = message;
    }

}
