<?php
use yii\bootstrap5\Html;
$this->title = "Viñedos";
?>
<div class="vinedo-index">
    <div class="d-flex justify-content-between mb-4"><h1>Viñedos</h1><?= Html::a("Nuevo", ["create"], ["class" => "btn btn-primary"]) ?></div>
    <div class="row">
        <?php foreach ($vinedos as $v): ?>
            <div class="col-12 col-md-4"><div class="card"><div class="card-body">
                <h5><?= Html::encode($v->localidad) ?></h5>
                <p><?= Html::encode($v->sistema_conduccion) ?></p>
            </div></div></div>
        <?php endforeach; ?>
    </div>
</div>
