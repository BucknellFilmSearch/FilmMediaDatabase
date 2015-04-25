/* *****************************************
* CSCI205 - Software Engineering and Design
* Spring 2015
*
* Name: Justin Eyster
* Date: 
*
* Project: csci205_FinalProject
* Package: Controller.SoundPlayer
* File: SoundPlayer
* Description:
*
* ****************************************
*/package Controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.LineUnavailableException;

/**
 * Includes methods for playing, stopping, and "rewinding" a WAV file.
 *
 * @author justi_000
 */
public class SoundPlayer {

    private Clip clip;
    private AudioInputStream inputStream;
    private File audioFile;

    public SoundPlayer(File audioFile) {
        try {
            this.audioFile = audioFile;
            this.clip = AudioSystem.getClip();
            // Open an input stream  to the audio file.
            this.inputStream = AudioSystem.getAudioInputStream(audioFile);
            this.clip.open(inputStream);
        } catch (LineUnavailableException ex) {
            Logger.getLogger(SoundPlayer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            System.out.println("Other exception in SoundPlayer: " + ex.getMessage());
        }

    }

    /**
     * Plays sound from a WAV file. Includes user interface to replay.
     *
     * @param audioFile - the audio file to play.
     * @throws java.io.FileNotFoundException
     * @see
     * http://stackoverflow.com/questions/26305/how-can-i-play-sound-in-java
     */
    public void playSound() throws FileNotFoundException, IOException {
        try {
            // play clip.
            this.clip.start();
            this.inputStream.close();
        } catch (FileNotFoundException e) {
            System.out.println("File not found. Try loading a different one. Double check your path + file name when loading: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Something went wrong" + e.getMessage());
        }
    }

    /**
     * Stops the audio clip mid-play.
     */
    public void stopSound() {
        this.clip.stop();
    }

    /**
     * "Rewinds" the audio file. AKA re-initializes the clip and input stream.
     */
    public void reset() {
        try {
            this.clip = AudioSystem.getClip();
            // Open an input stream  to the audio file.
            this.inputStream = AudioSystem.getAudioInputStream(this.audioFile);
            this.clip.open(inputStream);
        } catch (LineUnavailableException ex) {
            Logger.getLogger(SoundPlayer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            System.out.println("Other exception in SoundPlayer: " + ex.getMessage());
        }
    }
}
