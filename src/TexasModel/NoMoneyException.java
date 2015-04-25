/* *****************************************
 * CSCI205 - Software Engineering and Design
 * Spring 2015
 *
 * Name: Jiayu Huang
 * Date: April 7, 2015
 * Time: 5:30:00 PM
 *
 * Project: csci205
 * Package: CS205Final.TexasModel
 * File: No Money Exception
 * Description:
 * It is the exception to handle the case if the player has no money to call &
 raise
 * ****************************************
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
