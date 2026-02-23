<?php namespace app\models;
use chsergey\rest\Model as RestModel;
abstract class ApiModel extends RestModel {
    public static $apiUrl = "http://localhost/microvinificaciones/ws-microvinificaciones/web/";
    public static $primaryKey = "id";
    public static function staticInit() {
        parent::staticInit();
    }
}