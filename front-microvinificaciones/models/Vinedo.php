<?php namespace app\models;
class Vinedo extends ApiModel {
    public static $resourceName = "vinedo";
    public function rules() { return [ [["sistema_conduccion", "estado_sanitario", "tipo_suelo", "tipo_riego", "provincia", "localidad", "observaciones"], "string"], [["latitud", "longitud"], "number"], ]; }
    public function attributeLabels() { return [ "id" => "ID", "sistema_conduccion" => "Sistema de Conduccion", "estado_sanitario" => "Estado Sanitario", "tipo_suelo" => "Tipo de Suelo", "tipo_riego" => "Tipo de Riego", "provincia" => "Provincia", "localidad" => "Localidad", "latitud" => "Latitud", "longitud" => "Longitud", "observaciones" => "Observaciones", ]; }
    public function getMuestras() { return Muestra::findAll(["vinedo_id" => $this->id]); }
}