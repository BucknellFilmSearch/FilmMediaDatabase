/* *****************************************
* CSCI205 - Software Engineering and Design
* Spring 2015
*
* Name: Justin Eyster
* Date: 
*
* Project: csci205_FinalProject
* Package: TexasModel.BadCardCreationException
* File: BadCardCreationException
* Description:
*
* ****************************************
*/package TexasModel;

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
