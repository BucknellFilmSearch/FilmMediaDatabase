/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Main;

import TexasModel.GameModel;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

/**
 *
 * @author Zhengri Fan
 */
public class MainApp extends Application {

    private GameModel themodel;

    @Override
    public void start(Stage primaryStage) throws MalformedURLException, IOException {
        StackPane root;
        primaryStage.setTitle("Texas Hold'em");

        FXMLLoader loader = new FXMLLoader();
        File xmlFile = new File("./src/view/MainPage.fxml");
        loader.setLocation(xmlFile.toURI().toURL());
        AnchorPane mainPage = (AnchorPane) loader.load();

        loader = new FXMLLoader();
        xmlFile = new File("./src/view/gameView.fxml");
        loader.setLocation(xmlFile.toURI().toURL());
        AnchorPane gamePage = (AnchorPane) loader.load();

        root = new StackPane();
        root.setPrefSize(1280, 720);
        root.getChildren().add(gamePage);
        root.getChildren().add(mainPage);

        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }

}
