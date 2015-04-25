/* *****************************************
* CSCI205 - Software Engineering and Design
* Spring 2015
*
* Name: Justin Eyster
* Date: 
*
* Project: csci205_FinalProject
* Package: TexasModel.SixCardHandException
* File: SixCardHandException
* Description:
*
* ****************************************
*/package TexasModel;

/**
 *
 * @author justi_000
 */
public class SixCardHandException extends Exception {

    private String message;

    public SixCardHandException(String message) {
        this.message = message;
    }

}
