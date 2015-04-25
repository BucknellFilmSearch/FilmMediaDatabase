/* *****************************************
* CSCI205 - Software Engineering and Design
* Spring 2015
*
* Name: Justin Eyster
* Date: Can't convert the date to string, because it is not known which parts of the date variable are in use. Use ?date, ?time or ?datetime built-in, or ?string.<format> or ?string(format) built-in with this date.
* Time: Can't convert the date to string, because it is not known which parts of the date variable are in use. Use ?date, ?time or ?datetime built-in, or ?string.<format> or ?string(format) built-in with this date.
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
