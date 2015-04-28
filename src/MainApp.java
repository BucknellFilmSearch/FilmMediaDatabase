/* *****************************************
 * CSCI205 - Software Engineering and Design
 * Spring 2015
 *
 * Name: Jiayu Huang, Zhengri Fan, Chengjunjie Ding
 * Date: April 22, 2015
 * Time: 5:30:00 PM
 *
 * Project: csci205
 * Package: CS205Final
 * File: MainApp
 * Description:
 * The OutterMost Runner for our project
 * ****************************************
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
