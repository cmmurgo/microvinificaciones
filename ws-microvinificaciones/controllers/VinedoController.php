<?php

namespace app\controllers;

use yii\rest\ActiveController;

class VinedoController extends ActiveController
{
    public $modelClass = 'app\models\Vinedo';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
        ];
        return $behaviors;
    }
}
