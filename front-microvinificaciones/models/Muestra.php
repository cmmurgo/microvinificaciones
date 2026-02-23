<?php namespace app\models;
class Muestra extends ApiModel {
    public static $resourceName = "muestra";
    public function rules() { return [ [["vinedo_id"], "integer"], [["variedad_uva", "observaciones"], "string"], [["grados_brix", "temperatura", "ph", "peso_muestra"], "number"], [["fecha_hora_muestreo"], "safe"], ]; }
    public function attributeLabels() { return [ "id" => "ID", "vinedo_id" => "Vinedo", "variedad_uva" => "Variedad de Uva", "grados_brix" => "Grados Brix", "temperatura" => "Temperatura", "ph" => "pH", "fecha_hora_muestreo" => "Fecha/Hora Muestreo", "peso_muestra" => "Peso de la Muestra", "observaciones" => "Observaciones", ]; }
    public function getVinedo() { return Vinedo::findOne($this->vinedo_id); }
}