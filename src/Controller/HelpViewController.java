/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.animation.Interpolator;
import javafx.animation.KeyFrame;
import javafx.animation.KeyValue;
import javafx.animation.Timeline;
import javafx.application.Platform;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.SnapshotParameters;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.image.WritableImage;
import javafx.scene.layout.StackPane;
import javafx.scene.web.WebHistory;
import javafx.scene.web.WebView;
import javafx.util.Duration;
import view.MultiPaneHolder;

/**
 * FXML Controller class
 *
 * @author Zhengri Fan
 */
public class HelpViewController implements Initializable {

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        wV.getEngine().load("http://en.wikipedia.org/wiki/Texas_hold_%27em");
        updateView();
    }

//    @FXML
//    private Button btnBack;
    @FXML
    private WebView wV;

    @FXML
    private void backToStart() {
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
        KeyValue kv = new KeyValue(imgView1.translateYProperty(), 720, Interpolator.EASE_BOTH);
        KeyFrame kf = new KeyFrame(Duration.seconds(1), kv);
        timeline.getKeyFrames().add(kf);
        timeline.setOnFinished(t -> {
            root.setDisplayPane(MultiPaneHolder.GamePane.StartScreen);
        });
        timeline.play();
    }

//    @FXML
//    private void showBtn(MouseEvent event) {
//        FadeTransition ft = new FadeTransition(Duration.millis(500), this.btnBack);
//        ft.setFromValue(0);
//        ft.setToValue(Double.MAX_VALUE);
//        ft.play();
//        this.btnBack.setDisable(false);
//    }
//
//    @FXML
//    private void rmBtn() {
//        this.btnBack.setLayoutY(0);
//        Timeline timeline = new Timeline();
//        KeyValue kv = new KeyValue(this.btnBack.translateYProperty(), -this.btnBack.getHeight(), Interpolator.EASE_BOTH);
//        KeyFrame kf = new KeyFrame(Duration.seconds(0.3), kv);
//        timeline.getKeyFrames().add(kf);
//        timeline.setOnFinished(t -> {
//            this.btnBack.setOpacity(0);
//            this.btnBack.setDisable(true);
//            this.btnBack.setLayoutY(0);
//        });
//        timeline.play();
//    }
    @FXML
    private void surfBack() {
        //System.out.println(this.goBack());
        this.wV.getEngine().load(this.goBack());
    }

    private String goBack() {
        final WebHistory history = wV.getEngine().getHistory();
        ObservableList<WebHistory.Entry> entryList = history.getEntries();
        int currentIndex = history.getCurrentIndex();
        Platform.runLater(new Runnable() {
            public void run() {
                try {
                    history.go(-1);
                } catch (IndexOutOfBoundsException indexOutOfBoundsException) {
                    wV.getEngine().load("http://en.wikipedia.org/wiki/Texas_hold_%27em");
                }
            }
        });
        return entryList.get(currentIndex > 0 ? currentIndex - 1 : currentIndex).getUrl();
    }

    private void updateView() {

    }
}
