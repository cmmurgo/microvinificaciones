<?php

namespace app\models;

use Yii;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "muestra".
 *
 * @property int $id
 * @property int|null $vinedo_id
 * @property string|null $variedad_uva
 * @property float|null $grados_brix
 * @property float|null $temperatura
 * @property float|null $ph
 * @property string|null $fecha_hora_muestreo
 * @property float|null $peso_muestra
 * @property string|null $observaciones
 * @property int|null $created_at
 * @property int|null $updated_at
 *
 * @property Vinedo $vinedo
 */
class Muestra extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'muestra';
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            TimestampBehavior::class,
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['vinedo_id', 'created_at', 'updated_at'], 'integer'],
            [['grados_brix', 'temperatura', 'ph', 'peso_muestra'], 'number'],
            [['fecha_hora_muestreo'], 'safe'],
            [['observaciones'], 'string'],
            [['variedad_uva'], 'string', 'max' => 255],
            [['vinedo_id'], 'exist', 'skipOnError' => true, 'targetClass' => Vinedo::class, 'targetAttribute' => ['vinedo_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'vinedo_id' => 'Vinedo ID',
            'variedad_uva' => 'Variedad Uva',
            'grados_brix' => 'Grados Brix',
            'temperatura' => 'Temperatura',
            'ph' => 'Ph',
            'fecha_hora_muestreo' => 'Fecha Hora Muestreo',
            'peso_muestra' => 'Peso Muestra',
            'observaciones' => 'Observaciones',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * Gets query for [[Vinedo]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getVinedo()
    {
        return $this->hasOne(Vinedo::class, ['id' => 'vinedo_id']);
    }
}
