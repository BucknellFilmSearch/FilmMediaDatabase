/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package view;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.StackPane;

/**
 *
 * @author Zhengri Fan
 */
/**
 * This class is mainly used to deal with pane switching
 *
 *
 * idea comes from:
 * https://blogs.oracle.com/acaicedo/entry/managing_multiple_screens_in_javafx1
 *
 * @author Zhengri Fan
 */
public class MultiPaneHolder extends StackPane {

    private HashMap<String, Node> paneMap;
    private Node curPane;

    /**
     * The enum to indicate which pane the user want to refer to
     */
    public enum GamePane {

        StartScreen, GameScreen, TransitionGroup, HelpView;

    }

    /**
     * The constructor of the class initialize a stackpane and add all childrens
     * to the pane
     */
    public MultiPaneHolder() {
        super();
        this.setPrefSize(1280, 720);
        this.paneMap = new HashMap();
        addImgView();
        addGameScrn();
        addWebScrn();
        addStartScrn();
        curPane = this.getPane(GamePane.StartScreen);

    }

    /**
     * Add the webView, which is basically the view that the user will see when
     * they willing to refer to the help contents.
     */
    private void addWebScrn() {
        FXMLLoader loader = new FXMLLoader();
        File xmlFile = new File("./src/view/HelpView.fxml");
        try {
            loader.setLocation(xmlFile.toURI().toURL());
        } catch (MalformedURLException ex) {
            Logger.getLogger(MultiPaneHolder.class.getName()).log(Level.SEVERE, null, ex);
        }
        AnchorPane webPage = null;
        try {
            webPage = (AnchorPane) loader.load();
        } catch (IOException ex) {
            Logger.getLogger(MultiPaneHolder.class.getName()).log(Level.SEVERE, null, ex);
        }
        this.paneMap.put(GamePane.HelpView.name(), webPage);
        this.getChildren().add(webPage);
    }

    /**
     * Add the start screen, which is basically the view that the user will see
     * when they just start the game.
     */
    private void addStartScrn() {
        FXMLLoader loader = new FXMLLoader();
        File xmlFile = new File("./src/view/MainPage.fxml");
        try {
            loader.setLocation(xmlFile.toURI().toURL());
        } catch (MalformedURLException ex) {
            Logger.getLogger(MultiPaneHolder.class.getName()).log(Level.SEVERE, null, ex);
        }
        AnchorPane mainPage = null;
        try {
            mainPage = (AnchorPane) loader.load();
        } catch (IOException ex) {
            Logger.getLogger(MultiPaneHolder.class.getName()).log(Level.SEVERE, null, ex);
        }
        this.paneMap.put(GamePane.StartScreen.name(), mainPage);
        this.getChildren().add(mainPage);
    }

    /**
     * Add the game screen, which is basically the view that the user will see
     * when they are playing the actually game.
     */
    private void addGameScrn() {
        FXMLLoader loader = new FXMLLoader();
        File xmlFile = new File("./src/view/gameView.fxml");
        try {
            loader.setLocation(xmlFile.toURI().toURL());
        } catch (MalformedURLException ex) {
            Logger.getLogger(MultiPaneHolder.class.getName()).log(Level.SEVERE, null, ex);
            System.exit(1);
        }
        AnchorPane gamePage = null;
        try {
            gamePage = (AnchorPane) loader.load();
        } catch (IOException ex) {
            Logger.getLogger(MultiPaneHolder.class.getName()).log(Level.SEVERE, null, ex);
            System.exit(2);
        }
        this.paneMap.put(GamePane.GameScreen.name(), gamePage);
        this.getChildren().add(gamePage);
    }

    /**
     * Add a group to perform transforamtion animations between two panes.
     */
    private void addImgView() {
        StackPane imgGrp = new StackPane();
        this.paneMap.put(GamePane.TransitionGroup.name(), imgGrp);
        this.getChildren().add(imgGrp);
    }

    /**
     * Get the pane indicated by the name
     *
     * @param name the pane you want to get.
     * @return
     */
    public Node getPane(GamePane name) {
        return this.paneMap.get(name.name());
    }

    /**
     * Set the display pane to the pane indicated by the name. If there is no
     * such a pane, then do nothing.
     *
     * @param name
     */
    public void setDisplayPane(GamePane name) {
        Node paneToDisplay = this.getPane(name);
        if (paneToDisplay == null) {
            return;
        }
        //learned how to change children form:
        //http://stackoverflow.com/questions/17761415/how-to-change-order-of-children-in-javafx
        ObservableList<Node> allPane = FXCollections.observableArrayList(this.getChildren());
        int paneIdx = allPane.indexOf(paneToDisplay);
        int curPaneIdx = allPane.indexOf(this.getCurPane());
        Collections.swap(allPane, curPaneIdx, paneIdx);
        this.getChildren().setAll(allPane);
        this.curPane = paneToDisplay;

    }

    /**
     * Get the currently showed pane
     *
     * @return the currently showed pane
     */
    public Node getCurPane() {
        return curPane;
    }

}
