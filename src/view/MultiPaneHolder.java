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
import javafx.scene.Group;
import javafx.scene.Node;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.StackPane;

/**
 *
 * @author Zhengri Fan
 */
public class MultiPaneHolder extends StackPane {

    private HashMap<String, Node> paneMap;
    private Node curPane;

    public enum GamePane {

        StartScreen, GameScreen, TransitionGroup;
//SnapShotBefore, SnapShotAfter,
    }

    public MultiPaneHolder() {
        super();
        this.setPrefSize(1280, 720);
        this.paneMap = new HashMap();
        addImgView();
        addGameScrn();
        addStartScrn();
        curPane = this.getPane(GamePane.StartScreen);

    }

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
        this.paneMap.put("StartScreen", mainPage);
        this.getChildren().add(mainPage);
    }

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
        this.paneMap.put("GameScreen", gamePage);
        this.getChildren().add(gamePage);
//        gamePage.setDisable(true);
    }

    private void addImgView() {
        StackPane imgGrp = new StackPane();
        this.paneMap.put(GamePane.TransitionGroup.name(), imgGrp);
        this.getChildren().add(imgGrp);
    }

    public Node getPane(GamePane name) {
        return this.paneMap.get(name.name());
    }

    public void setDisplayPane(GamePane name) {
        Node paneToDisplay = this.getPane(name);
        if (paneToDisplay == null) {
            return;
        }
        //http://stackoverflow.com/questions/17761415/how-to-change-order-of-children-in-javafx
        ObservableList<Node> allPane = FXCollections.observableArrayList(this.getChildren());
        int paneIdx = allPane.indexOf(paneToDisplay);
        int curPaneIdx = allPane.indexOf(this.getCurPane());
//        for (Node d : this.paneMap.values()) {
//            d.setDisable(true);
//        }
//        paneToDisplay.setDisable(false);
        Collections.swap(allPane, curPaneIdx, paneIdx);
        this.getChildren().setAll(allPane);
        this.curPane = paneToDisplay;

    }

    public Node getCurPane() {
        return curPane;
    }

}
