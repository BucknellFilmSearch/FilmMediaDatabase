/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package view;

import Controller.MainPageController;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.animation.Interpolator;
import javafx.animation.KeyFrame;
import javafx.animation.KeyValue;
import javafx.animation.Timeline;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.SnapshotParameters;
import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.image.WritableImage;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Pane;
import javafx.scene.layout.StackPane;
import javafx.scene.web.WebView;
import javafx.util.Duration;

/**
 *
 * @author Zhengri Fan
 */
public class MultiPaneHolder extends StackPane {

    private HashMap<String, Node> paneMap;
    private Node curPane;

    public enum GamePane {

        StartScreen, GameScreen, TransitionGroup, HelpView;

    }

    public MultiPaneHolder() {
        super();
        this.setPrefSize(1280, 720);
        this.paneMap = new HashMap();
        addImgView();
        addGameScrn();
        Pane webPane = new Pane();
        webPane.setPrefSize(1280, 720);
        Button backButton = new Button("back");
        backButton.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent e) {
                MultiPaneHolder root = MainPageController.getRoot();
                WritableImage wi = new WritableImage(1280, 720);
                Image img1 = root.getCurPane().snapshot(new SnapshotParameters(), wi);
                ImageView imgView1 = new ImageView(img1);
                wi = new WritableImage(1280, 720);
                Image img2 = root.getPane(MultiPaneHolder.GamePane.StartScreen).snapshot(new SnapshotParameters(), wi);
                ImageView imgView2 = new ImageView(img2);
                imgView1.setTranslateX(0);
                imgView2.setTranslateY(0);
                ((StackPane) root.getPane(MultiPaneHolder.GamePane.TransitionGroup)).getChildren().add(imgView2);
                ((StackPane) root.getPane(MultiPaneHolder.GamePane.TransitionGroup)).getChildren().add(imgView1);
                root.setDisplayPane(MultiPaneHolder.GamePane.TransitionGroup);
                Timeline timeline = new Timeline();
                KeyValue kv = new KeyValue(imgView1.translateYProperty(), -720, Interpolator.EASE_BOTH);
                KeyFrame kf = new KeyFrame(Duration.seconds(1), kv);
                timeline.getKeyFrames().add(kf);
                timeline.setOnFinished(t -> {
                    root.setDisplayPane(MultiPaneHolder.GamePane.StartScreen);
                });
                timeline.play();
            }
        });
        webPane.getChildren().add(backButton);
        WebView Wv = new WebView();
        Wv.setPrefSize(1280, 720);
        webPane.getChildren().add(Wv);
        this.getChildren().add(webPane);
        this.paneMap.put(GamePane.HelpView.name(), webPane);
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
