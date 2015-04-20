/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package view;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.StackPane;

/**
 *
 * @author Zhengri Fan
 */
public class MultiPaneHolder extends StackPane {

    private HashMap<String, Node> paneMap;

    public enum GamePane {

        StartScreen, GameScreen;

    }

    public MultiPaneHolder() {
        super();
        this.setPrefSize(1280, 720);
        this.paneMap = new HashMap();
        addScrn();

    }

    private void addScrn() {
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

        loader = new FXMLLoader();
        xmlFile = new File("./src/view/gameView.fxml");
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
        this.getChildren().add(mainPage);
        gamePage.setOpacity(0.0);
        gamePage.setDisable(true);
    }

    public Node getPane(GamePane name) {
        return this.paneMap.get(name.name());
    }

    public void setDisplayPane(GamePane name) {
        Node paneToDisplay = this.getPane(name);
        if (paneToDisplay == null) {
            return;
        }
        for (Node d : this.paneMap.values()) {
            d.setOpacity(0.0);
            d.setDisable(true);
        }
        paneToDisplay.setOpacity(1.0);
        paneToDisplay.setDisable(false);
    }

}
