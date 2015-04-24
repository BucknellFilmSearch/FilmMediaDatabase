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
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.SnapshotParameters;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.image.WritableImage;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.StackPane;
import javafx.scene.text.Text;
import javafx.util.Duration;
import view.MultiPaneHolder;

/**
 * FXML Controller class
 *
 * @author Zhengri Fan
 */
public class MainPageController implements Initializable {

    @FXML
    private Text startText;

    @FXML
    private AnchorPane rootPane;

    private static MultiPaneHolder root;

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {

    }

    /**
     *
     *
     *
     * @see
     * http://stackoverflow.com/questions/27089627/javafx-switch-scene-with-slide-effect
     */
    @FXML
    private void startGame() {

        WritableImage wi = new WritableImage(1280, 720);
        Image img1 = root.getCurPane().snapshot(new SnapshotParameters(), wi);
        ImageView imgView1 = new ImageView(img1);
        wi = new WritableImage(1280, 720);
        Image img2 = root.getPane(MultiPaneHolder.GamePane.GameScreen).snapshot(new SnapshotParameters(), wi);
        ImageView imgView2 = new ImageView(img2);
        imgView1.setTranslateX(0);
        imgView2.setTranslateY(-720);
        ((StackPane) root.getPane(MultiPaneHolder.GamePane.TransitionGroup)).getChildren().add(imgView1);
        ((StackPane) root.getPane(MultiPaneHolder.GamePane.TransitionGroup)).getChildren().add(imgView2);
        root.setDisplayPane(MultiPaneHolder.GamePane.TransitionGroup);
        Timeline timeline = new Timeline();
        KeyValue kv = new KeyValue(imgView2.translateYProperty(), 0, Interpolator.EASE_BOTH);
        KeyFrame kf = new KeyFrame(Duration.seconds(1), kv);
        timeline.getKeyFrames().add(kf);
        timeline.setOnFinished(t -> {
            root.setDisplayPane(MultiPaneHolder.GamePane.GameScreen);
        });
        timeline.play();
    }

    @FXML
    private void helpView() {
        WritableImage wi = new WritableImage(1280, 720);
        Image img1 = root.getCurPane().snapshot(new SnapshotParameters(), wi);
        ImageView imgView1 = new ImageView(img1);
        wi = new WritableImage(1280, 720);
        Image img2 = root.getPane(MultiPaneHolder.GamePane.HelpView).snapshot(new SnapshotParameters(), wi);
        ImageView imgView2 = new ImageView(img2);
        imgView1.setTranslateX(0);
        imgView2.setTranslateY(720);
        ((StackPane) root.getPane(MultiPaneHolder.GamePane.TransitionGroup)).getChildren().add(imgView1);
        ((StackPane) root.getPane(MultiPaneHolder.GamePane.TransitionGroup)).getChildren().add(imgView2);
        root.setDisplayPane(MultiPaneHolder.GamePane.TransitionGroup);
        Timeline timeline = new Timeline();
        KeyValue kv = new KeyValue(imgView2.translateYProperty(), 0, Interpolator.EASE_BOTH);
        KeyFrame kf = new KeyFrame(Duration.seconds(1), kv);
        timeline.getKeyFrames().add(kf);
        timeline.setOnFinished(t -> {
            root.setDisplayPane(MultiPaneHolder.GamePane.HelpView);
        });
        timeline.play();
    }

    public static void setRoot(MultiPaneHolder root) {
        MainPageController.root = root;
    }

    public static MultiPaneHolder getRoot() {
        return MainPageController.root;
    }
}
