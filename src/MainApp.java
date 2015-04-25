/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import java.io.IOException;
import java.net.MalformedURLException;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;

/**
 *
 * @author Zhengri Fan
 */
public class MainApp extends Application {

    @Override
    public void start(Stage primaryStage) throws MalformedURLException, IOException {
        view.MultiPaneHolder root = new view.MultiPaneHolder();
        Controller.MainPageController.setRoot(root);
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
